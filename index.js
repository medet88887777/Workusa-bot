import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const CUSTOMER_FEE = Number(process.env.CUSTOMER_FEE || 5);
const WORKER_FEE = Number(process.env.WORKER_FEE || 5);

function page(title, body) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; }
    .card { max-width: 420px; margin: 0 auto; border: 1px solid #ddd; border-radius: 12px; padding: 18px; }
    button, a.btn { display:block; width:100%; padding:14px; margin:10px 0; font-size:18px; text-align:center; border-radius:10px; border:0; }
    a.btn { text-decoration:none; background:#111; color:#fff; }
    .muted { color:#666; font-size:14px; }
  </style>
</head>
<body>
  <div class="card">
    ${body}
  </div>
</body>
</html>`;
}

app.get("/", (req, res) => {
  res.send(
    page(
      "Workkusa",
      `
      <h2>Выберите роль</h2>
      <a class="btn" href="/customer">Я Заказчик</a>
      <a class="btn" href="/worker">Я Исполнитель</a>
      <p class="muted">Оплата: Заказчик $${CUSTOMER_FEE}, Исполнитель $${WORKER_FEE}</p>
      `
    )
  );
});

app.get("/customer", (req, res) => {
  res.send(
    page(
      "Заказчик",
      `
      <h2>Экран: Заказчик</h2>
      <p>Вы платите: <b>$${CUSTOMER_FEE}</b></p>
      <button onclick="alert('Заказ создан (пока тест)')">Создать заказ</button>
      <a class="btn" href="/">Назад</a>
      `
    )
  );
});

app.get("/worker", (req, res) => {
  res.send(
    page(
      "Исполнитель",
      `
      <h2>Экран: Исполнитель</h2>
      <p>Вы платите: <b>$${WORKER_FEE}</b></p>
      <button onclick="alert('Вы стали исполнителем (пока тест)')">Стать исполнителем</button>
      <a class="btn" href="/">Назад</a>
      `
    )
  );
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
