const cron = require('node-cron');

const job = cron.schedule('0 9 * * *', () => {
  console.log('Disparando lembretes de contas às 9h todo dia');
  // Aqui você buscaria lembretes no banco e enviaria via WhatsApp
}, {
  scheduled: false
});

module.exports = job;
