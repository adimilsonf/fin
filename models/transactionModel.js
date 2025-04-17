const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const Transaction = sequelize.define('Transaction', {
    user: {
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
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Transaction;
