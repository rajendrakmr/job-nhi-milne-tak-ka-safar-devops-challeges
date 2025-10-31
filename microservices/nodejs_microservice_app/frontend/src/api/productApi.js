import axiosClient from "./axiosClient";

// GET all products
export const getProducts = () => axiosClient.get("/products");

// ADD a new product (with image)
export const addProduct = (productData) =>
  axiosClient.post("/products", productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
