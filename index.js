import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>WorkUSA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 40px;
          }
          button {
            font-size: 20px;
            padding: 15px 30px;
            margin: 15px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>WorkUSA</h1>
        <p>Выберите роль</p>

        <button onclick="alert('Заказчик платит $5')">
          Я Заказчик ($5)
        </button>

        <button onclick="alert('Исполнитель платит $5')">
          Я Исполнитель ($5)
        </button>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
