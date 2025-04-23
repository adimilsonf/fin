// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./db/connect'); // Conexão com o banco de dados
const webhookRoute = require('./routes/webhook'); // Rota do webhook

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // Middleware para parsing de JSON

// Definir a rota de webhook
app.use('/webhook', webhookRoute);

// Conectar ao banco de dados e iniciar o servidor
connectDB().then(async () => {
    // Sincronizar o banco de dados
    await sequelize.sync();

    // Iniciar o servidor
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
});
