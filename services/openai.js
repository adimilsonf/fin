const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function interpretMessage(message) {
    const prompt = \`Extraia os dados da transação da seguinte frase: "\${message}".
Responda no formato JSON: { "amount": número, "category": texto, "date": "YYYY-MM-DD" }\`;

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    });

    try {
        const raw = completion.data.choices[0].message.content;
        return JSON.parse(raw);
    } catch (e) {
        console.error("Erro ao interpretar resposta da IA:", e);
        return null;
    }
}

module.exports = { interpretMessage };
