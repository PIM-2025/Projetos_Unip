const http = require("http");

const PORT = 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_MODEL = "llama-3.1-8b-instant";
const SYSTEM_PROMPT =
  "Você é ByteForge, um assistente de programação que ajuda novos programadores com conceitos de programação e boas práticas, ensinando eles ao invés de dar a resposta diretamente. Responda sempre em português, de forma clara e direta. Use blocos de código Markdown quando apresentar código. Foque em tópicos de programação e sempre busque ensinar ao invés de dar o código apenas. Se o usuário pedir algo fora de programação, responda que seu foco é programação e sugira exemplos úteis. Seja breve e direto.";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders());
    res.end();
    return;
  }

  if (req.method !== "POST" || req.url !== "/groq") {
    res.writeHead(404, {
      ...corsHeaders(),
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ error: "Endpoint não encontrado." }));
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      if (!GROQ_API_KEY) {
        throw new Error("Preencha GROQ_API_KEY em groq-proxy.js");
      }

      const { inputs, parameters } = JSON.parse(body);
      const maxTokens = parameters?.max_new_tokens || 500;

      const groqRes = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: inputs },
            ],
            max_tokens: maxTokens,
          }),
        },
      );

      const data = await groqRes.json();

      if (!groqRes.ok) {
        throw new Error(
          data.error?.message || `Groq retornou status ${groqRes.status}`,
        );
      }

      const text = data.choices?.[0]?.message?.content ?? "";
      res.writeHead(200, {
        ...corsHeaders(),
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify([{ generated_text: text }]));
    } catch (error) {
      res.writeHead(500, {
        ...corsHeaders(),
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ error: error.message }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Proxy Groq rodando em http://localhost:${PORT}/groq`);
});
