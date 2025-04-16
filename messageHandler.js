const axios = require('axios');

async function handleMessage(message, from) {
  console.log('Received message from', from, ':', message);

  // Aqui você chamaria a OpenAI API e salvaria no banco
  // Simulação:
  if (message.toLowerCase().includes('gastei')) {
    console.log('Registrando gasto...');
    // enviar para o banco, categorizar etc.
  } else if (message.toLowerCase().includes('como está meu mês')) {
    console.log('Gerando relatório...');
    // gerar e enviar relatório
  }
}

module.exports = { handleMessage };