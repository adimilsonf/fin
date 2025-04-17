const { interpretMessage } = require('./openai');
const { sendMessage } = require('./zapi');
const { saveTransaction } = require('../controllers/financeController');

async function handleIncomingMessage(phone, message) {
    try {
        const interpreted = await interpretMessage(message);

        if (interpreted) {
            await saveTransaction(phone, interpreted);
            await sendMessage(phone, `📊 Registrei R$${interpreted.amount} em "${interpreted.category}" no dia ${interpreted.date}.`);
        } else {
            await sendMessage(phone, "🤖 Desculpe, não entendi. Pode reformular?");
        }
    } catch (err) {
        console.error("Erro ao lidar com a mensagem:", err);
        await sendMessage(phone, "⚠️ Ocorreu um erro. Tente novamente.");
    }
}

module.exports = { handleIncomingMessage };
