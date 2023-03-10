const express = require('express');
const {Telegraf} = require('telegraf');
const {dockStart} = require('@nlpjs/basic');

require('dotenv').config();

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

app.use(bot.webhookCallback('/url/telegram'));
bot.telegram.setWebhook(`${process.env.BOT_URL}/url/telegram`);

app.post('/url/telegram', (req, res)=> {

    res.send('termina');
})

bot.on('text', async (ctx)=> {
    const dock = await dockStart();
    const nlp = dock.get('nlp');
    const response = await nlp.process('es',ctx.message.text);
    if (response.answer) {
        ctx.reply(response.answer);
    } else {
        ctx.reply('Perdona no te entiendo. Por ahora solo se saludar y despedirme')
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, async ()=> {
    console.log(`working in port:${PORT}`);
    const dock = await dockStart();
    const nlp = dock.get('nlp');
    await nlp.train();
})