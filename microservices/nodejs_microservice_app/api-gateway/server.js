import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/**
 * ================================
 * MICROSERVICE ROUTES
 * ================================
 */

// ✅ Product Service (includes image uploads)
// ✅ Product Service (includes image uploads)
app.use(
  "/products/uploads",
  createProxyMiddleware({
    target: "http://products:8001", // 👈 Kubernetes Service name + port
    changeOrigin: true,
    pathRewrite: (path) => path.replace(/^\/products\/uploads/, "/uploads"),
  })
);

app.use(
  "/products",
  createProxyMiddleware({
    target: process.env.PRODUCTS_URL || "http://products:8001", // 👈 not localhost
    changeOrigin: true,
    pathRewrite: {
      "^/products": "",
    },
  })
);

// ✅ Shopping Service
app.use(
  "/shopping",
  createProxyMiddleware({
    target: process.env.SHOPPING_URL || "http://shopping:8003", // 👈
    changeOrigin: true,
    pathRewrite: {
      "^/shopping": "",
    },
  })
);

// ✅ Customer Service
app.use(
  "/customer",
  createProxyMiddleware({
    target: process.env.CUSTOMER_URL || "http://customer:8001", // 👈
    changeOrigin: true,
    pathRewrite: {
      "^/customer": "",
    },
  })
);


/**
 * ================================
 * HEALTH CHECK
 * ================================
 */
app.get("/", (req, res) => {
  res.send("🚀 API Gateway is running");
});

/**
 * ================================
 * START SERVER
 * ================================
 */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ API Gateway running on port ${PORT}`));
