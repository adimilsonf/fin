const express = require('express');
const router = express.Router();
const messageHandler = require('../services/messageHandler');

router.post('/', (req, res) => {
    // 🔁 Sempre responde imediatamente
    res.sendStatus(200);

    // 📬 Processa a mensagem depois
    const phone = req.body?.phone;
    const message = req.body?.text?.message;

    if (phone && message) {
        console.log("📩 Mensagem recebida de:", phone);
        console.log("📄 Conteúdo:", message);

        // Executa a lógica em background
        (async () => {
            try {
                await messageHandler.handleIncomingMessage(phone, message);
            } catch (err) {
                console.error("❌ Erro ao processar mensagem:", err);
            }
        })();
    } else {
        console.warn("⚠️ Estrutura inesperada no webhook:", JSON.stringify(req.body, null, 2));
    }
});

module.exports = router;
