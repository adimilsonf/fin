require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const webhookRoute = require('./routes/webhook');
const connectDB = require('./db/connect');

const app = express();
app.use(bodyParser.json());

app.use('/webhook', webhookRoute);

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
});
