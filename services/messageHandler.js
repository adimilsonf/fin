const { interpretMessage } = require('./openai');
const { sendMessage } = require('./zapi');
const { saveTransaction } = require('../controllers/financeController');

/**
 * Trata mensagens recebidas do webhook da Z-API
 */
async function handleWebhook(req, res) {
    try {
        const body = req.body;

        const phone = body?.phone;
        const message = body?.text?.message;

        console.log(`📩 Mensagem recebida de: ${phone || 'desconhecido'}`);
        console.log(`📄 Conteúdo: ${message || 'vazio'}`);

        if (!phone || !message) {
            console.warn("⚠️ Estrutura inesperada no webhook:", JSON.stringify(body, null, 2));
            return res.sendStatus(400);
        }

        await handleIncomingMessage(phone, message);
        res.sendStatus(200);
    } catch (err) {
        console.error("❌ Erro no webhook:", err);
        res.sendStatus(500);
    }
}

/**
 * Processa a mensagem com IA, salva a transação e responde.
 */
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
        console.error("❌ Erro ao lidar com a mensagem:", err);
        await sendMessage(phone, "⚠️ Ocorreu um erro. Tente novamente.");
    }
}

module.exports = { handleWebhook };
