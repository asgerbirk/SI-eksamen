import express from "express";

const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("Received webhook:", req.body);
  res.sendStatus(200).send("Webhook data received");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
