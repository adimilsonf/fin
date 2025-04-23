const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connect');

const Transaction = sequelize.define('Transaction', {
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY, // YYYY-MM-DD
        allowNull: false
    }
}, {
    tableName: 'transactions',
    timestamps: true // cria campos createdAt e updatedAt automaticamente
});

module.exports = { Transaction };
