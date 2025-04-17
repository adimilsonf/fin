const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function interpretMessage(message) {
    const prompt = `Extraia os dados da transação da seguinte frase: "${message}".
Responda no formato JSON: { "amount": número, "category": texto, "date": "YYYY-MM-DD" }`;

    try {
        console.log('Enviando requisição para OpenAI com o seguinte prompt:', prompt);

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        const raw = completion.data.choices[0].message.content;
        return JSON.parse(raw);
    } catch (e) {
        if (e.response) {
            // Se a resposta do erro for da OpenAI
            console.error('Erro na API OpenAI:', e.response.data);
        } else {
            // Se o erro for outro (como de rede)
            console.error('Erro desconhecido:', e.message);
        }
        return null;
    }
}

module.exports = { interpretMessage };
