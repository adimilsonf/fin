const Transaction = require('../models/transactionModel');

async function saveTransaction(userPhone, data) {
    try {
        const newTx = new Transaction({
            user: userPhone,
            amount: data.amount,
            category: data.category,
            date: new Date(data.date)
        });
        await newTx.save();
        console.log("💾 Transação salva com sucesso.");
    } catch (err) {
        console.error("Erro ao salvar transação:", err);
    }
}

module.exports = { saveTransaction };
