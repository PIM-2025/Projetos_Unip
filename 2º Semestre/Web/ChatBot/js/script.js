// ════════════════════════════════════════════════════════════
// REFERÊNCIAS DO DOM
// ════════════════════════════════════════════════════════════
const chatWin = document.getElementById("chat-window");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const clearBtn = document.getElementById("clear-btn");

// ════════════════════════════════════════════════════════════
// EFEITOS SONOROS
// ════════════════════════════════════════════════════════════
const anvilSound = new Audio("assets/anvil-use.mp3");

// ════════════════════════════════════════════════════════════
// RELÓGIO — atualiza a cada minuto
// ════════════════════════════════════════════════════════════
function updateClock() {
  document.getElementById("clock").textContent = new Date().toLocaleTimeString(
    "pt-BR",
    { hour: "2-digit", minute: "2-digit" },
  );
}
setInterval(updateClock, 1000);
updateClock();

// ════════════════════════════════════════════════════════════
// ADICIONAR MENSAGEM DE TEXTO
// ════════════════════════════════════════════════════════════
function addMsg(text, side, options = {}) {
  const wrap = document.createElement("div");
  wrap.className = `msg-wrap ${side}`;

  const bubble = document.createElement("div");
  bubble.className = "msg";
  if (options.html) {
    bubble.innerHTML = text;
  } else {
    bubble.textContent = text;
  }

  const time = document.createElement("span");
  time.className = "msg-time";
  time.textContent = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  wrap.appendChild(bubble);
  wrap.appendChild(time);
  chatWin.appendChild(wrap);
  scrollDown(true);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderTextMarkdown(text) {
  let html = escapeHtml(text);

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  const lines = html.split(/\r?\n/);
  let output = "";
  let inList = false;
  let inOrderedList = false;
  let inParagraph = false;

  function closeParagraph() {
    if (inParagraph) {
      output += "</p>";
      inParagraph = false;
    }
  }

  function closeLists() {
    if (inList) {
      output += "</ul>";
      inList = false;
    }
    if (inOrderedList) {
      output += "</ol>";
      inOrderedList = false;
    }
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    const bulletMatch = trimmed.match(/^[-*]\s+(.*)$/);
    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);

    if (headingMatch) {
      closeParagraph();
      closeLists();
      const level = Math.min(6, headingMatch[1].length);
      output += `<h${level}>${headingMatch[2]}</h${level}>`;
    } else if (bulletMatch) {
      closeParagraph();
      if (inOrderedList) {
        output += "</ol>";
        inOrderedList = false;
      }
      if (!inList) {
        inList = true;
        output += "<ul>";
      }
      output += `<li>${bulletMatch[1]}</li>`;
    } else if (orderedMatch) {
      closeParagraph();
      if (inList) {
        output += "</ul>";
        inList = false;
      }
      if (!inOrderedList) {
        inOrderedList = true;
        output += "<ol>";
      }
      output += `<li>${orderedMatch[1]}</li>`;
    } else if (trimmed === "") {
      closeParagraph();
      closeLists();
    } else {
      if (!inParagraph) {
        inParagraph = true;
        output += "<p>";
      } else {
        output += " ";
      }
      output += trimmed;
    }

    if (index === lines.length - 1) {
      closeParagraph();
      closeLists();
    }
  });

  return output;
}

// ════════════════════════════════════════════════════════════
// SYNTAX HIGHLIGHTER
// Protege strings/comentários → aplica cores → restaura
// ════════════════════════════════════════════════════════════
function highlightCode(code, lang) {
  if (!code) return "";
  try {
    const vault = [];

    function protect(text, type) {
      vault.push({ text, type });
      return "___TOKEN_" + (vault.length - 1) + "___";
    }

    // helper: aplica replace ignorando tokens
    function safeReplace(str, regex, replacer) {
      return str
        .split(/(___TOKEN_\d+___)/)
        .map((part) => {
          if (/^___TOKEN_\d+___$/.test(part)) return part;
          return part.replace(regex, replacer);
        })
        .join("");
    }

    // 1. Escapar HTML
    let s = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 2. Proteger strings
    s = s.replace(/(`[\s\S]*?`)/g, (m) => protect(m, "str"));
    s = s.replace(/("(?:[^"\\]|\\.)*")/g, (m) => protect(m, "str"));
    s = s.replace(/('(?:[^'\\]|\\.)*')/g, (m) => protect(m, "str"));

    // 3. Proteger comentários
    const pyLike = ["python", "bash", "dockerfile", "yaml", "shell"];

    if (pyLike.includes(lang)) {
      s = s.replace(/(#[^\n]*)/g, (m) => protect(m, "cmt"));
    } else if (lang === "sql") {
      s = s.replace(/(--[^\n]*)/g, (m) => protect(m, "cmt"));
      s = s.replace(/(\/\*[\s\S]*?\*\/)/g, (m) => protect(m, "cmt"));
    } else {
      s = s.replace(/(\/\*[\s\S]*?\*\/)/g, (m) => protect(m, "cmt"));
      s = s.replace(/(\/\/[^\n]*)/g, (m) => protect(m, "cmt"));
    }

    // 4. Keywords
    const KW_JS =
      "const|let|var|function|return|class|if|else|for|while|do|async|await|import|export|default|new|this|from|of|in|typeof|instanceof|try|catch|finally|throw|static|extends|super|true|false|null|undefined|void|delete|switch|case|break|continue|yield|get|set";
    const KW_PY =
      "def|elif|with|pass|raise|lambda|and|or|not|True|False|None|self|global|nonlocal|as";
    const KW_SQL =
      "SELECT|FROM|WHERE|JOIN|INSERT|INTO|UPDATE|DELETE|CREATE|TABLE|VALUES|PRIMARY|KEY|UNIQUE|INDEX|INNER|LEFT|RIGHT|FULL|OUTER|GROUP|ORDER|BY|ON|AS|AND|OR|NOT|IN|LIKE|LIMIT|OFFSET|BEGIN|COMMIT|ROLLBACK|DEFAULT|REFERENCES|AUTOINCREMENT|SERIAL|FOREIGN|ALTER|ADD|DISTINCT|HAVING|UNION|COUNT|SUM|AVG|MAX|MIN|NULL|SET|DROP|TRUNCATE";

    let kw;
    if (lang === "sql") kw = KW_SQL;
    else if (pyLike.includes(lang)) kw = KW_JS + "|" + KW_PY;
    else kw = KW_JS + "|" + KW_PY;

    s = safeReplace(
      s,
      new RegExp(`\\b(${kw})\\b`, "g"),
      '<span class="hl-kw">$1</span>',
    );

    // 5. Números
    s = safeReplace(s, /\b(\d+\.?\d*)\b/g, '<span class="hl-num">$1</span>');

    // 6. HTML
    if (lang === "html" || lang === "jsx") {
      s = safeReplace(
        s,
        /(&lt;\/?)([\w-]+)/g,
        (_, slash, tag) => slash + '<span class="hl-tag">' + tag + "</span>",
      );

      s = safeReplace(
        s,
        /\s([\w-]+)(?==)/g,
        ' <span class="hl-attr">$1</span>',
      );
    }

    // 7. CSS
    if (lang === "css") {
      s = safeReplace(
        s,
        /([a-z-]+)(?=\s*:(?!:))/g,
        '<span class="hl-prop">$1</span>',
      );
    }

    // 8. Funções — antes de restaurar para não colorir dentro de strings
    s = safeReplace(
      s,
      /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g,
      '<span class="hl-fn">$1</span>',
    );

    // 9. Restaurar tokens (strings e comentários)
    s = s.replace(/___TOKEN_(\d+)___/g, (_, i) => {
      const { text, type } = vault[+i];
      return `<span class="${type === "str" ? "hl-str" : "hl-cmt"}">${text}</span>`;
    });

    return s;
  } catch (err) {
    console.error("Erro no Highlight:", err);
    // Fallback seguro: exibe o código sem cores, mas nunca o esconde
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}

// ════════════════════════════════════════════════════════════
// BLOCO DE CÓDIGO — com botão de cópia + highlight
// ════════════════════════════════════════════════════════════
function addCodeBlock(code, lang) {
  const block = document.createElement("div");
  block.className = "code-block";

  // cabeçalho: linguagem + botão copiar
  const header = document.createElement("div");
  header.className = "code-header";

  const langTag = document.createElement("span");
  langTag.className = "code-lang";
  langTag.textContent = lang;

  const copyBtn = document.createElement("button");
  copyBtn.className = "copy-btn";
  copyBtn.textContent = "⎘ Copiar";
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(code).then(() => {
      copyBtn.textContent = "✓ Copiado!";
      copyBtn.classList.add("ok");
      setTimeout(() => {
        copyBtn.textContent = "⎘ Copiar";
        copyBtn.classList.remove("ok");
      }, 2000);
    });
  };

  const pre = document.createElement("pre");
  pre.innerHTML = highlightCode(code, lang);

  header.appendChild(langTag);
  header.appendChild(copyBtn);
  block.appendChild(header);
  block.appendChild(pre);
  chatWin.appendChild(block);
  scrollDown(true);
}

// ════════════════════════════════════════════════════════════
// INDICADOR DE DIGITAÇÃO (três pontinhos animados)
// ════════════════════════════════════════════════════════════
function showTyping() {
  const wrap = document.createElement("div");
  wrap.id = "typing";
  wrap.className = "typing-indicator";
  wrap.innerHTML = `
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>`;
  chatWin.appendChild(wrap);
  wrap.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideTyping() {
  const el = document.getElementById("typing");
  if (el) el.remove();
}

// ════════════════════════════════════════════════════════════
// EXIBIR RESPOSTA DE IA
// ════════════════════════════════════════════════════════════
function renderAiResponse(response) {
  response.parts.forEach((part) => {
    if (part.type === "text") {
      addMsg(renderTextMarkdown(part.content), "bot", { html: true });
    } else if (part.type === "code") {
      addCodeBlock(part.content, part.lang || "text");
    }
  });
}

// ════════════════════════════════════════════════════════════
// ENVIAR MENSAGEM
// ════════════════════════════════════════════════════════════
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // Reinicia e reproduz o som da bigorna
  anvilSound.currentTime = 0;
  anvilSound
    .play()
    .catch((err) => console.warn("Áudio bloqueado pelo navegador:", err));

  addMsg(text, "user");
  input.value = "";
  showTyping();
  sendBtn.disabled = true;
  input.disabled = true;

  try {
    const response = await getAIResponse(text);
    renderAiResponse(response);
  } catch (error) {
    console.error("Erro ao gerar resposta de IA:", error);
    addMsg(
      "Desculpe, algo deu errado ao buscar a resposta. Tente novamente em alguns instantes.",
      "bot",
    );
  } finally {
    hideTyping();
    sendBtn.disabled = false;
    input.disabled = false;
    input.focus();
  }
}

// ════════════════════════════════════════════════════════════
// QUICK ASK — botões de tópico rápido
// ════════════════════════════════════════════════════════════
function quickAsk(topic) {
  input.value = topic;
  sendMessage();
}

// ════════════════════════════════════════════════════════════
// LIMPAR CHAT
// ════════════════════════════════════════════════════════════
function clearChat() {
  chatWin.innerHTML = "";
  init();
}

function scrollDown(smooth = false) {
  chatWin.scrollTo({
    top: chatWin.scrollHeight,
    behavior: smooth ? "smooth" : "auto",
  });
}

// ════════════════════════════════════════════════════════════
// INICIALIZAÇÃO
// ════════════════════════════════════════════════════════════
function init() {
  addMsg(
    "⚒️ A forja está acesa, dev! Sou o ByteForge — aqui o código bruto vira arte.\nMe jogue qualquer dúvida de programação ou use os atalhos abaixo para começar!",
    "bot",
  );
}

// Eventos
sendBtn.onclick = sendMessage;
clearBtn.onclick = clearChat;
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Inicia
init();

// ════════════════════════════════════════════════════════════
// MASCOTE INTERATIVO
// ════════════════════════════════════════════════════════════
const mascoteWrap = document.getElementById("mascote-wrap");
const bubble = document.getElementById("thought-bubble");
const eyePupilLeft = document.getElementById("eye-pupil-left");
const eyePupilRight = document.getElementById("eye-pupil-right");

const MAX_EYE_MOVE_X = 4; // Movimento horizontal restaurado!
const MAX_EYE_MOVE_Y = 2; // Movimento vertical (cima/baixo) limitado para não vazar a pupila

// Pensamentos periódicos — tema forja
const thoughts = [
  "⚒️ Martelando esse bug até ele virar função pura...",
  "🔥 Código bruto vira arte na forja certa",
  "⚙️ Temperatura do servidor: crítica. A bigorna aguenta?",
  "🔩 Deploy com estilo de Thor: só na marreta!",
  "⚒️ Bug na bigorna — vou refinar isso em aço inox",
  "🌋 Esse erro tá mais quente que overclock no inferno",
  "🔥 while (!funciona) { martela(); if (fw) break; }",
  "⚙️ Corrigi um bug, nascem 3 iguais à Hidra de Gorgon",
  "🔩 Na minha máquina tá forjado perfeito. No mundo real? veremos.",
  "⚒️ Deploy de sexta = jogar metal quente no frio. Só não chama o QA.",
  "🔥 console.log('vai aqui?') → ainda não fundiu, mas tá quase",
  "⚙️ NullPointerException é o minério mais traiçoeiro",
  "🌋 Sem café, a forja pára. Com café, o código voa.",
  "⚒️ Se tá funcionando, não mexe. Se não tá, martela mais.",
  "🔥 Bug intermitente = o fantasma da forja. Só expulsar com testes.",
  "⚙️ Frontend e backend discutindo igual ferro e fogo",
  "⚒️ Aqui a gente funde ideias e transforma em código útil",
  "🔥 return 42; // verdade universal e sarcasmo forjado",
  "⚙️ Mais uma camada de abstração... e agora virou armadura.",
  "⚒️ ctrl+c ctrl+v — arma de fogo do dev forjador",
  "🌋 Stack Overflow: minha bigorna favorita. Cultura de forja total.",
  "⚒️ Todo código vencedor já passou pela bigorna da refatoração.",
  "🔥 Esse terminal tá mais pegando fogo que forja de dragão.",
  "⚙️ Se o bug não se quebra, o código se adapta.",
  "💻 Um commit por dia mantém o pânico afastado.",
  "🧠 Essa branch tá mais perdida que variável global.",
  "⌨️ Se deu erro, reajusta. Se não deu, documenta.",
  "🐞 Bugs e café: a dieta padrão do dev forjador.",
  "🛠️ Refatorar é forjar duas vezes para ficar melhor.",
];

// Reações ao clique — tema forja
const reactions = [
  "⚒️ Forjando código aqui, precisa de ajuda?",
  "🔥 Tô no calor da forja, pode falar!",
  "⚙️ Clique registrado no sistema de bigorna!",
  "🌋 Que metal quer fundir hoje?",
  "⚒️ A forja nunca para — bora trabalhar!",
  "🔥 Temperatura máxima. Produtividade ao nível lendário.",
  "⚙️ Deixa eu martelar esse bug com estilo geek 😎",
  "🔩 A bigorna já tá aquecida. Lança o próximo pedido!",
  "⚒️ Chamou? Tô forjando uma solução digna de um herói.",
  "🌋 Bug detectado — vai direto pra forja de recompilação! 🤖",
  "🔥 Código pronto pra ser temperado e lançado na produção.",
  "⚙️ Se a lógica fosse espada, eu a afiaria até brilhar.",
  "⚒️ Só um toque: bugs também entram na forja para se tornarem recursos.",
  "💻 Programador feliz: teclado, café e código compilando.",
  "🐛 Debug rápido? Só depois do terceiro café, né?",
  "🔁 Sempre testando no 'minha máquina' e depois no mundo real.",
  "🧠 Git é meu caderninho de versão; branch é mapa do tesouro.",
  "⌨️ Se o código não funciona, acrescente mais café. Ou teste.",
  "🧪 A melhor feature é a que buga menos na reunião de deploy.",
];

let bubbleTimer;

function showBubble(text) {
  clearTimeout(bubbleTimer);
  bubble.classList.remove("show");

  const titleEl = document.querySelector(".header-info h1");
  const titleRect = titleEl.getBoundingClientRect();
  const mascoteRect = mascoteWrap.getBoundingClientRect();

  bubble.textContent = text;
  bubble.style.left = titleRect.left + titleRect.width / 2 + "px";
  bubble.style.transform = "translate(-50%, 0)";

  // força reflow para a transição funcionar após adicionar o texto
  void bubble.offsetWidth;

  const bubbleLeft =
    titleRect.left + titleRect.width / 2 - bubble.offsetWidth / 2;
  const botCenterX = mascoteRect.left + mascoteRect.width / 2;
  const pointerX = Math.min(
    Math.max(botCenterX - bubbleLeft, 16),
    bubble.offsetWidth - 16,
  );
  bubble.style.setProperty("--pointer-left", `${pointerX}px`);

  bubble.style.top = titleRect.top - bubble.offsetHeight - 10 + "px";
  bubble.classList.add("show");

  bubbleTimer = setTimeout(() => bubble.classList.remove("show"), 3800);
}

// Clique no mascote → pula + reação
mascoteWrap.addEventListener("click", () => {
  mascoteWrap.classList.remove("bouncing");
  void mascoteWrap.offsetWidth; // reflow para reiniciar animação
  mascoteWrap.classList.add("bouncing");
  mascoteWrap.addEventListener(
    "animationend",
    () => {
      mascoteWrap.classList.remove("bouncing");
    },
    { once: true },
  );

  const r = reactions[Math.floor(Math.random() * reactions.length)];
  showBubble(r);
});

// Pensamentos automáticos (12 – 22 s)
function schedulePensamento() {
  const delay = 12000 + Math.random() * 10000;
  setTimeout(() => {
    const t = thoughts[Math.floor(Math.random() * thoughts.length)];
    showBubble(t);
    schedulePensamento();
  }, delay);
}
setTimeout(schedulePensamento, 8000); // primeiro após 8 s

// Olhos seguem o mouse em X e Y
document.addEventListener("mousemove", (e) => {
  const svgRect = document.getElementById("byteforge").getBoundingClientRect();
  const svgCX = svgRect.left + svgRect.width / 2;
  const svgCY = svgRect.top + svgRect.height / 2;

  const normX = Math.max(
    -1,
    Math.min(1, (e.clientX - svgCX) / (window.innerWidth * 0.5)),
  );
  const normY = Math.max(
    -1,
    Math.min(1, (e.clientY - svgCY) / (window.innerHeight * 0.5)),
  );

  const dx = (normX * MAX_EYE_MOVE_X).toFixed(2);
  const dy = (normY * MAX_EYE_MOVE_Y).toFixed(2);

  if (eyePupilLeft)
    eyePupilLeft.style.transform = `translate(${dx}px, ${dy}px)`;
  if (eyePupilRight)
    eyePupilRight.style.transform = `translate(${dx}px, ${dy}px)`;
});
