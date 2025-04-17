// routes/webhook.js
const express = require('express');
const router = express.Router();
const messageHandler = require('../services/messageHandler');

router.post('/', (req, res) => {
  const phone   = req.body?.phone;
  const message = req.body?.text?.message;

  console.log("📩 Mensagem recebida de:", phone   || "indefinido");
  console.log("📄 Conteúdo:             ", message || "vazio");

  // Confirmação de que vamos responder agora
  console.log("🔔 Respondendo webhook com 200 OK");

  // Responde imediatamente, antes de processar qualquer coisa
  res.sendStatus(200);

  if (!phone || !message) {
    console.warn("⚠️ Estrutura inesperada no webhook:", JSON.stringify(req.body, null, 2));
    return;
  }

  // Dispara o processamento em background
  messageHandler
    .handleIncomingMessage(phone, message)
    .catch(err => console.error("❌ Erro em handleIncomingMessage:", err));
});

module.exports = router;
