const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const { processMessage } = require('./handlers/messageHandler');
const { delay } = require('./handlers/utils');
require('dotenv').config();

const client = new Client({
    session: process.env.SESSION_PATH
});

client.on('qr', qr => qrcode.generate(qr, { small: true }));

client.on('ready', () => {
    console.log('Bot conectado com sucesso!');
});

client.on('message', async msg => {
    if (msg.from.endsWith('@c.us')) { // Filtra apenas usuários e ignora grupos
        const response = await processMessage(msg.from, msg.body.trim());
        console.log(`[User ID: ${msg.from}] Resposta enviada: "${response}"`);

        await msg.getChat().then(chat => chat.sendStateTyping());
        await delay(2000); // Simula digitação
        client.sendMessage(msg.from, response);
    }
});

client.initialize();