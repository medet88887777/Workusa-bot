import express from "express";
import Stripe from "stripe";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Render даёт PORT автоматически
const PORT = process.env.PORT || 3000;

// В Render мы добавим STRIPE_SECRET_KEY
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Render URL (чтобы Stripe знал куда возвращать)
// Например: https://workkusa-bot.onrender.com
const BASE_URL = process.env.BASE_URL;

function page(title, buttonText, postUrl) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>${title}</title>
      <style>
        body{font-family:Arial; padding:24px;}
        .box{max-width:420px;margin:auto;border:1px solid #ddd;padding:18px;border-radius:12px;}
        button{width:100%;padding:14px;font-size:18px;border:none;border-radius:10px;cursor:pointer;}
      </style>
    </head>
    <body>
      <div class="box">
        <h2>${title}</h2>
        <form method="POST" action="${postUrl}">
          <button type="submit">${buttonText}</button>
        </form>
      </div>
    </body>
  </html>`;
}

// Главная
app.get("/", (req, res) => {
  res.send(`
    <h2>Workkusa Payments</h2>
    <ul>
      <li><a href="/client">Client (Заказчик) - Pay $5</a></li>
      <li><a href="/worker">Worker (Исполнитель) - Pay $5</a></li>
    </ul>
  `);
});

// Страницы
app.get("/client", (req, res) =>
  res.send(page("Заказчик (Client)", "Pay $5 as Client", "/pay/client"))
);

app.get("/worker", (req, res) =>
  res.send(page("Исполнитель (Worker)", "Pay $5 as Worker", "/pay/worker"))
);

// Оплата $5
async function createCheckout(role) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: `Workkusa ${role} fee` },
          unit_amount: 500 // $5.00 = 500 cents
        },
        quantity: 1
      }
    ],
    success_url: `${BASE_URL}/success?role=${encodeURIComponent(role)}`,
    cancel_url: `${BASE_URL}/cancel?role=${encodeURIComponent(role)}`
  });

  return session.url;
}

app.post("/pay/client", async (req, res) => {
  try {
    const url = await createCheckout("Client");
    res.redirect(url);
  } catch (e) {
    res.status(500).send("Stripe error: " + e.message);
  }
});

app.post("/pay/worker", async (req, res) => {
  try {
    const url = await createCheckout("Worker");
    res.redirect(url);
  } catch (e) {
    res.status(500).send("Stripe error: " + e.message);
  }
});

app.get("/success", (req, res) => {
  res.send(`<h2>✅ Payment Success (${req.query.role || ""})</h2><a href="/">Home</a>`);
});

app.get("/cancel", (req, res) => {
  res.send(`<h2>❌ Payment Canceled (${req.query.role || ""})</h2><a href="/">Home</a>`);
});

app.listen(PORT, () => console.log("Server running on port", PORT));
