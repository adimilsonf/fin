const express = require('express');
const router = express.Router();
const messageHandler = require('../services/messageHandler');

router.post('/', (req, res) => {
  const phone = req.body?.phone;
  const message = req.body?.text?.message;

  console.log("📩 Mensagem recebida de:", phone || "indefinido");
  console.log("📄 Conteúdo:", message || "vazio");

  if (!phone || !message) {
    console.warn("⚠️ Estrutura inesperada no webhook:", JSON.stringify(req.body, null, 2));
  } else {
    // Dispara o processamento em background sem bloquear a response
    messageHandler.handleIncomingMessage(phone, message)
      .catch(err => console.error("❌ Erro no handleIncomingMessage:", err));
  }

  // Responde imediatamente para evitar timeout/499
  res.sendStatus(200);
});

module.exports = router;
