const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { DB_URL, PORT, APP_SECRET } = require("./config");
const User = require("./models/User");
const cors = require("cors"); 
const app = express();
app.use(cors({ origin: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Register

app.get("/", (req, res) => {
  res.send("Hi, I am from customer");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  res.json(user);
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send("User not found");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send("Invalid password");
  const token = jwt.sign({ id: user._id, email: user.email }, APP_SECRET);
  res.json({ token });
});

mongoose.connect(DB_URL).then(() => {
  console.log("✅ Customer DB connected");
  app.listen(PORT, () => console.log(`🚀 Customer Service on ${PORT}`));
});
