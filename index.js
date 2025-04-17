require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const webhookRoute = require('./routes/webhook');
const connectDB = require('./db/connect');
const { sequelize } = require('./db/connect'); // Importando a instância do Sequelize

const app = express();
app.use(bodyParser.json());

// Rota do webhook para receber mensagens do WhatsApp
app.use('/webhook', webhookRoute);

// Configuração da porta
const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados e iniciar o servidor
connectDB().then(async () => {
    // Sincronizar o banco de dados com o modelo de dados
    await sequelize.sync(); // Isso cria as tabelas se não existirem
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
});
