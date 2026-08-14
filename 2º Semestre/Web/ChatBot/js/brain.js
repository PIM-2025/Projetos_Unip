const brain = [
  {
    keys: [
      "oi",
      "olá",
      "ola",
      "hey",
      "hello",
      "bom dia",
      "boa tarde",
      "boa noite",
      "tudo",
    ],
    text: "Olá, dev! Sou o ByteForge, seu assistente de programação.Posso ajudar com JavaScript, Python, Git, CSS, APIs, TypeScript, Docker e muito mais.\nO que vamos aprender hoje?",
  },
  {
    keys: ["quem", "você", "voce", "byteforge", "o que é", "o que voce"],
    text: "Sou o ByteForge — um assistente de programação criado para ajudar devs.Fui treinado para responder dúvidas sobre código, linguagens, ferramentas e boas práticas.\nUse os chips abaixo ou escreva qualquer tópico de programação!",
  },
  {
    keys: ["javascript", " js ", "js,", "var ", "const ", "let "],
    text: "JavaScript é a linguagem da web — roda no browser e no servidor (Node.js).Veja os fundamentos básicos:",
    code: `// Declaração de variáveis
var   nome  = "Dev";      // escopo global (evite)
let   idade = 20;         // mutável, escopo de bloco
const PI    = 3.14;       // imutável (constante)

// Condicional if / else
if (idade >= 18) {
    console.log("Maior de idade");
} else {
    console.log("Menor de idade");
}

// Laço for
for (let i = 0; i < 5; i++) {
    console.log("Número:", i);
}

// Função básica
function somar(a, b) {
    return a + b;
}
console.log(somar(3, 4)); // 7

// Arrow function (forma moderna)
const multiplicar = (a, b) => a * b;`,
    lang: "javascript",
  },
  {
    keys: ["python"],
    text: "Python é fácil de aprender e muito poderoso — usado em IA, automação e backend.\nVeja os fundamentos básicos:",
    code: `# Variáveis (sem declaração de tipo)
nome  = "Dev"
idade = 20
pi    = 3.14

# Condicional if / elif / else
if idade >= 18:
    print("Maior de idade")
elif idade == 17:
    print("Quase lá!")
else:
    print("Menor de idade")

# Laço for
for i in range(5):
    print("Número:", i)

# Laço while
contador = 0
while contador < 3:
    print(contador)
    contador += 1

# Função básica
def somar(a, b):
    return a + b

print(somar(3, 4))  # 7`,
    lang: "python",
  },
  {
    keys: ["git", "commit", "branch", "merge", "rebase", "github"],
    text: "Git — controla versões do código e facilita o trabalho em equipe.\nComandos básicos do dia a dia:",
    code: ` # Configuração inicial (apenas na primeira vez)
git config --global user.name "Seu Nome"
git config --global user.email "Seu Email"

# Iniciar um repositório
git init

# Ver o estado atual do projeto
git status

# Registrar alterações (commit)
git add arquivo.js            # adicionar arquivo
git add .                     # adicionar tudo
git commit -m "mensagem"      # salvar com mensagem

# Enviar e receber do repositório remoto
git push origin main          # enviar
git pull origin main          # receber

# Branches (ramificações)
git branch                    # listar branches
git checkout -b nova-feature  # criar e mudar de branch
git merge nova-feature        # unir branch ao main

# Desfazer
git restore arquivo.js        # descarta alteração local
git log --oneline             # ver histórico de commits`,
    lang: "bash",
  },
  {
    keys: ["css", "estilo", "flexbox", "grid", "layout", "responsivo"],
    text: "CSS — linguagem para estilizar páginas web.\nDo básico ao Flexbox:",
    code: `/* Seletores básicos */
h1          { color: blue; }          /* por tag    */
.destaque   { font-weight: bold; }    /* por classe */
#titulo     { font-size: 24px; }      /* por id     */

/* Box model — espaçamento */
.caixa {
    margin:  16px;           /* espaço externo */
    padding: 12px;           /* espaço interno */
    border:  1px solid #ccc;
    width:   300px;
}

/* Centralizar com Flexbox */
.centro {
    display:         flex;
    justify-content: center; /* eixo horizontal */
    align-items:     center; /* eixo vertical   */
}

/* Variáveis CSS */
:root {
    --cor-principal: #58a6ff;
    --espacamento:   16px;
}`,
    lang: "css",
  },
  {
    keys: ["api", "rest", "fetch", "axios", "http", "endpoint", "request"],
    text: "API REST — forma de comunicar dois sistemas pela internet.\nExemplos básicos com fetch:",
    code: `// GET — buscar dados
fetch("https://api.exemplo.com/usuarios")
    .then(res  => res.json())
    .then(dados => console.log(dados))
    .catch(erro => console.error("Erro:", erro));

// POST — enviar dados
fetch("https://api.exemplo.com/usuarios", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ nome: "Ana", idade: 25 })
})
    .then(res  => res.json())
    .then(novo => console.log("Criado:", novo));

// Com async/await (mais legível)
async function buscarUsuarios() {
    const res   = await fetch("https://api.exemplo.com/usuarios");
    const dados = await res.json();
    console.log(dados);
}`,
    lang: "javascript",
  },
  {
    keys: ["debug", "erro", "bug", "error", "problema", "fix", "console"],
    text: "Debug — como encontrar e corrigir erros no código:\n\n• `console.log()` para ver valores em tempo real\n• `console.table()` para arrays e objetos\n• Breakpoints no DevTools (F12) — pausa a execução\n• Leia o stack trace: indica o arquivo e a linha do erro\n• Isole o problema: comente o código até o bug sumir\n• Use `typeof x` para ver o tipo de uma variável",
    code: `// Inspecionar valores
let x = 42;
console.log("x =", x);          // x = 42
console.log(typeof x);           // "number"

// Visualizar array ou objeto
const frutas = ["maçã", "banana", "uva"];
console.table(frutas);

// Capturar erros com try/catch
try {
    let resultado = JSON.parse("texto inválido");
} catch (erro) {
    console.error("Erro:", erro.message);
}

// Verificar tipo antes de usar
function dobrar(n) {
    if (typeof n !== "number") {
        console.warn("Esperado um número, recebeu:", typeof n);
        return;
    }
    return n * 2;
}`,
    lang: "javascript",
  },
  {
    keys: ["node", "nodejs", "node.js", "npm", "express", "servidor"],
    text: "Node.js — servidor HTTP básico com Express:",
    code: `const express = require("express");
const app = express();

app.use(express.json());

// Middleware de log
app.use((req, _res, next) => {
    console.log(\`[\${req.method}] \${req.path}\`);
    next();
});

// Rotas
app.get("/api/users", async (req, res) => {
    const users = await db.findAll();
    res.json({ data: users });
});

app.post("/api/users", async (req, res) => {
    const user = await db.create(req.body);
    res.status(201).json(user);
});

app.listen(3000, () => console.log("Servidor em :3000"));`,
    lang: "javascript",
  },
  {
    keys: [
      "sql",
      "banco",
      "database",
      "mysql",
      "postgres",
      "sqlite",
      "query",
      "select",
      "insert",
    ],
    text: "SQL — linguagem para criar e manipular bancos de dados.\nOs 4 comandos essenciais (CRUD):",
    code: `-- Criar tabela
CREATE TABLE alunos (
    id    INT PRIMARY KEY AUTO_INCREMENT,
    nome  VARCHAR(100) NOT NULL,
    nota  DECIMAL(4,2)
);

-- Inserir dados (Create)
INSERT INTO alunos (nome, nota)
VALUES ('Ana', 9.5), ('João', 7.0);

-- Consultar dados (Read)
SELECT * FROM alunos;
SELECT nome, nota FROM alunos WHERE nota >= 7;

-- Atualizar dados (Update)
UPDATE alunos SET nota = 8.0 WHERE nome = 'João';

-- Remover dados (Delete)
DELETE FROM alunos WHERE id = 1;`,
    lang: "sql",
  },
  {
    keys: ["typescript", "ts", "tipagem", "type", "interface", "generics"],
    text: "TypeScript adiciona tipos ao JavaScript, ajudando a pegar erros antes de rodar o código:",
    code: `// Tipos básicos
let nome:   string  = "Dev";
let idade:  number  = 20;
let ativo:  boolean = true;

// Array tipado
let notas: number[] = [9, 7, 8.5];

// Condicional com tipo
if (idade >= 18) {
    console.log("Maior de idade");
} else {
    console.log("Menor de idade");
}

// Interface — define a forma de um objeto
interface Usuario {
    nome:   string;
    idade:  number;
    email?: string; // ? = opcional
}

// Função com tipos definidos
function saudar(usuario: Usuario): string {
    return \`Olá, \${usuario.nome}!\`;
}

const dev: Usuario = { nome: "Ana", idade: 25 };
console.log(saudar(dev)); // "Olá, Ana!"`,
    lang: "typescript",
  },
  {
    keys: ["react", "componente", "usestate", "useeffect", "hooks", "jsx"],
    text: "React — componente funcional com hooks modernos:",
    code: `import { useState, useEffect, useCallback } from "react";

interface Props {
    userId: number;
}

function PerfilUsuario({ userId }: Props) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    const buscar = useCallback(async () => {
        setLoading(true);
        const data = await fetch(\`/api/users/\${userId}\`).then(r => r.json());
        setUsuario(data);
        setLoading(false);
    }, [userId]);

    useEffect(() => { buscar(); }, [buscar]);

    if (loading) return <p>Carregando...</p>;
    return <h1>{usuario.nome}</h1>;
}`,
    lang: "jsx",
  },
  {
    keys: ["async", "promise", "await", "assincrono", "assíncrono", "callback"],
    text: "JavaScript assíncrono — do callback hell ao async/await:",
    code: `// Promise encadeada
buscarUsuario(id)
    .then(user => buscarPosts(user.id))
    .then(posts => renderizar(posts))
    .catch(err => console.error(err));

// Async/Await (muito mais legível)
async function carregarPerfil(id) {
    const user  = await buscarUsuario(id);
    const posts = await buscarPosts(user.id);
    renderizar(posts);
}

// Paralelo — mais rápido quando independentes
const [user, config] = await Promise.all([
    buscarUsuario(id),
    buscarConfig()
]);

// Race — o primeiro que resolver vence
const resultado = await Promise.race([fetchA(), timeout(5000)]);`,
    lang: "javascript",
  },
  {
    keys: ["poo", "oop", "classe", "herança", "objeto", "orientado", "solid"],
    text: "POO em JavaScript — classes ES6+ com encapsulamento:",
    code: `class Animal {
    #nome; // campo privado (ES2022)

    constructor(nome) { this.#nome = nome; }

    get nome() { return this.#nome; }

    falar() { return \`\${this.#nome} faz um som.\`; }
}

class Cachorro extends Animal {
    #raca;

    constructor(nome, raca) {
        super(nome);
        this.#raca = raca;
    }

    falar() { return \`\${this.nome} late: Au au!\`; }

    toString() {
        return \`\${this.nome} (\${this.#raca})\`;
    }
}

const rex = new Cachorro("Rex", "Labrador");
console.log(rex.falar()); // Rex late: Au au!`,
    lang: "javascript",
  },
  {
    keys: ["array", "lista", "map", "filter", "reduce", "find"],
    text: "Arrays em JS — métodos funcionais essenciais:",
    code: `const devs = [
    { nome: "Ana",  nivel: "senior", salario: 12000 },
    { nome: "Bob",  nivel: "junior", salario: 4000  },
    { nome: "Carol",nivel: "mid",    salario: 7000  },
];

// Map — transformar
const nomes = devs.map(d => d.nome); // ["Ana","Bob","Carol"]

// Filter — filtrar
const seniors = devs.filter(d => d.nivel === "senior");

// Reduce — acumular
const totalSalarios = devs.reduce((acc, d) => acc + d.salario, 0);

// Find — primeiro match
const ana = devs.find(d => d.nome === "Ana");

// Sort — ordenar (não muta com spread)
const ordenados = [...devs].sort((a, b) => b.salario - a.salario);`,
    lang: "javascript",
  },
  {
    keys: ["docker", "container", "compose", "dockerfile", "imagem", "image"],
    text: "Docker empacota sua aplicação em containers — roda igual em qualquer máquina.\nDockerfile e comandos básicos:",
    code: `# Dockerfile básico (Node.js)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]

# Comandos essenciais
docker build -t minha-app .        # criar imagem
docker run -p 3000:3000 minha-app  # rodar container
docker ps                          # listar containers ativos
docker stop <id>                   # parar container
docker images                      # listar imagens`,
    lang: "dockerfile",
  },
  {
    keys: ["regex", "expressão regular", "regexp", "pattern"],
    text: "Regex — expressões regulares para validação e parsing:",
    code: `// Validar e-mail
const emailRgx = /^[\\w.+-]+@[\\w-]+\\.[a-z]{2,}$/i;
console.log(emailRgx.test("dev@email.com")); // true

// Validar senha forte (min 8, maiúscula, número)
const senhaRgx = /^(?=.*[A-Z])(?=.*\\d).{8,}$/;

// Extrair dados
const log = "ERROR 2024-01-15: arquivo não encontrado";
const [, nivel, data, msg] = log.match(/(\\w+) ([\\d-]+): (.+)/);

// Substituir
const slug = "Meu Título Incrível!"
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""); // "meu-titulo-incrivel"`,
    lang: "javascript",
  },
  {
    keys: ["vscode", "vs code", "editor", "atalho", "shortcut", "extensão"],
    text: "VS Code — atalhos que aumentam sua produtividade:\n\n• `Ctrl+P` — abrir arquivo por nome\n• `Ctrl+Shift+P` — paleta de comandos\n• `Alt+Up/Down` — mover linha\n• `Ctrl+D` — selecionar próxima ocorrência\n• `Ctrl+/` — comentar/descomentar\n• `F2` — renomear símbolo em todo projeto\n• `Ctrl+Shift+F` — buscar em todos arquivos\n• `Ctrl+`` ` — abrir terminal integrado\n• `Ctrl+Z` — desfazer | `Ctrl+Shift+Z` — refazer\n\nExtensões essenciais: ESLint, Prettier, GitLens, REST Client, Thunder Client",
  },
  {
    keys: [
      "carreira",
      "emprego",
      "vaga",
      "junior",
      "pleno",
      "senior",
      "salario",
      "mercado",
    ],
    text: "Dicas de carreira para devs:\n\n• Portfólio no GitHub com projetos reais e READMEs caprichados\n• Inglês técnico é pré-requisito — documentações, Stack Overflow, podcasts\n• Especialização importa: Front, Back, Full Stack, Mobile, DevOps, Data\n• Open source abre portas — contribua com projetos que usa\n• LinkedIn ativo com conquistas concretas (evite clichês)\n• Algoritmos e estruturas de dados para entrevistas (LeetCode, HackerRank)\n• Soft skills: comunicação escrita, code review, estimativas realistas",
  },
  {
    keys: [
      "recursão",
      "recursao",
      "recursiva",
      "recursivo",
      "fatorial",
      "fibonacci",
    ],
    text: "Recursão — função que chama a si mesma para problemas divisíveis:",
    code: `// Fatorial
function fatorial(n) {
    if (n <= 1) return 1;           // caso base (obrigatório!)
    return n * fatorial(n - 1);     // chamada recursiva
}
// fatorial(5) → 5 * 4 * 3 * 2 * 1 = 120

// Fibonacci com memoização (muito mais rápido)
function fib(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}

// Percorrer estrutura aninhada
function flat(arr) {
    return arr.reduce((acc, item) =>
        Array.isArray(item) ? [...acc, ...flat(item)] : [...acc, item]
    , []);
}`,
    lang: "javascript",
  },
  {
    keys: [
      "html",
      "semantico",
      "semântico",
      "tag",
      "elemento",
      "dom",
      "acessib",
    ],
    text: "HTML semântico — estrutura acessível e bem organizada:",
    code: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Descrição da página">
    <title>Título | Site</title>
</head>
<body>
    <header>
        <nav aria-label="Principal">
            <a href="/">Home</a>
        </nav>
    </header>
    <main>
        <article>
            <h1>Título do conteúdo</h1>
            <p>Parágrafo...</p>
        </article>
        <aside aria-label="Relacionados">...</aside>
    </main>
    <footer>...</footer>
</body>
</html>`,
    lang: "html",
  },

  // ── JavaScript avançado ──────────────────────────────────
  {
    keys: ["closure", "fechamento", "escopo", "scope"],
    text: "Closures — funções que 'lembram' o escopo em que foram criadas:",
    code: `// Contador com closure — estado privado
function criarContador(inicio = 0) {
    let count = inicio; // variável capturada

    return {
        incrementar: () => ++count,
        decrementar: () => --count,
        valor:       () => count,
    };
}

const c = criarContador(10);
c.incrementar(); // 11
c.incrementar(); // 12
c.valor();       // 12

// Uso comum: factory de funções
const multiplicarPor = (n) => (x) => x * n;
const dobrar  = multiplicarPor(2);
const triplicar = multiplicarPor(3);
console.log(dobrar(5));    // 10
console.log(triplicar(5)); // 15`,
    lang: "javascript",
  },
  {
    keys: [
      "event loop",
      "call stack",
      "pilha",
      "fila",
      "microtask",
      "macrotask",
    ],
    text: "Event Loop — como o JS executa código assíncrono:\n\n1. Call Stack — executa código síncrono (LIFO)\n2. Web APIs — gerencia timers, fetch, eventos\n3. Callback Queue (macrotasks) — setTimeout, setInterval\n4. Microtask Queue — Promises, queueMicrotask (prioridade maior)\n\nOrdem de execução: sync → microtasks → macrotasks",
    code: `console.log("1");                      // sync

setTimeout(() => console.log("2"), 0); // macrotask

Promise.resolve()
    .then(() => console.log("3"));     // microtask

console.log("4");                      // sync

// Saída: 1 → 4 → 3 → 2`,
    lang: "javascript",
  },
  {
    keys: ["spread", "rest", "operador", "..."],
    text: "Spread (...) e Rest — operadores essenciais do JS moderno:",
    code: `// SPREAD — espalha elementos
const a = [1, 2, 3];
const b = [...a, 4, 5];         // [1,2,3,4,5]

const obj1 = { x: 1 };
const obj2 = { ...obj1, y: 2 }; // { x:1, y:2 }

// Clonar sem referência
const clone = [...a];
const cloneObj = { ...obj1 };

// REST — coleta os restantes
function soma(...nums) {
    return nums.reduce((acc, n) => acc + n, 0);
}
soma(1, 2, 3, 4); // 10

// Desestruturação com rest
const [primeiro, segundo, ...outros] = [1, 2, 3, 4, 5];
// outros = [3, 4, 5]`,
    lang: "javascript",
  },
  {
    keys: [
      "modulo",
      "módulo",
      "import",
      "export",
      "esm",
      "commonjs",
      "require",
    ],
    text: "Módulos em JavaScript — ESM (moderno) vs CommonJS:",
    code: `// ── ESM (navegador e Node 12+) ──
// utils.js
export const PI = 3.14159;
export function somar(a, b) { return a + b; }
export default class Calc { /*...*/ }

// main.js
import Calc, { PI, somar } from "./utils.js";
import * as utils from "./utils.js"; // importar tudo

// ── CommonJS (Node.js legado) ──
// utils.js
module.exports = { PI: 3.14, somar: (a,b) => a+b };

// main.js
const { PI, somar } = require("./utils");

// Importação dinâmica (lazy load)
const modulo = await import("./pesado.js");`,
    lang: "javascript",
  },
  {
    keys: ["try catch", "try/catch", "erro", "exception", "throw", "finally"],
    text: "Tratamento de erros em JavaScript:",
    code: `// Erro customizado
class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

// try/catch/finally
async function buscar(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new ApiError("Falhou", res.status);
        return await res.json();

    } catch (err) {
        if (err instanceof ApiError) {
            console.error(\`HTTP \${err.status}: \${err.message}\`);
        } else {
            console.error("Erro inesperado:", err);
        }
        throw err; // re-lançar se necessário

    } finally {
        console.log("Sempre executa (limpar recursos)");
    }
}`,
    lang: "javascript",
  },
  {
    keys: ["localstorage", "sessionstorage", "storage", "armazenamento local"],
    text: "Web Storage — persistir dados no browser:",
    code: `// LocalStorage — persiste após fechar o browser
localStorage.setItem("token", "abc123");
const token = localStorage.getItem("token");
localStorage.removeItem("token");
localStorage.clear();

// SessionStorage — limpa ao fechar a aba
sessionStorage.setItem("temp", "valor");

// Salvar objetos (deve serializar)
const user = { id: 1, nome: "Ana" };
localStorage.setItem("user", JSON.stringify(user));
const saved = JSON.parse(localStorage.getItem("user"));

// Helper seguro
function getStorage(key, fallback = null) {
    try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : fallback;
    } catch {
        return fallback;
    }
}`,
    lang: "javascript",
  },
  {
    keys: ["dom", "document", "queryselector", "getelementbyid", "manipulacao"],
    text: "Manipulação de DOM — criar, modificar e remover elementos:",
    code: `// Selecionar
const btn  = document.querySelector("#meu-btn");
const itens = document.querySelectorAll(".item");

// Criar e inserir
const p = document.createElement("p");
p.textContent = "Novo parágrafo";
p.classList.add("destaque");
document.body.appendChild(p);

// Modificar atributos
btn.setAttribute("disabled", "");
btn.removeAttribute("disabled");
btn.dataset.id = "42"; // data-id="42"

// Remover
p.remove();

// Template clonável
const tpl = document.querySelector("#card-template");
const clone = tpl.content.cloneNode(true);
clone.querySelector("h2").textContent = "Título";
document.querySelector("#lista").appendChild(clone);`,
    lang: "javascript",
  },
  {
    keys: [
      "event",
      "evento",
      "addeventlistener",
      "click",
      "submit",
      "bubbling",
      "delegation",
    ],
    text: "Eventos no DOM — listeners e delegação de eventos:",
    code: `// Adicionar e remover listener
const handler = (e) => console.log(e.target);
btn.addEventListener("click", handler);
btn.removeEventListener("click", handler);

// Opções úteis
btn.addEventListener("click", fn, { once: true });   // dispara 1x
btn.addEventListener("scroll", fn, { passive: true }); // melhora performance

// Delegação — um listener para vários filhos
document.querySelector("#lista").addEventListener("click", (e) => {
    const item = e.target.closest(".item");
    if (!item) return;
    item.classList.toggle("selecionado");
});

// Prevenir padrão / propagar
form.addEventListener("submit", (e) => {
    e.preventDefault();  // não recarrega
    e.stopPropagation(); // não sobe (bubbling)
});`,
    lang: "javascript",
  },
  {
    keys: [
      "json",
      "parse",
      "stringify",
      "serializar",
      "json.parse",
      "json.stringify",
    ],
    text: "JSON — serializar e desserializar dados:",
    code: `const obj = { nome: "Ana", ativo: true, score: 9.5 };

// Objeto → string
const json = JSON.stringify(obj);
// '{"nome":"Ana","ativo":true,"score":9.5}'

// String → objeto
const parsed = JSON.parse(json);

// Pretty print (indentar)
console.log(JSON.stringify(obj, null, 2));

// Replacer — filtrar campos
JSON.stringify(obj, ["nome", "score"]); // só esses campos

// Reviver — transformar ao parsear
const data = JSON.parse(jsonStr, (key, val) => {
    if (key === "data") return new Date(val);
    return val;
});

// Clonar objeto (hack simples — não suporta funções/undefined)
const clone = JSON.parse(JSON.stringify(obj));`,
    lang: "javascript",
  },
  {
    keys: ["date", "data", "hora", "datetime", "new date", "datas"],
    text: "Datas e horas em JavaScript:",
    code: `const agora = new Date();

// Formatar
agora.toLocaleDateString("pt-BR");          // "28/04/2026"
agora.toLocaleTimeString("pt-BR");          // "14:30:00"
agora.toLocaleString("pt-BR");              // data + hora

// Intl.DateTimeFormat (moderno)
const fmt = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long", year: "numeric",
    month: "long",   day: "numeric"
});
fmt.format(agora); // "segunda-feira, 28 de abril de 2026"

// Aritmética com timestamps
const amanha = new Date(agora.getTime() + 86_400_000);

// Diferença em dias
const diff = Math.abs(d2 - d1) / (1000 * 60 * 60 * 24);

// ISO para APIs
agora.toISOString(); // "2026-04-28T17:30:00.000Z"`,
    lang: "javascript",
  },
  {
    keys: ["map", "set", "weakmap", "weakset", "coleção", "collection"],
    text: "Map e Set — coleções modernas do JavaScript:",
    code: `// Map — chave pode ser qualquer tipo
const mapa = new Map();
mapa.set("nome", "Ana");
mapa.set(42, "número como chave");
mapa.get("nome"); // "Ana"
mapa.has(42);     // true
mapa.size;        // 2

// Iterar
for (const [chave, valor] of mapa) {
    console.log(chave, valor);
}

// Set — valores únicos
const set = new Set([1, 2, 2, 3, 3]);
// Set {1, 2, 3} — duplicatas removidas!

set.add(4);
set.delete(2);
set.has(3); // true

// Remover duplicatas de array
const unico = [...new Set([1,1,2,3,3])]; // [1,2,3]`,
    lang: "javascript",
  },
  {
    keys: ["generator", "function*", "yield", "iterador", "iterator"],
    text: "Generators — funções que pausam e retomam execução:",
    code: `// Generator básico
function* contador(inicio = 0) {
    while (true) {
        yield inicio++;
    }
}

const gen = contador(1);
gen.next().value; // 1
gen.next().value; // 2
gen.next().value; // 3

// Range (como Python)
function* range(start, end, step = 1) {
    for (let i = start; i < end; i += step) {
        yield i;
    }
}
console.log([...range(0, 10, 2)]); // [0,2,4,6,8]

// Infinite scroll / paginação lazy
function* paginar(itens, por = 10) {
    for (let i = 0; i < itens.length; i += por) {
        yield itens.slice(i, i + por);
    }
}`,
    lang: "javascript",
  },
  {
    keys: [
      "object.keys",
      "object.values",
      "object.entries",
      "object.assign",
      "freeze",
      "seal",
    ],
    text: "Object — métodos utilitários essenciais:",
    code: `const user = { id: 1, nome: "Ana", email: "ana@email.com" };

Object.keys(user);    // ["id", "nome", "email"]
Object.values(user);  // [1, "Ana", "ana@email.com"]
Object.entries(user); // [["id",1], ["nome","Ana"], ...]

// Transformar entries de volta em objeto
const upper = Object.fromEntries(
    Object.entries(user).map(([k, v]) => [k, String(v).toUpperCase()])
);

// Merge (último vence)
const config = Object.assign({}, defaults, overrides);

// Spread é mais limpo:
const merged = { ...defaults, ...overrides };

// Imutabilidade
const frozen = Object.freeze({ x: 1 }); // não permite alteração
Object.isFrozen(frozen); // true

// Verificar propriedade própria
"nome" in user;                    // true (inclui prototype)
Object.hasOwn(user, "nome");       // true (apenas própria)`,
    lang: "javascript",
  },
  {
    keys: [
      "string",
      "strings",
      "template",
      "métodos de string",
      "metodos de string",
      "slice",
      "split",
      "includes",
    ],
    text: "String — métodos mais usados no dia a dia:",
    code: `const str = "  Olá, Desenvolvedor!  ";

str.trim();            // "Olá, Desenvolvedor!"
str.toLowerCase();     // "  olá, desenvolvedor!  "
str.toUpperCase();
str.includes("Dev");   // true
str.startsWith("  O"); // true
str.endsWith("!  ");   // true
str.indexOf("Dev");    // 7

// Substituir
str.replace("Olá", "Oi");         // primeira ocorrência
str.replaceAll("o", "0");          // todas
str.replace(/\s+/g, " ").trim();   // normalizar espaços

// Quebrar / juntar
"a,b,c".split(",");        // ["a","b","c"]
["a","b","c"].join(" - "); // "a - b - c"

// Fatiar
"abcdef".slice(1, 4);  // "bcd"
"abc".padStart(5, "0"); // "00abc"
"abc".repeat(3);        // "abcabcabc"`,
    lang: "javascript",
  },
  {
    keys: [
      "prototype",
      "cadeia de protótipo",
      "prototipo",
      "__proto__",
      "herança prototípica",
    ],
    text: "Prototype chain — como a herança funciona sob o capô em JS:",
    code: `// Toda função tem .prototype
function Animal(nome) { this.nome = nome; }
Animal.prototype.falar = function() {
    return \`\${this.nome} faz um som.\`;
};

const gato = new Animal("Gato");
gato.falar(); // "Gato faz um som."

// A chain: gato → Animal.prototype → Object.prototype → null
Object.getPrototypeOf(gato) === Animal.prototype; // true

// Classes ES6 são "syntax sugar" sobre prototypes
class Cachorro extends Animal {
    latir() { return "Au!"; }
}
// Cachorro.prototype.__proto__ === Animal.prototype

// Verificar herança
gato instanceof Animal;  // true
gato instanceof Object;  // true (tudo é Object em JS)

// Adicionar método a tipo nativo (evitar em produção!)
Array.prototype.ultimo = function() { return this[this.length - 1]; };`,
    lang: "javascript",
  },

  // ── CSS avançado ─────────────────────────────────────────
  {
    keys: [
      "animacao",
      "animação",
      "animation",
      "keyframe",
      "@keyframes",
      "transition",
    ],
    text: "CSS Animations vs Transitions:",
    code: `/* Transition — do estado A ao B (precisa de trigger) */
.btn {
    background: #58a6ff;
    transition: background .25s ease, transform .2s ease;
}
.btn:hover {
    background: #79b8ff;
    transform: scale(1.05);
}

/* Animation — loop autônomo */
@keyframes pulsar {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: .5; transform: scale(.95); }
}

.loading {
    animation: pulsar 1.5s ease-in-out infinite;
}

/* Entrada de elemento */
@keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}

.card { animation: slide-up .3s ease-out both; }`,
    lang: "css",
  },
  {
    keys: ["media query", "responsivo", "mobile", "breakpoint", "@media"],
    text: "Media Queries — design responsivo sem frameworks:",
    code: `/* Mobile-first (recomendado) */
.container { padding: 16px; }

/* Tablet */
@media (min-width: 768px) {
    .container { padding: 24px; max-width: 960px; }
    .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
    .container { max-width: 1280px; margin: 0 auto; }
    .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Preferência do usuário */
@media (prefers-color-scheme: dark) { /*...*/ }
@media (prefers-reduced-motion: reduce) {
    * { animation: none !important; }
}

/* Container queries (CSS moderno) */
@container (min-width: 400px) {
    .card { flex-direction: row; }
}`,
    lang: "css",
  },
  {
    keys: [
      "pseudo",
      "::before",
      "::after",
      ":hover",
      ":focus",
      ":nth-child",
      "seletor",
    ],
    text: "Pseudo-elementos e pseudo-classes CSS:",
    code: `/* Pseudo-elementos — partes virtuais do elemento */
.btn::before {
    content: "→ ";
    color: #58a6ff;
}

/* Linha decorativa com ::after */
h2::after {
    content: "";
    display: block;
    width: 40px; height: 3px;
    background: #58a6ff;
    margin-top: 8px;
}

/* Pseudo-classes — estado ou posição */
li:first-child  { font-weight: bold; }
li:last-child   { border: none; }
li:nth-child(2n) { background: #f0f0f0; } /* pares */
li:not(.ativo)  { opacity: .5; }

input:focus-visible { outline: 2px solid #58a6ff; }
a:visited           { color: purple; }

/* :is() — agrupa seletores */
:is(h1, h2, h3) { line-height: 1.2; }`,
    lang: "css",
  },
  {
    keys: [
      "position",
      "relative",
      "absolute",
      "fixed",
      "sticky",
      "z-index",
      "posicionamento",
    ],
    text: "CSS Position — guia de posicionamento:",
    code: `/* static (padrão) — fluxo normal, top/left não funcionam */

/* relative — move sem sair do fluxo; cria contexto p/ absolute */
.pai { position: relative; }

/* absolute — sai do fluxo; âncora no pai relative mais próximo */
.badge {
    position: absolute;
    top: -8px; right: -8px; /* canto superior direito do pai */
}

/* fixed — fixo na viewport (navbar, modal) */
.navbar { position: fixed; top: 0; left: 0; width: 100%; }

/* sticky — relative até rolar, então fica fixo */
.header-tabela {
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
}

/* z-index só funciona em position != static */
.overlay { position: fixed; z-index: 1000; }`,
    lang: "css",
  },
  {
    keys: [
      "specificidade",
      "especificidade",
      "cascade",
      "cascata",
      "!important",
      "css priority",
    ],
    text: 'Especificidade CSS — quem vence o conflito de regras:\n\n**Ordem crescente de peso:**\n• Elemento/pseudo-elemento: `p`, `::before` → (0,0,1)\n• Classe/atributo/pseudo-class: `.card`, `:hover` → (0,1,0)\n• ID: `#header` → (1,0,0)\n• Inline style: `style="..."` → (1,0,0,0)\n• `!important` → bate tudo (use com parcimônia)\n\n**Dica:** Quanto mais específico o seletor, mais difícil de sobrescrever. Prefira classes a IDs no CSS.',
    code: `/* Especificidade: (0,0,1) */
p { color: blue; }

/* Especificidade: (0,1,0) — vence p */
.texto { color: red; }

/* Especificidade: (1,0,0) — vence .texto */
#titulo { color: green; }

/* !important — nuclear option */
p { color: purple !important; } /* evite se possível */

/* Dica: usar :where() zera a especificidade */
:where(.card) p { color: gray; } /* (0,0,0) */

/* :is() mantém a especificidade do seletor mais específico */
:is(#id, .classe) { } /* especificidade do #id = (1,0,0) */`,
    lang: "css",
  },
  {
    keys: [
      "variavel css",
      "variável css",
      "custom property",
      "css variable",
      "--cor",
      "var(",
    ],
    text: "CSS Custom Properties (variáveis CSS) — theming sem pré-processador:",
    code: `/* Definir no :root (escopo global) */
:root {
    --cor-primaria:  #58a6ff;
    --cor-fundo:     #0d1117;
    --fonte-base:    16px;
    --raio:          8px;
    --sombra: 0 4px 20px rgba(0,0,0,.3);
}

/* Usar */
.btn {
    background: var(--cor-primaria);
    border-radius: var(--raio);
    box-shadow: var(--sombra);
    font-size: var(--fonte-base);
}

/* Sobrescrever localmente */
.card { --raio: 16px; }

/* Valor padrão (fallback) */
color: var(--cor-texto, #ffffff);

/* Tema escuro com media query */
@media (prefers-color-scheme: dark) {
    :root { --cor-fundo: #000; --cor-texto: #fff; }
}`,
    lang: "css",
  },

  // ── Python avançado ──────────────────────────────────────
  {
    keys: ["decorador", "decorator", "@", "wrapper", "functools"],
    text: "Decorators em Python — modificar funções sem alterá-las:",
    code: `import time
from functools import wraps

# Decorator de tempo de execução
def medir_tempo(func):
    @wraps(func)  # preserva nome e docstring
    def wrapper(*args, **kwargs):
        inicio = time.perf_counter()
        resultado = func(*args, **kwargs)
        fim = time.perf_counter()
        print(f"{func.__name__} levou {fim-inicio:.4f}s")
        return resultado
    return wrapper

@medir_tempo
def processar(n):
    return sum(range(n))

processar(1_000_000) # processar levou 0.0312s

# Decorator de classe (property)
class Circulo:
    def __init__(self, raio): self._raio = raio

    @property
    def area(self): return 3.14 * self._raio ** 2

    @area.setter
    def area(self, val): self._raio = (val / 3.14) ** .5`,
    lang: "python",
  },
  {
    keys: [
      "venv",
      "virtualenv",
      "pip",
      "ambiente virtual",
      "requirements",
      "poetry",
    ],
    text: "Ambiente virtual Python — isolar dependências por projeto:",
    code: `# Criar ambiente virtual
python -m venv .venv

# Ativar
# Windows:
.venv\\Scripts\\activate
# Linux/Mac:
source .venv/bin/activate

# Instalar dependências
pip install requests fastapi uvicorn

# Salvar dependências
pip freeze > requirements.txt

# Restaurar em outro ambiente
pip install -r requirements.txt

# Gerenciador moderno: Poetry
poetry new meu-projeto
poetry add requests
poetry add --group dev pytest black

# pyproject.toml é o novo padrão (PEP 518)`,
    lang: "bash",
  },
  {
    keys: [
      "arquivo",
      "file",
      "open",
      "read",
      "write",
      "io",
      "leitura de arquivo",
    ],
    text: "Manipulação de arquivos em Python:",
    code: `# Ler arquivo texto
with open("dados.txt", "r", encoding="utf-8") as f:
    conteudo = f.read()       # tudo de uma vez
    # ou linha por linha:
    for linha in f:
        print(linha.strip())

# Escrever
with open("saida.txt", "w", encoding="utf-8") as f:
    f.write("Olá mundo!\\n")

# Acrescentar (append)
with open("log.txt", "a") as f:
    f.write("nova linha\\n")

# JSON
import json
with open("config.json") as f:
    config = json.load(f)

with open("resultado.json", "w") as f:
    json.dump({"status": "ok"}, f, indent=2)

# pathlib (moderno)
from pathlib import Path
p = Path("dados") / "arquivo.csv"
texto = p.read_text(encoding="utf-8")`,
    lang: "python",
  },
  {
    keys: [
      "lambda",
      "função lambda",
      "map python",
      "filter python",
      "funcional python",
    ],
    text: "Funções lambda e programação funcional em Python:",
    code: `# Lambda — função anônima de uma linha
dobrar = lambda x: x * 2
somar  = lambda a, b: a + b

# Uso com sorted
pessoas = [{"nome": "Ana", "idade": 25}, {"nome": "Bob", "idade": 30}]
ordenados = sorted(pessoas, key=lambda p: p["idade"])

# map — aplica função a cada elemento
nums = [1, 2, 3, 4]
dobrados = list(map(lambda x: x*2, nums)) # [2,4,6,8]

# filter — filtra elementos
pares = list(filter(lambda x: x%2==0, nums)) # [2,4]

# Prefira list comprehension (mais pythônico)
dobrados = [x*2 for x in nums]
pares    = [x for x in nums if x%2==0]

# reduce
from functools import reduce
produto = reduce(lambda acc, x: acc*x, nums) # 24`,
    lang: "python",
  },
  {
    keys: [
      "try except",
      "exception python",
      "erro python",
      "raise",
      "finally python",
    ],
    text: "Tratamento de exceções em Python:",
    code: `# Capturar exceções específicas
try:
    resultado = int(input("Digite um número: "))
    print(10 / resultado)

except ValueError:
    print("Não é um número válido")
except ZeroDivisionError:
    print("Não pode dividir por zero")
except (TypeError, AttributeError) as e:
    print(f"Tipo errado: {e}")
except Exception as e:
    print(f"Erro inesperado: {e}")
    raise  # re-lança
else:
    print("Sem erros!")   # só executa se não houve exceção
finally:
    print("Sempre executa") # limpeza de recursos

# Exceção customizada
class SaldoInsuficienteError(Exception):
    def __init__(self, saldo, valor):
        super().__init__(f"Saldo {saldo} < {valor}")
        self.saldo = saldo`,
    lang: "python",
  },
  {
    keys: [
      "classe python",
      "class python",
      "init",
      "self",
      "herança python",
      "método",
    ],
    text: "Classes em Python — POO completa:",
    code: `from dataclasses import dataclass, field
from typing import ClassVar

@dataclass
class Produto:
    nome:  str
    preco: float
    tags:  list = field(default_factory=list)
    _total_criados: ClassVar[int] = 0  # variável de classe

    def __post_init__(self):
        Produto._total_criados += 1
        if self.preco < 0:
            raise ValueError("Preço não pode ser negativo")

    @property
    def preco_com_iva(self) -> float:
        return self.preco * 1.23

    @classmethod
    def total(cls) -> int:
        return cls._total_criados

    def __repr__(self):
        return f"Produto({self.nome!r}, R\${self.preco:.2f})"

p = Produto("Notebook", 3500.0, ["tech"])
print(p.preco_com_iva) # 4305.0`,
    lang: "python",
  },

  // ── Git avançado ─────────────────────────────────────────
  {
    keys: ["git stash", "stash", "guardar alterações"],
    text: "Git Stash — guardar trabalho em progresso temporariamente:",
    code: `# Salvar estado atual (modificações não commitadas)
git stash              # guarda tudo
git stash push -m "WIP: login form"  # com nome

# Listar stashes
git stash list
# stash@{0}: WIP: login form
# stash@{1}: WIP: refactor utils

# Aplicar
git stash pop          # aplica e remove o último
git stash apply stash@{1} # aplica sem remover

# Ver o que está no stash
git stash show -p stash@{0}

# Incluir arquivos novos (untracked)
git stash push --include-untracked

# Apagar
git stash drop stash@{0}
git stash clear  # limpa todos`,
    lang: "bash",
  },
  {
    keys: ["git reset", "git revert", "desfazer commit", "undo commit"],
    text: "Desfazer commits em Git — com segurança:",
    code: `# ── git revert (SEGURO — cria novo commit) ──
git revert HEAD        # desfaz último commit
git revert abc1234     # desfaz commit específico

# ── git reset (CUIDADO — reescreve história) ──

# --soft: desfaz commit, mantém mudanças staged
git reset --soft HEAD~1

# --mixed (padrão): desfaz commit e stage, mantém arquivos
git reset HEAD~1

# --hard: descarta tudo (perda de dados!)
git reset --hard HEAD~1

# Recuperar após reset --hard (dentro da janela de reflog)
git reflog            # encontra o hash
git reset --hard abc1234

# Desfazer apenas o stage de um arquivo
git restore --staged arquivo.js`,
    lang: "bash",
  },
  {
    keys: ["gitignore", ".gitignore", "ignorar arquivo", "ignore"],
    text: "`.gitignore` — quais arquivos não versionar:",
    code: `# .gitignore — exemplos essenciais

# Dependências
node_modules/
vendor/
.venv/
__pycache__/
*.pyc

# Variáveis de ambiente (NUNCA versionar!)
.env
.env.local
.env.*.local

# Build e dist
dist/
build/
*.min.js
*.min.css

# Logs
*.log
npm-debug.log*

# IDEs
.vscode/settings.json
.idea/
*.swp

# SO
.DS_Store
Thumbs.db

# Verificar se arquivo está ignorado
git check-ignore -v arquivo.txt

# Parar de rastrear arquivo já commitado
git rm --cached segredo.txt
echo "segredo.txt" >> .gitignore`,
    lang: "bash",
  },
  {
    keys: [
      "conventional commit",
      "commit convencional",
      "commit padrão",
      "feat fix docs",
    ],
    text: "Conventional Commits — padrão de mensagens de commit:\n\nFormato: `tipo(escopo): descrição`\n\n• `feat:` — nova funcionalidade\n• `fix:` — correção de bug\n• `docs:` — documentação\n• `style:` — formatação (sem lógica)\n• `refactor:` — refatoração\n• `test:` — testes\n• `chore:` — tarefas de build, CI\n• `perf:` — melhoria de performance\n• `ci:` — mudanças de CI/CD\n\nBreaking change: adicione `!` ou `BREAKING CHANGE:` no rodapé.\n\nFerramentas: `commitlint`, `commitizen`, `husky`",
    code: `# Exemplos corretos
git commit -m "feat(auth): add JWT refresh token"
git commit -m "fix(api): handle null response from payment gateway"
git commit -m "docs(readme): add docker setup instructions"
git commit -m "refactor!: migrate from REST to GraphQL"
# BREAKING CHANGE — o ! indica breaking

# Commit com corpo e rodapé
git commit -m "feat(billing): add Stripe integration

Integrates Stripe API for payment processing.
Includes webhook handler for async confirmations.

Closes #42
BREAKING CHANGE: removes legacy PayPal provider"`,
    lang: "bash",
  },

  // ── HTTP e Web ───────────────────────────────────────────
  {
    keys: [
      "http method",
      "métodos http",
      "get post put delete patch",
      "verbo http",
    ],
    text: "Métodos HTTP — quando usar cada um:\n\n• `GET` — buscar dados (sem corpo, idempotente)\n• `POST` — criar recurso (com corpo, não idempotente)\n• `PUT` — substituir recurso completo\n• `PATCH` — atualizar parcialmente\n• `DELETE` — remover\n• `HEAD` — igual ao GET mas sem body (checar existência)\n• `OPTIONS` — listar métodos permitidos (usado no CORS)\n\n**Idempotência:** chamar múltiplas vezes tem o mesmo resultado (GET, PUT, DELETE são; POST não é).",
    code: `// REST API — nomenclatura de rotas
GET    /api/users           // listar todos
GET    /api/users/:id       // buscar um
POST   /api/users           // criar
PUT    /api/users/:id       // substituir
PATCH  /api/users/:id       // atualizar parcial
DELETE /api/users/:id       // deletar

// PATCH body (só o que muda)
PATCH /api/users/1
{ "email": "novo@email.com" }

// vs PUT (envia o objeto inteiro)
PUT /api/users/1
{ "id": 1, "nome": "Ana", "email": "novo@email.com" }`,
    lang: "http",
  },
  {
    keys: [
      "status code",
      "status http",
      "404",
      "200",
      "201",
      "500",
      "401",
      "403",
    ],
    text: "HTTP Status Codes — os mais importantes:\n\n**2xx — Sucesso**\n• `200 OK` — requisição bem-sucedida\n• `201 Created` — recurso criado\n• `204 No Content` — sucesso sem corpo (DELETE)\n\n**3xx — Redirecionamento**\n• `301 Moved Permanently` — URL mudou para sempre\n• `302 Found` — redirecionamento temporário\n\n**4xx — Erro do cliente**\n• `400 Bad Request` — payload inválido\n• `401 Unauthorized` — não autenticado\n• `403 Forbidden` — autenticado mas sem permissão\n• `404 Not Found` — recurso não existe\n• `422 Unprocessable Entity` — validação falhou\n• `429 Too Many Requests` — rate limiting\n\n**5xx — Erro do servidor**\n• `500 Internal Server Error` — erro inesperado\n• `503 Service Unavailable` — fora do ar",
  },
  {
    keys: ["cors", "cross-origin", "origin", "access-control", "preflight"],
    text: "CORS — Cross-Origin Resource Sharing:",
    code: `// O que é: browser bloqueia requisições entre origens
// diferentes por segurança. O servidor precisa autorizar.

// No Express (Node.js)
const cors = require("cors");

app.use(cors({
    origin: ["https://meusite.com", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // permite cookies cross-origin
}));

// Para rota específica
app.get("/api/publica", cors(), handler);

// Preflight (OPTIONS) — browser envia antes do POST/PUT
// O servidor deve responder com os headers Access-Control-*
app.options("*", cors()); // habilitar preflight global

// Headers que o servidor deve retornar:
// Access-Control-Allow-Origin: https://meusite.com
// Access-Control-Allow-Methods: GET, POST
// Access-Control-Allow-Headers: Content-Type`,
    lang: "javascript",
  },
  {
    keys: [
      "jwt",
      "token",
      "json web token",
      "autenticação",
      "authentication",
      "bearer",
    ],
    text: "JWT — JSON Web Tokens para autenticação stateless:",
    code: `// Estrutura: header.payload.signature (Base64)
// header:  { alg: "HS256", typ: "JWT" }
// payload: { sub: "userId", exp: timestamp, role: "admin" }

// Node.js — gerar e verificar
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

// Gerar token (no login)
const token = jwt.sign(
    { userId: 1, role: "admin" },
    SECRET,
    { expiresIn: "7d" }
);

// Verificar (middleware)
function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) return res.status(401).json({ error: "Token ausente" });

    try {
        const payload = jwt.verify(header.slice(7), SECRET);
        req.user = payload;
        next();
    } catch {
        res.status(401).json({ error: "Token inválido" });
    }
}`,
    lang: "javascript",
  },
  {
    keys: ["websocket", "ws", "socket.io", "tempo real", "realtime"],
    text: "WebSockets — comunicação bidirecional em tempo real:",
    code: `// Servidor com ws (Node.js)
const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 8080 });

const clientes = new Set();

wss.on("connection", (ws) => {
    clientes.add(ws);
    console.log("Cliente conectado");

    ws.on("message", (msg) => {
        // Broadcast para todos
        const texto = msg.toString();
        clientes.forEach(c => {
            if (c.readyState === ws.OPEN) c.send(texto);
        });
    });

    ws.on("close", () => clientes.delete(ws));
});

// Cliente (browser)
const socket = new WebSocket("ws://localhost:8080");
socket.onopen    = () => socket.send("Olá servidor!");
socket.onmessage = (e) => console.log("Recebido:", e.data);
socket.onclose   = () => console.log("Desconectado");`,
    lang: "javascript",
  },
  {
    keys: ["graphql", "query graphql", "mutation", "schema", "resolver"],
    text: "GraphQL — alternativa ao REST com queries flexíveis:",
    code: `# Schema (define os tipos)
type Query {
    usuario(id: ID!): Usuario
    usuarios: [Usuario!]!
}

type Mutation {
    criarUsuario(input: CriarUsuarioInput!): Usuario!
}

type Usuario {
    id:    ID!
    nome:  String!
    posts: [Post!]!
}

# Query (cliente define o que quer — sem over/under-fetching)
query {
    usuario(id: "1") {
        nome
        posts {
            titulo
        }
    }
}

# Vantagem vs REST:
# REST: GET /users/1 → retorna TUDO (over-fetching)
#       GET /users/1/posts → segunda request (under-fetching)
# GraphQL: uma query, só os campos pedidos`,
    lang: "graphql",
  },
  {
    keys: ["cookie", "session", "cookie vs localstorage", "sessão"],
    text: "Cookies vs LocalStorage vs SessionStorage:\n\n| | Cookie | LocalStorage | SessionStorage |\n|---|---|---|---|\n| Capacidade | 4KB | 5-10MB | 5-10MB |\n| Expira | configurável | nunca | fechar aba |\n| Enviado ao servidor | sim (automático) | não | não |\n| Acessível via JS | sim* | sim | sim |\n| Seguro (HttpOnly) | sim | não | não |\n\n**Boas práticas:**\n• Tokens de sessão → Cookie HttpOnly + Secure (JS não acessa)\n• Preferências de UI → LocalStorage\n• Estado de wizard → SessionStorage\n• Nunca guarde senhas ou dados sensíveis no browser",
  },

  // ── Banco de Dados avançado ──────────────────────────────
  {
    keys: ["nosql", "mongodb", "documento", "document database", "mongoose"],
    text: "MongoDB com Mongoose — banco de documentos NoSQL:",
    code: `const mongoose = require("mongoose");

// Schema e Model
const usuarioSchema = new mongoose.Schema({
    nome:  { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    idade: { type: Number, min: 0, max: 150 },
    tags:  [String],
    criadoEm: { type: Date, default: Date.now }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

// CRUD
const novo = await Usuario.create({ nome: "Ana", email: "ana@email.com" });

const todos = await Usuario.find({ idade: { $gte: 18 } })
    .sort({ nome: 1 })
    .limit(10)
    .select("nome email -_id"); // apenas esses campos

await Usuario.findByIdAndUpdate(id, { $set: { nome: "Ana Lima" } });
await Usuario.findByIdAndDelete(id);`,
    lang: "javascript",
  },
  {
    keys: ["indice", "índice", "index sql", "index banco", "performance sql"],
    text: "Índices em banco de dados — acelerar consultas:",
    code: `-- Criar índice (acelera WHERE, JOIN, ORDER BY)
CREATE INDEX idx_email ON usuarios(email);

-- Índice composto (para queries que filtram ambos)
CREATE INDEX idx_nome_cidade ON usuarios(nome, cidade);

-- Índice único
CREATE UNIQUE INDEX idx_cpf ON pessoas(cpf);

-- Ver plano de execução (diagnosticar lentidão)
EXPLAIN ANALYZE
SELECT * FROM pedidos WHERE cliente_id = 42;

-- Quando usar índice:
-- ✅ Colunas em WHERE, JOIN ON, ORDER BY frequentes
-- ✅ Chaves estrangeiras
-- ❌ Tabelas pequenas (< 1000 linhas)
-- ❌ Colunas com poucos valores distintos (sexo: M/F)
-- ❌ Colunas que sofrem muitos UPDATEs (custo de manutenção)`,
    lang: "sql",
  },
  {
    keys: [
      "transação",
      "transaction",
      "acid",
      "commit sql",
      "rollback",
      "begin",
    ],
    text: "Transações SQL — garantir consistência de dados (ACID):",
    code: `-- Transferência bancária (exemplo clássico)
BEGIN;

UPDATE contas SET saldo = saldo - 500 WHERE id = 1;
UPDATE contas SET saldo = saldo + 500 WHERE id = 2;

-- Verificar se deu certo
-- se ok:
COMMIT;
-- se erro:
ROLLBACK;

-- No Node.js com pg (postgres)
const client = await pool.connect();
try {
    await client.query("BEGIN");
    await client.query("UPDATE contas SET saldo = saldo - 500 WHERE id = $1", [1]);
    await client.query("UPDATE contas SET saldo = saldo + 500 WHERE id = $1", [2]);
    await client.query("COMMIT");
} catch (err) {
    await client.query("ROLLBACK");
    throw err;
} finally {
    client.release();
}`,
    lang: "sql",
  },

  // ── DevOps e Ferramentas ─────────────────────────────────
  {
    keys: [
      "env",
      ".env",
      "variavel de ambiente",
      "dotenv",
      "process.env",
      "environment variable",
    ],
    text: "Variáveis de ambiente — configuração sem hardcode:",
    code: `# .env (NUNCA commitar no git!)
DATABASE_URL=postgres://user:senha@localhost:5432/db
JWT_SECRET=um-segredo-muito-longo-e-aleatorio
PORT=3000
NODE_ENV=development

# .gitignore deve ter:
# .env
# .env.local
# .env.*.local

# Node.js — carregar com dotenv
require("dotenv").config();

const porta = process.env.PORT ?? 3000;
const db    = process.env.DATABASE_URL;

if (!db) throw new Error("DATABASE_URL não configurada!");

# Boas práticas:
# - Tenha um .env.example com as chaves (sem valores reais)
# - Valide as vars na inicialização da app
# - Em produção, use o gerenciador do provedor (Vercel, Railway, AWS)`,
    lang: "bash",
  },
  {
    keys: [
      "github actions",
      "ci/cd",
      "pipeline",
      "workflow",
      "deploy automático",
    ],
    text: "GitHub Actions — CI/CD automatizado:",
    code: `# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test

      - name: Build
        run: npm run build`,
    lang: "yaml",
  },
  {
    keys: [
      "npm",
      "yarn",
      "pnpm",
      "package.json",
      "npm scripts",
      "gerenciador de pacotes",
    ],
    text: "npm Scripts — automatizar tarefas no package.json:",
    code: `{
  "scripts": {
    "dev":   "node --watch src/index.js",
    "start": "node src/index.js",
    "build": "tsc && vite build",
    "test":  "jest --coverage",
    "lint":  "eslint src --fix",
    "fmt":   "prettier --write src"
  }
}

# Executar
npm run dev
npm test          # atalho para "test"
npm start         # atalho para "start"

# Passando argumentos
npm test -- --watch

# npm vs yarn vs pnpm
# npm:  padrão, vem com Node.js
# yarn: mais rápido, workspaces maduro
# pnpm: mais eficiente em disco (symlinks), recomendado em monorepos

# Verificar versões desatualizadas
npm outdated
npx npm-check-updates -u`,
    lang: "json",
  },
  {
    keys: [
      "eslint",
      "prettier",
      "linter",
      "formatação",
      "lint",
      "eslintrc",
      "prettierrc",
    ],
    text: "ESLint + Prettier — padronizar e formatar código automaticamente:",
    code: `# Instalar
npm install -D eslint prettier eslint-config-prettier

# .eslintrc.json
{
  "extends": ["eslint:recommended", "prettier"],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off",
    "prefer-const": "error"
  },
  "env": { "browser": true, "node": true, "es2022": true }
}

# .prettierrc
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 4,
  "printWidth": 100,
  "trailingComma": "es5"
}

# package.json scripts
"lint":   "eslint src --fix",
"format": "prettier --write src",

# VS Code — formatar ao salvar
# settings.json: "editor.formatOnSave": true`,
    lang: "json",
  },
  {
    keys: [
      "jest",
      "teste",
      "testing",
      "unit test",
      "describe",
      "it(",
      "expect",
      "mock",
    ],
    text: "Jest — testes unitários em JavaScript:",
    code: `// soma.js
export const somar = (a, b) => a + b;

// soma.test.js
import { somar } from "./soma";

describe("somar()", () => {
    it("soma dois números positivos", () => {
        expect(somar(2, 3)).toBe(5);
    });

    it("soma números negativos", () => {
        expect(somar(-1, -1)).toBe(-2);
    });

    it("retorna número quando segundo é 0", () => {
        expect(somar(5, 0)).toBe(5);
    });
});

// Mock de módulo
jest.mock("../api/usuarios");
import { buscarUsuario } from "../api/usuarios";
buscarUsuario.mockResolvedValue({ id: 1, nome: "Ana" });

// Testar assíncrono
it("busca usuário", async () => {
    const user = await buscarUsuario(1);
    expect(user).toHaveProperty("nome", "Ana");
});`,
    lang: "javascript",
  },
  {
    keys: [
      "linux",
      "terminal",
      "bash",
      "comando linux",
      "shell command",
      "cli",
    ],
    text: "Comandos Linux/Unix essenciais para devs:",
    code: `# Navegação
pwd           # diretório atual
ls -la        # listar com detalhes e ocultos
cd ~          # ir para home
cd -          # voltar ao diretório anterior

# Arquivos
cp -r src/ dest/      # copiar diretório
mv arquivo.txt novo/  # mover/renomear
rm -rf pasta/         # remover (cuidado!)
find . -name "*.js"   # buscar arquivos
grep -r "TODO" src/   # buscar texto recursivamente

# Permissões
chmod +x script.sh    # tornar executável
chmod 644 arquivo.txt # rw-r--r--

# Processos
ps aux | grep node    # listar processos
kill -9 PID           # forçar encerramento
htop                  # monitor interativo

# Rede
curl -X POST https://api.exemplo.com/data \\
     -H "Content-Type: application/json" \\
     -d '{"chave":"valor"}'
netstat -tlnp          # portas em uso`,
    lang: "bash",
  },
  {
    keys: ["ssh", "chave ssh", "ssh key", "servidor remoto", "sftp"],
    text: "SSH — conexão segura com servidores remotos:",
    code: `# Gerar par de chaves (faça uma vez)
ssh-keygen -t ed25519 -C "seu@email.com"
# Salva em: ~/.ssh/id_ed25519 (privada) e ~/.ssh/id_ed25519.pub

# Copiar chave pública para o servidor
ssh-copy-id usuario@servidor.com
# ou manualmente: cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys

# Conectar
ssh usuario@servidor.com
ssh -p 2222 usuario@servidor.com  # porta customizada

# ~/.ssh/config (aliases)
Host meu-server
    HostName 192.168.1.100
    User deploy
    Port 2222
    IdentityFile ~/.ssh/id_ed25519

ssh meu-server  # usa o alias

# SCP — copiar arquivos
scp arquivo.txt usuario@servidor.com:/home/usuario/
scp -r pasta/ usuario@servidor.com:/var/www/`,
    lang: "bash",
  },

  // ── Segurança ────────────────────────────────────────────
  {
    keys: [
      "xss",
      "cross-site scripting",
      "injection html",
      "sanitizar",
      "sanitize",
    ],
    text: "XSS (Cross-Site Scripting) — injeção de scripts maliciosos:",
    code: `// VULNERÁVEL — nunca inserir input do usuário direto no DOM
element.innerHTML = req.query.nome; // ⚠️ PERIGO

// SEGURO — usar textContent ou escapar
element.textContent = req.query.nome; // só texto, sem HTML

// Escapar caracteres especiais (server-side)
function escape(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Biblioteca recomendada: DOMPurify (client) ou sanitize-html (server)
import DOMPurify from "dompurify";
const limpo = DOMPurify.sanitize(conteudoDoUsuario);

// Content Security Policy (header HTTP)
// Content-Security-Policy: default-src 'self'; script-src 'self'
// Bloqueia scripts de origens não autorizadas`,
    lang: "javascript",
  },
  {
    keys: [
      "sql injection",
      "injeção sql",
      "prepared statement",
      "parameterized query",
    ],
    text: "SQL Injection — nunca concatenar input em queries:",
    code: `// VULNERÁVEL
const query = "SELECT * FROM users WHERE email = '" + email + "'";
// Atacante envia: ' OR '1'='1 → retorna todos os usuários!

// SEGURO — Prepared Statements (parâmetros separados)
// Node.js + pg (PostgreSQL)
const { rows } = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND senha = $2",
    [email, senhaHash]
);

// Node.js + MySQL/mysql2
const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
);

// ORM também é seguro (usa prepared statements internamente)
const user = await User.findOne({ where: { email } }); // Sequelize

// Princípio: NUNCA concatenar input do usuário em SQL.
// Sempre use parâmetros ou ORM.`,
    lang: "javascript",
  },
  {
    keys: ["hash", "bcrypt", "senha", "password", "criptografia", "crypto"],
    text: "Hashing de senhas — nunca salvar em texto claro:",
    code: `// bcrypt — algoritmo recomendado para senhas
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 12; // custo computacional (8-14 é razoável)

// Ao cadastrar
async function salvarSenha(senhaPlana) {
    const hash = await bcrypt.hash(senhaPlana, SALT_ROUNDS);
    return hash; // salvar isso no banco
}

// Ao fazer login
async function verificarSenha(senhaPlana, hashSalvo) {
    const ok = await bcrypt.compare(senhaPlana, hashSalvo);
    return ok; // true = senha correta
}

// Nunca:
// ❌ MD5 ou SHA1 (rápidos demais → força bruta)
// ❌ Criptografia simétrica (reversível)
// ❌ Salvar senha em texto plano

// Para tokens/chaves (não senhas): use crypto.randomBytes
const token = require("crypto").randomBytes(32).toString("hex");`,
    lang: "javascript",
  },
  {
    keys: ["https", "ssl", "tls", "certificado", "http seguro"],
    text: "HTTPS/TLS — por que e como implementar:\n\n**Por que HTTPS:**\n• Criptografa dados em trânsito (senha, token, dados pessoais)\n• Obrigatório para cookies Secure e service workers\n• Google penaliza HTTP no SEO\n• Browsers mostram aviso de 'não seguro'\n\n**Como obter certificado:**\n• **Let's Encrypt** — grátis, renovação automática (use Certbot)\n• Provedores de hospedagem (Vercel, Netlify, Railway) — automático\n• Cloudflare — SSL grátis na borda\n\n**Headers de segurança importantes:**\n• `HSTS` — força HTTPS\n• `X-Content-Type-Options: nosniff`\n• `X-Frame-Options: DENY`\n• `Content-Security-Policy`",
  },

  // ── Conceitos de programação ─────────────────────────────
  {
    keys: [
      "big o",
      "complexidade",
      "o(n)",
      "o(log n)",
      "algoritmo tempo",
      "performance algoritmo",
    ],
    text: "Big O Notation — medir eficiência de algoritmos:\n\n| Notação | Nome | Exemplo |\n|---|---|---|\n| O(1) | Constante | acesso a array por índice |\n| O(log n) | Logarítmica | busca binária |\n| O(n) | Linear | percorrer array |\n| O(n log n) | Linearítmica | merge sort |\n| O(n²) | Quadrática | bubble sort, loops aninhados |\n| O(2ⁿ) | Exponencial | fibonacci sem memo |\n\nRegras práticas:\n• Ignorar constantes: O(2n) → O(n)\n• Ignorar termos menores: O(n² + n) → O(n²)\n• Loops aninhados multiplicam: O(n) × O(n) = O(n²)",
    code: `// O(1) — constante
function primeiroItem(arr) { return arr[0]; }

// O(n) — linear
function buscarLinear(arr, alvo) {
    for (const item of arr) {
        if (item === alvo) return item;
    }
    return null;
}

// O(log n) — logarítmica (divide e conquista)
function buscaBinaria(arr, alvo) {
    let esq = 0, dir = arr.length - 1;
    while (esq <= dir) {
        const meio = Math.floor((esq + dir) / 2);
        if (arr[meio] === alvo) return meio;
        if (arr[meio] < alvo) esq = meio + 1;
        else dir = meio - 1;
    }
    return -1;
}

// O(n²) — quadrática (evitar em dados grandes)
function bubblesort(arr) {
    for (let i = 0; i < arr.length; i++)
        for (let j = 0; j < arr.length - i - 1; j++)
            if (arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
}`,
    lang: "javascript",
  },
  {
    keys: [
      "estrutura de dados",
      "linked list",
      "pilha",
      "fila",
      "stack",
      "queue",
      "heap",
    ],
    text: "Estruturas de Dados — resumo essencial:",
    code: `// PILHA (Stack) — LIFO (Last In, First Out)
class Pilha {
    #itens = [];
    push(item) { this.#itens.push(item); }
    pop()      { return this.#itens.pop(); }
    peek()     { return this.#itens.at(-1); }
    vazia()    { return this.#itens.length === 0; }
}
// Uso: histórico de undo/redo, chamadas de função (call stack)

// FILA (Queue) — FIFO (First In, First Out)
class Fila {
    #itens = [];
    enqueue(item) { this.#itens.push(item); }
    dequeue()     { return this.#itens.shift(); }
    frente()      { return this.#itens[0]; }
}
// Uso: fila de impressão, processamento de jobs

// LISTA LIGADA (Linked List)
class No { constructor(val) { this.val = val; this.next = null; } }
class ListaLigada {
    head = null;
    inserir(val) {
        const no = new No(val);
        if (!this.head) { this.head = no; return; }
        let atual = this.head;
        while (atual.next) atual = atual.next;
        atual.next = no;
    }
}`,
    lang: "javascript",
  },
  {
    keys: [
      "solid",
      "princípio",
      "single responsibility",
      "open closed",
      "liskov",
      "interface segregation",
      "dependency inversion",
    ],
    text: "SOLID — os 5 princípios de design orientado a objetos:\n\n**S** — Single Responsibility: cada classe tem uma razão para mudar\n**O** — Open/Closed: aberto para extensão, fechado para modificação\n**L** — Liskov Substitution: subclasses substituem a superclasse sem quebrar\n**I** — Interface Segregation: interfaces pequenas e específicas\n**D** — Dependency Inversion: depender de abstrações, não de implementações\n\n**Benefícios:** código mais testável, manutenível e extensível.",
    code: `// S — Single Responsibility (ruim vs bom)
// ❌ Uma classe faz tudo
class Usuario {
    salvar() { /* lógica de banco */ }
    enviarEmail() { /* lógica de e-mail */ }
    formatar() { /* lógica de UI */ }
}

// ✅ Separar responsabilidades
class UsuarioRepo   { salvar(usuario) { /*db*/ } }
class EmailService  { enviar(para, msg) { /*smtp*/ } }
class UsuarioMapper { paraDTO(usuario) { /*format*/ } }

// D — Dependency Inversion
// ❌ depende de implementação concreta
class Pedido {
    constructor() { this.db = new MySQL(); } // acoplado!
}

// ✅ depende de abstração (injeção de dependência)
class Pedido {
    constructor(db) { this.db = db; } // qualquer banco!
}
const pedido = new Pedido(new MySQL());
const pedidoTest = new Pedido(new FakeDb());`,
    lang: "javascript",
  },
  {
    keys: [
      "design pattern",
      "padrão de projeto",
      "singleton",
      "factory",
      "observer",
      "strategy",
    ],
    text: "Design Patterns — soluções clássicas para problemas comuns:",
    code: `// SINGLETON — uma única instância
class Config {
    static #instance;
    #dados = {};

    static getInstance() {
        if (!this.#instance) this.#instance = new Config();
        return this.#instance;
    }
    set(k, v) { this.#dados[k] = v; }
    get(k)    { return this.#dados[k]; }
}

// OBSERVER — publicar/subscrever eventos
class EventEmitter {
    #listeners = {};
    on(event, fn) {
        (this.#listeners[event] ??= []).push(fn);
    }
    emit(event, data) {
        this.#listeners[event]?.forEach(fn => fn(data));
    }
}

// FACTORY — criar objetos sem expor construtor
function criarAnimal(tipo) {
    const tipos = { cachorro: Cachorro, gato: Gato };
    const Classe = tipos[tipo];
    if (!Classe) throw new Error("Tipo inválido");
    return new Classe();
}`,
    lang: "javascript",
  },
  {
    keys: [
      "functional programming",
      "programação funcional",
      "imutabilidade",
      "pure function",
      "side effect",
    ],
    text: "Programação Funcional — princípios e padrões:",
    code: `// 1. Funções puras — mesmo input, mesmo output, sem efeitos colaterais
const somar = (a, b) => a + b; // pura
let total = 0;
const somarImpura = (n) => (total += n); // impura (efeito colateral)

// 2. Imutabilidade — não mutar, criar novos valores
const original = [1, 2, 3];
const novo = [...original, 4];         // não muta original
const semPrimeiro = original.slice(1); // não muta

// 3. Composição de funções
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const processar = pipe(
    x => x * 2,
    x => x + 1,
    x => x.toString()
);
processar(5); // "11"

// 4. Currying
const saudar = (saudacao) => (nome) => \`\${saudacao}, \${nome}!\`;
const olá = saudar("Olá");
olá("Ana"); // "Olá, Ana!"
olá("Bob"); // "Olá, Bob!"`,
    lang: "javascript",
  },
  {
    keys: [
      "microservico",
      "microsserviço",
      "microservice",
      "monolito",
      "arquitetura",
    ],
    text: "Microsserviços vs Monolito — quando usar cada um:\n\n**Monolito:**\n• Uma aplicação, uma deploy\n• Simples de desenvolver e debugar no início\n• Ideal para times pequenos e MVPs\n• Problemas: escalar partes específicas, deploys de risco\n\n**Microsserviços:**\n• Serviços independentes por domínio (auth, pagamento, catálogo)\n• Deploy e escala independentes\n• Time pode escolher tecnologia por serviço\n• Complexidade: comunicação entre serviços, observabilidade, latência de rede\n\n**Regra prática:** comece monolito, extraia microsserviços quando a dor justificar (escala ou times independentes).\n\nComunicação: REST, gRPC, ou mensageria (RabbitMQ, Kafka).",
  },
  {
    keys: ["mvc", "model view controller", "padrão mvc", "mvvm"],
    text: "MVC — padrão arquitetural Model-View-Controller:",
    code: `// MODEL — regras de negócio e dados
class ProdutoModel {
    async buscarTodos() {
        return await db.query("SELECT * FROM produtos");
    }
    async criar(dados) {
        // validação de negócio
        if (dados.preco < 0) throw new Error("Preço inválido");
        return await db.query("INSERT ...", [dados]);
    }
}

// CONTROLLER — recebe request, chama Model, responde
class ProdutoController {
    constructor(model) { this.model = model; }

    async listar(req, res) {
        const produtos = await this.model.buscarTodos();
        res.json(produtos);
    }

    async criar(req, res) {
        const produto = await this.model.criar(req.body);
        res.status(201).json(produto);
    }
}

// VIEW — em APIs REST, o JSON é a "view"
// Em apps web full-stack, seria o HTML/template

// ROUTER — conecta rotas aos controllers
router.get("/produtos", ctrl.listar.bind(ctrl));
router.post("/produtos", ctrl.criar.bind(ctrl));`,
    lang: "javascript",
  },
  {
    keys: [
      "tdd",
      "test driven",
      "desenvolvimento guiado",
      "red green refactor",
    ],
    text: "TDD — Test Driven Development (desenvolvimento guiado por testes):\n\nCiclo: **Red → Green → Refactor**\n\n1. **Red:** escreva o teste que falha (a feature ainda não existe)\n2. **Green:** escreva o mínimo de código para o teste passar\n3. **Refactor:** melhore o código sem quebrar os testes\n\n**Benefícios:**\n• Design emergente e desacoplado\n• Documentação viva (testes descrevem comportamento)\n• Confiança para refatorar\n• Menos bugs em produção\n\n**Quando não usar:** prototipagem rápida, código descartável, integração com sistemas externos imprevisíveis.",
    code: `// 1. RED — teste falha (calculadora não existe)
it("divide dois números", () => {
    expect(dividir(10, 2)).toBe(5);
    expect(dividir(9, 3)).toBe(3);
});

it("lança erro ao dividir por zero", () => {
    expect(() => dividir(5, 0)).toThrow("Divisão por zero");
});

// 2. GREEN — implementação mínima
function dividir(a, b) {
    if (b === 0) throw new Error("Divisão por zero");
    return a / b;
}

// 3. REFACTOR — melhorar sem quebrar
// (aqui já está simples, nada a refatorar)
// Em casos reais: extrair, renomear, otimizar`,
    lang: "javascript",
  },

  // ── Next.js / React ──────────────────────────────────────
  {
    keys: [
      "next",
      "next.js",
      "nextjs",
      "server component",
      "app router",
      "ssr",
      "ssg",
    ],
    text: "Next.js — React com SSR, SSG e App Router:",
    code: `// app/page.tsx — Server Component (padrão no App Router)
// Roda no servidor — acessa banco, sem bundle extra
async function HomePage() {
    const posts = await fetch("https://api.exemplo.com/posts")
        .then(r => r.json());

    return (
        <main>
            {posts.map(p => <PostCard key={p.id} post={p} />)}
        </main>
    );
}

// "use client" — Client Component (interatividade)
"use client";
import { useState } from "react";

function Contador() {
    const [n, setN] = useState(0);
    return <button onClick={() => setN(n+1)}>{n}</button>;
}

// API Route — app/api/users/route.ts
export async function GET() {
    const users = await db.findAll();
    return Response.json(users);
}

export async function POST(req: Request) {
    const body = await req.json();
    const user = await db.create(body);
    return Response.json(user, { status: 201 });
}`,
    lang: "jsx",
  },
  {
    keys: ["tailwind", "tailwindcss", "utility class", "classe utilitária"],
    text: "Tailwind CSS — utility-first sem sair do HTML:",
    code: `<!-- Sem Tailwind (CSS separado) -->
<div class="card">
  <h2 class="card-title">Título</h2>
</div>

<!-- Com Tailwind (classes utilitárias inline) -->
<div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
  <h2 class="text-xl font-semibold text-gray-800 mb-2">Título</h2>
  <p class="text-gray-500 text-sm leading-relaxed">Texto...</p>
  <button class="mt-4 bg-blue-500 hover:bg-blue-600 text-white
                  px-4 py-2 rounded-lg font-medium transition">
    Ação
  </button>
</div>

<!-- Responsivo e dark mode -->
<div class="text-sm md:text-base lg:text-lg
            dark:bg-gray-900 dark:text-white">

<!-- Agrupando com @apply (em CSS) -->
/* globals.css */
.btn-primary {
  @apply bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600;
}`,
    lang: "html",
  },

  // ── Node.js avançado ─────────────────────────────────────
  {
    keys: [
      "fs",
      "filesystem",
      "sistema de arquivo",
      "path",
      "readfile",
      "writefile",
    ],
    text: "Node.js File System (fs) — manipular arquivos:",
    code: `const fs   = require("fs/promises"); // versão async
const path = require("path");

// Ler arquivo
const conteudo = await fs.readFile("dados.txt", "utf8");

// Escrever
await fs.writeFile("saida.txt", "conteúdo aqui\\n");

// Acrescentar
await fs.appendFile("log.txt", new Date() + "\\n");

// Verificar se existe
try {
    await fs.access("arquivo.json");
    console.log("existe");
} catch {
    console.log("não existe");
}

// Listar diretório
const arquivos = await fs.readdir("src");

// Criar diretório (recursivo)
await fs.mkdir("pasta/sub/deep", { recursive: true });

// Path — unir caminhos de forma segura
const caminho = path.join(__dirname, "assets", "logo.png");
const ext = path.extname("arquivo.js"); // ".js"`,
    lang: "javascript",
  },
  {
    keys: [
      "stream",
      "streams",
      "pipeline",
      "readable",
      "writable",
      "dados grandes",
    ],
    text: "Streams em Node.js — processar grandes volumes de dados:",
    code: `const fs       = require("fs");
const readline = require("readline");
const { pipeline } = require("stream/promises");
const zlib     = require("zlib");

// Ler arquivo grande linha por linha (sem carregar tudo em memória)
const rl = readline.createInterface({
    input: fs.createReadStream("enorme.csv"),
});

for await (const linha of rl) {
    console.log(linha); // processa uma linha por vez
}

// Compactar arquivo com pipeline (encadeia streams)
await pipeline(
    fs.createReadStream("entrada.txt"),
    zlib.createGzip(),
    fs.createWriteStream("saida.txt.gz")
);

// HTTP com stream (serve arquivo grande sem bufferizar)
app.get("/download", (req, res) => {
    res.setHeader("Content-Type", "application/octet-stream");
    fs.createReadStream("arquivo-grande.zip").pipe(res);
});`,
    lang: "javascript",
  },

  // ── Outros tópicos úteis ─────────────────────────────────
  {
    keys: ["vuejs", "vue", "vue.js", "composition api", "ref vue", "reactive"],
    text: "Vue.js — framework progressivo para UI reativas:",
    code: `<!-- Componente com Composition API (Vue 3) -->
<template>
    <div>
        <p>Contagem: {{ count }}</p>
        <button @click="incrementar">+1</button>
        <ul>
            <li v-for="item in lista" :key="item.id">
                {{ item.nome }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const count = ref(0);
const lista = ref([]);

const dobro = computed(() => count.value * 2);

function incrementar() {
    count.value++;
}

onMounted(async () => {
    const res = await fetch("/api/itens");
    lista.value = await res.json();
});
<\/script>

<style scoped>
button { background: #42b883; color: white; }
<\/style>`,
    lang: "html",
  },
  {
    keys: [
      "pwa",
      "progressive web app",
      "service worker",
      "manifest",
      "offline",
    ],
    text: "PWA — Progressive Web App (app instalável no browser):",
    code: `// manifest.json — torna o site "instalável"
{
    "name": "Meu App",
    "short_name": "App",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#0d1117",
    "theme_color": "#58a6ff",
    "icons": [
        { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
        { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
    ]
}

// service-worker.js — cache para funcionar offline
const CACHE = "v1";
const ARQUIVOS = ["/", "/index.html", "/styles.css", "/app.js"];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(ARQUIVOS))
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(cached => cached ?? fetch(e.request))
    );
});`,
    lang: "javascript",
  },
  {
    keys: ["axios", "http client", "interceptor", "instancia axios"],
    text: "Axios — cliente HTTP com interceptors e instâncias:",
    code: `import axios from "axios";

// Instância configurada
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10_000,
    headers: { "Content-Type": "application/json" },
});

// Interceptor de requisição (adicionar token automaticamente)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = \`Bearer \${token}\`;
    return config;
});

// Interceptor de resposta (tratar erros globalmente)
api.interceptors.response.use(
    (res) => res.data, // extrai data automaticamente
    (err) => {
        if (err.response?.status === 401) {
            logout(); // redirecionar para login
        }
        return Promise.reject(err);
    }
);

// Usar
const usuarios = await api.get("/users");
const novo = await api.post("/users", { nome: "Ana" });`,
    lang: "javascript",
  },
  {
    keys: ["orm", "sequelize", "prisma", "typeorm", "object relational"],
    text: "Prisma ORM — o mais moderno para Node.js/TypeScript:",
    code: `// schema.prisma
model Usuario {
    id        Int      @id @default(autoincrement())
    nome      String
    email     String   @unique
    posts     Post[]
    criadoEm DateTime @default(now())
}

model Post {
    id       Int      @id @default(autoincrement())
    titulo   String
    autor    Usuario  @relation(fields: [autorId], references: [id])
    autorId  Int
}

// Uso no código (TypeScript automático!)
const prisma = new PrismaClient();

// Buscar com relação
const usuario = await prisma.usuario.findUnique({
    where: { email: "ana@email.com" },
    include: { posts: true },
});

// Criar com relação
await prisma.usuario.create({
    data: {
        nome: "Bob",
        email: "bob@email.com",
        posts: { create: { titulo: "Meu post" } },
    },
});`,
    lang: "javascript",
  },
  {
    keys: [
      "performance",
      "otimização",
      "lazy load",
      "debounce",
      "throttle",
      "memoization",
    ],
    text: "Performance no front-end — técnicas práticas:",
    code: `// DEBOUNCE — espera o usuário parar de digitar
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
input.addEventListener("input", debounce(buscar, 300));

// THROTTLE — limita frequência (ex: scroll)
function throttle(fn, limit) {
    let esperando = false;
    return (...args) => {
        if (esperando) return;
        fn(...args);
        esperando = true;
        setTimeout(() => (esperando = false), limit);
    };
}
window.addEventListener("scroll", throttle(atualizar, 100));

// MEMOIZATION — cachear resultados de funções puras
function memoizar(fn) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const resultado = fn(...args);
        cache.set(key, resultado);
        return resultado;
    };
}
const fibMemo = memoizar(fib);`,
    lang: "javascript",
  },
  {
    keys: [
      "acessibilidade",
      "accessibility",
      "a11y",
      "aria",
      "wcag",
      "screen reader",
    ],
    text: "Acessibilidade Web (a11y) — código inclusivo:",
    code: `<!-- Atributos ARIA essenciais -->
<button aria-label="Fechar modal" onclick="fechar()">✕</button>

<!-- Região ao vivo para anúncios dinâmicos -->
<div aria-live="polite" aria-atomic="true">
    <!-- mensagens de status injetadas via JS -->
</div>

<!-- Imagens -->
<img src="logo.png" alt="Logo DevAssist — ByteForge">
<img src="decorativa.png" alt=""> <!-- alt vazio = decorativa -->

<!-- Formulário acessível -->
<label for="email">E-mail</label>
<input id="email" type="email"
       aria-required="true"
       aria-describedby="email-hint">
<span id="email-hint">Use seu e-mail corporativo</span>

<!-- Foco visível (nunca remover sem alternativa!) -->
/* CSS */
:focus-visible { outline: 2px solid #58a6ff; outline-offset: 2px; }

<!-- Tecla Tab deve funcionar em todos elementos interativos -->
<div role="button" tabindex="0" onkeypress="...">Clique</div>`,
    lang: "html",
  },
  {
    keys: ["web vitals", "lcp", "fid", "cls", "core web vitals", "lighthouse"],
    text: "Core Web Vitals — métricas de performance do Google:\n\n• **LCP** (Largest Contentful Paint): tempo para carregar o maior elemento visível. Meta: < 2.5s. Otimizar: comprimir imagens, CDN, preload de fontes.\n\n• **FID** (First Input Delay) / **INP**: tempo até o browser responder à primeira interação. Meta: < 100ms. Otimizar: menos JS no main thread, lazy loading.\n\n• **CLS** (Cumulative Layout Shift): estabilidade visual (elementos que se movem). Meta: < 0.1. Otimizar: definir width/height em imagens, evitar inserir conteúdo sobre o existente.\n\nFerramenta: Chrome DevTools → Lighthouse → Performance.",
  },
  {
    keys: [
      "api rest boas praticas",
      "rest api design",
      "versionamento api",
      "api versão",
    ],
    text: "Boas práticas de design de REST API:",
    code: `// ── Nomenclatura de rotas ──
// ✅ Substantivos no plural, hierárquico
GET    /api/v1/users
GET    /api/v1/users/:id
GET    /api/v1/users/:id/posts
POST   /api/v1/users/:id/posts

// ❌ Verbos nas rotas (errado)
GET /api/getUsers
POST /api/createUser

// ── Filtro, paginação e ordenação via query params ──
GET /api/v1/users?page=2&limit=20&sort=nome&order=asc
GET /api/v1/products?categoria=tech&preco_max=500

// ── Resposta padronizada ──
{
    "data":    [...],      // payload
    "meta":    { "total": 100, "page": 1, "pages": 5 },
    "message": "ok"
}

// Erro padronizado
{
    "error": {
        "code":    "VALIDATION_ERROR",
        "message": "Campo 'email' é obrigatório",
        "field":   "email"
    }
}`,
    lang: "javascript",
  },
  {
    keys: ["webpack", "vite", "bundler", "bundle", "tree shaking", "build"],
    text: "Vite — bundler moderno (muito mais rápido que Webpack):",
    code: `# Criar projeto com Vite
npm create vite@latest meu-app -- --template react-ts
cd meu-app && npm install && npm run dev

# vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: { "@": "/src" } // import de "@/components/..."
    },
    build: {
        target: "esnext",
        rollupOptions: {
            output: {
                // dividir vendor em chunk separado (melhor cache)
                manualChunks: { vendor: ["react", "react-dom"] }
            }
        }
    },
    server: {
        port: 3000,
        proxy: {
            "/api": "http://localhost:8080" // evita CORS no dev
        }
    }
});`,
    lang: "javascript",
  },
  {
    keys: ["monorepo", "turborepo", "nx", "workspaces", "repositório único"],
    text: "Monorepo — múltiplos pacotes em um repositório:",
    code: `# Estrutura de monorepo com npm workspaces
meu-monorepo/
├── apps/
│   ├── web/        # Next.js (frontend)
│   └── api/        # Express (backend)
├── packages/
│   ├── ui/         # componentes compartilhados
│   ├── utils/      # utilitários comuns
│   └── types/      # TypeScript types compartilhados
└── package.json    # root

# package.json (root)
{
    "workspaces": ["apps/*", "packages/*"],
    "scripts": {
        "dev":   "turbo dev",
        "build": "turbo build",
        "test":  "turbo test"
    }
}

# Instalar dep em workspace específico
npm install react --workspace=apps/web

# Referenciar pacote interno
# apps/web/package.json
{ "dependencies": { "@meu/ui": "*" } }`,
    lang: "json",
  },
  {
    keys: ["rate limiting", "rate limit", "throttling api", "ddos proteção"],
    text: "Rate Limiting — proteger a API de abuso:",
    code: `// express-rate-limit
const rateLimit = require("express-rate-limit");

// Limite global
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,                   // máx 100 req por IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Muitas requisições, tente novamente em 15 min" },
});

app.use("/api/", limiter);

// Limite mais estrito para login (prevenir brute force)
const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 5,
    skipSuccessfulRequests: true, // não conta req bem-sucedidas
});

app.post("/api/auth/login", loginLimiter, loginHandler);

// Redis-based para múltiplos servidores
const RedisStore = require("rate-limit-redis");
const limiterDistribuido = rateLimit({
    store: new RedisStore({ client: redisClient }),
    windowMs: 60_000, max: 50,
});`,
    lang: "javascript",
  },
  {
    keys: ["webhook", "webhooks", "callback url", "evento externo"],
    text: "Webhooks — receber eventos de sistemas externos:",
    code: `// Receber webhook do Stripe (pagamentos)
app.post("/webhooks/stripe",
    express.raw({ type: "application/json" }), // raw body para verificar assinatura
    (req, res) => {
        const sig = req.headers["stripe-signature"];

        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.body, sig, process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            return res.status(400).send(\`Assinatura inválida: \${err.message}\`);
        }

        switch (event.type) {
            case "payment_intent.succeeded":
                const { amount, currency } = event.data.object;
                await ativarPedido(event.data.object.metadata.pedidoId);
                break;
            case "payment_intent.payment_failed":
                await notificarFalha(event.data.object);
                break;
        }

        res.json({ received: true }); // responder rápido (< 30s)
    }
);`,
    lang: "javascript",
  },
  {
    keys: [
      "queue",
      "fila de mensagens",
      "rabbitmq",
      "kafka",
      "bull",
      "job queue",
    ],
    text: "Filas de mensagens — processar tarefas em segundo plano:",
    code: `// BullMQ — filas com Redis (Node.js)
const { Queue, Worker } = require("bullmq");
const { Redis } = require("ioredis");

const connection = new Redis();

// Produtor — adicionar jobs
const emailQueue = new Queue("emails", { connection });

await emailQueue.add("boas-vindas", {
    para:   "usuario@email.com",
    nome:   "Ana",
    modelo: "welcome",
}, {
    delay:    5000,  // aguardar 5s antes de processar
    attempts: 3,     // tentar até 3 vezes em caso de falha
    backoff:  { type: "exponential", delay: 2000 },
});

// Consumidor — processar jobs
const worker = new Worker("emails", async (job) => {
    console.log(\`Processando: \${job.name}\`, job.data);
    await enviarEmail(job.data);
}, { connection, concurrency: 5 });

worker.on("completed", (job) => console.log(\`Job \${job.id} concluído\`));
worker.on("failed",    (job, err) => console.error(err));`,
    lang: "javascript",
  },
  {
    keys: [
      "redux",
      "zustand",
      "estado global",
      "state management",
      "context api",
      "store",
    ],
    text: "Gerenciamento de estado global no React — Zustand (minimalista):",
    code: `import { create } from "zustand";

const useCarrinho = create((set) => ({
    itens: [],
    total: 0,

    adicionar: (produto) => set((s) => ({
        itens: [...s.itens, produto],
        total: s.total + produto.preco,
    })),

    remover: (id) => set((s) => {
        const itens = s.itens.filter(i => i.id !== id);
        return { itens, total: itens.reduce((acc, i) => acc + i.preco, 0) };
    }),

    limpar: () => set({ itens: [], total: 0 }),
}));

// Em qualquer componente — sem Provider!
function Carrinho() {
    const { itens, total, remover } = useCarrinho();
    return (
        <div>
            {itens.map(i => <ItemRow key={i.id} item={i} onRemover={remover} />)}
            <strong>Total: R$ {total.toFixed(2)}</strong>
        </div>
    );
}`,
    lang: "jsx",
  },
  {
    keys: [
      "merge sort",
      "quick sort",
      "ordenação",
      "sorting algorithm",
      "algoritmo de ordenação",
    ],
    text: "Algoritmos de ordenação — Merge Sort e Quick Sort:",
    code: `// MERGE SORT — O(n log n) estável, divide e conquista
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid  = Math.floor(arr.length / 2);
    const esq  = mergeSort(arr.slice(0, mid));
    const dir  = mergeSort(arr.slice(mid));
    return merge(esq, dir);
}
function merge(a, b) {
    const res = []; let i = 0, j = 0;
    while (i < a.length && j < b.length)
        res.push(a[i] <= b[j] ? a[i++] : b[j++]);
    return [...res, ...a.slice(i), ...b.slice(j)];
}

// QUICK SORT — O(n log n) médio, O(n²) pior caso
function quickSort([pivot, ...rest]) {
    if (pivot === undefined) return [];
    const esq = rest.filter(x => x <= pivot);
    const dir = rest.filter(x => x >  pivot);
    return [...quickSort(esq), pivot, ...quickSort(dir)];
}

// Produção: Array.sort() nativo (TimSort otimizado)
arr.sort((a, b) => a - b);                        // números
arr.sort((a, b) => a.nome.localeCompare(b.nome)); // strings`,
    lang: "javascript",
  },
  {
    keys: [
      "clean code",
      "código limpo",
      "naming",
      "nomenclatura",
      "legibilidade",
      "boas práticas código",
    ],
    text: "Clean Code — princípios de código legível:\n\n• **Nomes que revelam intenção:** `diasParaExpirar` > `d`, `buscarUsuarioPorEmail()` > `get()`\n• **Booleanos:** prefixo is/has/can — `isAtivo`, `hasPermissao`, `canEdit`\n• **Funções fazem UMA coisa** — se precisar de 'e' no nome, extraia\n• **Máx 3 parâmetros** — mais do que isso, use objeto\n• **Sem números mágicos** — use constante nomeada\n• **Sem código morto** — delete blocos comentados\n• **Comentários** — só quando o PORQUÊ não é óbvio, nunca o O QUÊ",
    code: `// ❌ Código obscuro
function calc(x, y, z) {
    return x < 0.15 ? y * z : y * z * 1.23;
}

// ✅ Código limpo e autoexplicativo
const TAXA_IMPOSTO   = 0.23;
const LIMITE_ISENCAO = 0.15;

function calcularPrecoFinal(precoBase, quantidade, frete) {
    const subtotal    = precoBase * quantidade;
    const comImposto  = subtotal > LIMITE_ISENCAO
        ? subtotal * (1 + TAXA_IMPOSTO)
        : subtotal;
    return comImposto + frete;
}

// ❌ Flag argument (antipadrão)
function renderizar(el, isAdmin) { if (isAdmin) {/*...*/} }

// ✅ Funções específicas e claras
function renderizarAdmin(el)   { /*...*/ }
function renderizarUsuario(el) { /*...*/ }`,
    lang: "javascript",
  },
];
