const axios = require('axios');

async function sendMessage(to, message) {
    const url = \`\${process.env.ZAPI_API_URL}/instances/\${process.env.ZAPI_INSTANCE_ID}/token/\${process.env.ZAPI_TOKEN}/send-message\`;

    try {
        await axios.post(url, {
            phone: to,
            message: message
        });
    } catch (error) {
        console.error("❌ Erro ao enviar mensagem:", error.response?.data || error.message);
    }
}

module.exports = { sendMessage };
