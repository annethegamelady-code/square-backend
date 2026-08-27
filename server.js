import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// ⭐ PLACE THIS EXACTLY HERE ⭐
app.get("/promo-pay", (req, res) => {
  res.sendFile(__dirname + "/promo-pay.html");
});

app.post("/pay", async (req, res) => {
  const { source_id, amount } = req.body;

  const response = await fetch("https://connect.squareupsandbox.com/v2/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer EAAAl6aMzW_RHvWCe48pdw2liDljz1eyp7qzcGBitH0H_VnTSi9y9kdcFUubfMHI"
    },
    body: JSON.stringify({
      source_id: source_id,
      idempotency_key: Date.now().toString(),
      amount_money: {
        amount: amount,
        currency: "USD"
      }
    })
  });

  const result = await response.json();
  res.json(result);
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});

