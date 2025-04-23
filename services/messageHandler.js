// services/messageHandler.js
const { sequelize } = require('../db/connect'); // Conexão do banco de dados
const { Message } = require('../models/message'); // Importar o modelo de dados (criaremos abaixo)

const handleMessage = async (messageData) => {
    try {
        // Supondo que a estrutura da mensagem contenha um campo 'text'
        console.log('📬 Processando mensagem:', messageData);

        // Exemplo: Salvar a mensagem no banco de dados
        await Message.create({
            content: messageData.text, // ou outro campo conforme a estrutura
        });

        console.log('✅ Mensagem processada e salva no banco de dados');
    } catch (error) {
        console.error('❌ Erro ao processar a mensagem:', error);
        throw new Error('Erro ao processar a mensagem');
    }
};

module.exports = { handleMessage };
