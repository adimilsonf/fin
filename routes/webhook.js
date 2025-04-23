const express = require('express');
const router = express.Router();
const messageHandler = require('../services/messageHandler');

router.post('/', async (req, res) => {
    // Envia a resposta imediata para evitar timeout do lado da Z-API
    res.sendStatus(200);

    try {
        const body = req.body;

        console.log("📩 Webhook recebido:");
        console.dir(body, { depth: null });

        // Algumas versões da Z-API enviam as mensagens assim:
        const phone = body?.contact?.phone || body?.phone;
        const message = body?.message?.text?.body || body?.text?.message || body?.body;

        if (phone && message) {
            console.log(`📞 Telefone: ${phone}`);
            console.log(`💬 Mensagem: ${message}`);
            await messageHandler.handleIncomingMessage(phone, message);
        } else {
            console.warn("⚠️ Estrutura inesperada no webhook:", JSON.stringify(body));
        }
    } catch (error) {
        console.error("❌ Erro ao processar webhook:", error);
        // Erro já foi tratado, resposta já foi enviada
    }
});

module.exports = router;
