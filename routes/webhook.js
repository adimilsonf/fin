// routes/webhook.js
const express = require('express');
const { handleMessage } = require('../services/messageHandler'); // Importando a função que irá tratar a mensagem
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const messageData = req.body; // Dados do webhook
        console.log('📥 Webhook recebido:', messageData);
        
        // Processa a mensagem recebida
        await handleMessage(messageData);
        
        // Envia uma resposta ao Z-API ou outro cliente de envio de webhook
        res.status(200).send('Mensagem recebida com sucesso');
    } catch (error) {
        console.error('❌ Erro no processamento do webhook:', error);
        res.status(500).send('Erro ao processar a mensagem');
    }
});

module.exports = router;
