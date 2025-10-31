import axiosClient from "./axiosClient";

export const addToCart = (data) => axiosClient.post("/shopping/cart", data);
export const getCart = (customerId) => axiosClient.get(`/shopping/${customerId}/cart`);
export const checkout = (data) => axiosClient.post("/shopping/checkout", data);
