const { interpretMessage } = require('./openai');
const { saveTransaction } = require('./transactionService');

/**
 * Processa a mensagem recebida e registra uma transação, se for válida.
 * @param {string} phone - Número de telefone do usuário.
 * @param {string} message - Conteúdo da mensagem recebida.
 */
async function handleIncomingMessage(phone, message) {
    try {
        console.log(`🔍 Interpretando mensagem de ${phone}: "${message}"`);

        const transaction = await interpretMessage(message);

        if (!transaction) {
            console.warn(`⚠️ Não foi possível interpretar a mensagem: "${message}"`);
            return;
        }

        console.log('✅ Transação interpretada:', transaction);

        // Salva a transação no banco (essa função também deve estar preparada para falhas)
        await saveTransaction(phone, transaction);

        console.log(`💾 Transação salva com sucesso para ${phone}`);
    } catch (err) {
        console.error(`❌ Erro ao processar mensagem do número ${phone}:`, err.message || err);
    }
}

module.exports = { handleIncomingMessage };
