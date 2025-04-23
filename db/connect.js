const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false, // Opcional: desativa o log das consultas no console
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('🔌 Banco de dados conectado com sucesso!');
    } catch (error) {
        console.error('❌ Não foi possível conectar ao banco de dados:', error);
    }
};

module.exports = { sequelize, connectDB };
