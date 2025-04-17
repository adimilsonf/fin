const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Conectado ao banco de dados");
    } catch (err) {
        console.error("Erro ao conectar no banco:", err);
        process.exit(1);
    }
}

module.exports = connectDB;
