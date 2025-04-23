require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const webhookRoute = require('./routes/webhook');
const { connectDB, sequelize } = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());

// Rota para teste simples
app.get('/', (req, res) => {
    console.log('Requisição GET recebida!');
    res.send('✅ Servidor está rodando!');
});

// Webhook do WhatsApp
app.use('/webhook', webhookRoute);

// Iniciar servidor
(async () => {
    try {
        console.log('🔌 Conectando ao banco de dados...');
        await connectDB();  // Conecta ao banco de dados
        console.log('🔌 Banco de dados conectado com sucesso!');
        
        await sequelize.sync(); // Sincroniza o banco de dados
        console.log('🔄 Banco de dados sincronizado!');
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Erro ao iniciar o servidor:', error);
        process.exit(1);  // Encerra a aplicação caso falhe
    }
})();
