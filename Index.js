import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет! Бот WorkUSA запущен 🚀");
});
