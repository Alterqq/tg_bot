const TgBot = require('node-telegram-bot-api')
const getBalance = require('./helpers')

const TOKEN = 'your token'
const userId = 'id: number'

// custom request interval
const interval = 1000 * 30

const bot = new TgBot(TOKEN, {polling: true})

bot.onText(/\/balance/, async m => {
  const {id} = m.chat

  if (m.from.id === userId) {
    const botMessage = await bot.sendMessage(id, await getBalance('username'))
    const message_id = botMessage.message_id
    const chat_id = botMessage.chat.id

    setInterval(async () => {
      const balance = await getBalance('username')
      if (botMessage.text.trim() !== balance.trim()) {
        bot.editMessageText(balance.trim(), {message_id, chat_id}).catch(e => {})
      }
    }, interval)
  } else {
    bot.sendMessage(id, 'Access error')
  }
})

