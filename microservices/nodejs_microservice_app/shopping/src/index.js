const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config({ path: `./.env.dev` });

const app = express();
app.use(express.json());
const cors = require("cors"); 
app.use(cors({ origin: false }));
const CartSchema = new mongoose.Schema({
  userId: String,
  products: [{ name: String, price: Number, qty: Number }],
  total: Number,
});
const Cart = mongoose.model("Cart", CartSchema);

app.post("/cart", async (req, res) => {
  const { productId, qty } = req.body;
  const { data } = await axios.get("http://products:8002/");
  const product = data.find(p => p._id === productId);
  if (!product) return res.status(404).send("Product not found");

  const cart = await Cart.create({
    userId: "testUser",
    products: [{ name: product.name, price: product.price, qty }],
    total: product.price * qty,
  });
  res.json(cart);
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("✅ Shopping DB connected");
  app.listen(process.env.PORT, () => console.log(`🚀 Shopping Service on ${process.env.PORT}`));
});
