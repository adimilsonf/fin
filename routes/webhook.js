const express = require('express');
const router = express.Router();
const messageHandler = require('../services/messageHandler');

router.post('/', (req, res) => {
  const phone = req.body?.phone;
  const message = req.body?.text?.message;

  console.log("📩 Mensagem recebida de:", phone || "indefinido");
  console.log("📄 Conteúdo:", message || "vazio");

  // Sempre responde rapidamente
  res.sendStatus(200);

  // Processa a mensagem de forma assíncrona
  if (message && phone) {
    messageHandler.handleIncomingMessage(phone, message)
      .catch(err => {
        console.error("❌ Erro ao processar mensagem:", err);
      });
  } else {
    console.warn("⚠️ Estrutura inesperada no webhook:", JSON.stringify(req.body, null, 2));
  }
});

module.exports = router;
