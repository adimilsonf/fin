// /db/connect.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URI, {
    dialect: 'postgres',
    logging: false,
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Conectado ao banco de dados PostgreSQL");
    } catch (err) {
        console.error("Erro ao conectar no banco:", err);
        process.exit(1);
    }
}

// Exporta tanto a instância quanto a função
module.exports = {
    sequelize,
    connectDB
};
