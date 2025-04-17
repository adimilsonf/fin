const express = require('express');
const router = express.Router();
const messageHandler = require('../services/messageHandler');

router.post('/', async (req, res) => {
    try {
        const message = req.body?.message?.text?.body;
        const phone = req.body?.message?.from;

        console.log("📩 Mensagem recebida de:", phone || "indefinido");
        console.log("📄 Conteúdo:", message || "vazio");

        if (message && phone) {
            await messageHandler.handleIncomingMessage(phone, message);
        } else {
            console.log("⚠️ Estrutura inesperada no webhook:", JSON.stringify(req.body, null, 2));
        }

        res.sendStatus(200);
    } catch (error) {
        console.error("Erro no webhook:", error);
        res.sendStatus(500);
    }
});

module.exports = router;
