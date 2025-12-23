import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// Главная страница
app.get("/", (req, res) => {
  res.send("WorkUSA bot is live ✅");
});

// Webhook от Telegram
app.post("/webhook", async (req, res) => {
  try {
    const message = req.body.message;
    if (!message) return res.sendStatus(200);

    const chatId = message.chat.id;
    const text = message.text || "";

    let reply = "Напиши /start";

    if (text === "/start") {
      reply =
        "Добро пожаловать в WorkUSA 🇺🇸\n\n" +
        "1️⃣ Заказчик\n" +
        "2️⃣ Исполнитель";
    }

    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply,
      }),
    });

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(200);
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
