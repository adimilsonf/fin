// services/zapi.js

const axios = require('axios');

const url = `${process.env.ZAPI_API_URL}/instances/${process.env.ZAPI_INSTANCE_ID}/token/${process.env.ZAPI_TOKEN}/send-message`;

async function sendMessage(to, message) {
    try {
        const response = await axios.post(url, {
            phone: to,
            message: message
        });
        console.log('Message sent successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

module.exports = { sendMessage };
