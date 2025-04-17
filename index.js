// Carrega .env apenas em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const { connectDB, sequelize } = require('./db/connect');
const webhookRoute = require('./routes/webhook');

const app = express();

// Faz o parsing de JSON nas requisições
app.use(express.json());

// Rota do webhook para receber mensagens do WhatsApp
app.use('/webhook', webhookRoute);

// Porta configurável via ambiente
const PORT = process.env.PORT || 3000;

// Conecta ao banco, sincroniza modelos e inicia o servidor
connectDB()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erro ao iniciar a aplicação:', err);
    process.exit(1);
  });
