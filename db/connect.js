const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Use DATABASE_URL diretamente para conectar ao banco de dados
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Necessário para conexões SSL no Railway
        },
    },
    logging: false, // Desativa o log das consultas no console
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
