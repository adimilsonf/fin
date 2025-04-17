// Carrega .env apenas em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { Configuration, OpenAIApi } = require("openai");

// Garante que a variável definida no Railway exista
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY não está definida. Verifique em Railway > Settings > Variables.");
  process.exit(1);
}

// Configuração da OpenAI com a chave vinda do Railway
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Interpreta uma mensagem textual extraindo os dados da transação
 * @param {string} message - Texto enviado pelo usuário
 * @returns {Promise<{ amount: number, category: string, date: string } | null>}
 */
async function interpretMessage(message) {
  const prompt = `Extraia os dados da transação da seguinte frase: "${message}".
Responda no formato JSON: { "amount": número, "category": texto, "date": "YYYY-MM-DD" }`;

  try {
    console.log('🧠 Enviando para OpenAI:', prompt);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const raw = completion.data.choices[0].message.content;
    return JSON.parse(raw);
  } catch (e) {
    if (e.response) {
      console.error('❌ Erro na resposta da API OpenAI:', e.response.data);
    } else {
      console.error('❌ Erro inesperado ao chamar a OpenAI:', e.message);
    }
    return null;
  }
}

module.exports = { interpretMessage };
