// db/connect.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false, // Para evitar logs excessivos, você pode habilitar se necessário
});

const connectDB = async () => {
    try {
        console.log("🔌 Conectando ao banco de dados...");
        await sequelize.authenticate();
        console.log("🔌 Banco de dados conectado com sucesso!");
    } catch (error) {
        console.error('🔴 Erro ao conectar ao banco de dados:', error);
        process.exit(1); // Finaliza o processo caso a conexão falhe
    }
};

module.exports = { connectDB, sequelize };
