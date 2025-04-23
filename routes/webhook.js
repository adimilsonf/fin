const express = require('express');
const router = express.Router();
const messageHandler = require('../services/messageHandler');

router.post('/', async (req, res) => {
    console.log("📬 Recebido POST /webhook");

    try {
        const phone = req.body?.phone;
        const message = req.body?.text?.message;

        console.log("📱 Número:", phone);
        console.log("💬 Mensagem:", message);

        if (message && phone) {
            await messageHandler.handleIncomingMessage(phone, message);
        } else {
            console.warn("⚠️ Estrutura inesperada:", JSON.stringify(req.body, null, 2));
        }

        console.log("✅ Finalizando webhook");
        res.sendStatus(200);

    } catch (error) {
        console.error("❌ Erro no webhook:", error);
        res.sendStatus(500);
    }
});

module.exports = router;
