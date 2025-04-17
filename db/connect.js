const { Sequelize } = require('sequelize');

// Configuração do banco de dados PostgreSQL
const sequelize = new Sequelize(process.env.PG_URI, {
    dialect: 'postgres',
    logging: false, // Set to true for debugging SQL queries
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Conectado ao banco de dados PostgreSQL");
    } catch (err) {
        console.error("Erro ao conectar no banco:", err);
        process.exit(1);
    }
}

module.exports = connectDB;
