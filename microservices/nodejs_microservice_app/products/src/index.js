const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

// ✅ Only load .env.dev locally — not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./.env.dev" });
}

const app = express();
const PORT = process.env.PORT || 8002;

// ✅ Use correct env var name (MONGO_URL)
const MONGO_URL = process.env.MONGO_URL || process.env.MONGODB_URI;

app.use(express.json());
app.use(cors({ origin: "*" }));

// ✅ Serve uploads (IMPORTANT — NO '/products' prefix here)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
});
const Product = mongoose.model("Product", ProductSchema);

// ✅ Routes
app.get("/", async (_, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/", upload.single("image"), async (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  const product = await Product.create({ name, price, description, image });
  res.status(201).json(product);
});

// ✅ MongoDB Connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ Product DB connected");
    app.listen(PORT, () => console.log(`🚀 Product Service running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// ✅ Prevent process crash on unhandled errors
process.on("unhandledRejection", err => console.error("Unhandled Rejection:", err));
process.on("uncaughtException", err => console.error("Uncaught Exception:", err));
