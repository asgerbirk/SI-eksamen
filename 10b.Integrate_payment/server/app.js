import express from "express";
import "dotenv/config";
import Stripe from "stripe";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/payment", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Test Product",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5137/success",
  });

  res.json({ id: session.id });
  console.log("Checkout session created:", session.id);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
