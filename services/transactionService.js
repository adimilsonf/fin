const { Transaction } = require('../models/Transaction');

/**
 * Salva a transação no banco de dados
 * @param {string} phone - Número do usuário
 * @param {{ amount: number, category: string, date: string }} transaction - Objeto da transação
 */
async function saveTransaction(phone, transaction) {
    try {
        await Transaction.create({
            phone,
            amount: transaction.amount,
            category: transaction.category,
            date: transaction.date,
        });
        console.log('💾 Transação registrada no banco de dados');
    } catch (err) {
        console.error('❌ Erro ao salvar transação:', err.message || err);
    }
}

module.exports = { saveTransaction };
