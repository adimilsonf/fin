// models/message.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/connect'); // Conexão do banco de dados

const Message = sequelize.define('Message', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = { Message };
