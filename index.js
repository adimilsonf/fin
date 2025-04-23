const express = require('express');
const app = express();

// Definindo a rota raiz
app.get('/', (req, res) => {
    res.send('Olá Mundo!');
});

// Definindo a porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
