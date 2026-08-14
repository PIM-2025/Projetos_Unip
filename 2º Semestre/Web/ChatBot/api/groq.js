export default async function handler(req, res) {
  // Configuração de CORS para permitir as requisições
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  try {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      throw new Error("Chave GROQ_API_KEY não configurada no Vercel.");
    }

    // No Vercel, o req.body já é parseado para objeto JSON automaticamente
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // Extrai as informações enviadas pelo js/ai.js
    const inputs = body.inputs || "";
    const maxTokens = body.parameters?.max_new_tokens || 500;

    const SYSTEM_PROMPT =
      "Você é ByteForge, um assistente de programação que ajuda novos programadores com conceitos de programação e boas práticas, ensinando eles ao invés de dar a resposta diretamente. Responda sempre em português, de forma clara e direta. Use blocos de código Markdown quando apresentar código. Foque em tópicos de programação e sempre busque ensinar ao invés de dar o código apenas. Se o usuário pedir algo fora de programação, responda que seu foco é programação e sugira exemplos úteis. Seja breve e direto.";

    // Chamada para a API do Groq no formato correto (messages)
    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: inputs },
          ],
          max_tokens: maxTokens,
          temperature: 0.2,
        }),
      },
    );

    const data = await groqRes.json();

    if (!groqRes.ok) {
      // Se der erro no Groq, envia a mensagem real de volta para descobrirmos
      throw new Error(
        data.error?.message || `Groq retornou status ${groqRes.status}`,
      );
    }

    const text = data.choices?.[0]?.message?.content ?? "";

    // Devolve no formato que o ai.js espera: um array com 'generated_text'
    return res.status(200).json([{ generated_text: text }]);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
