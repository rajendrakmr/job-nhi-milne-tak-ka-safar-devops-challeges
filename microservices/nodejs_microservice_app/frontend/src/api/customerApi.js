import axiosClient from "./axiosClient";

export const register = (data) => axiosClient.post("/customer/register", data);
export const login = (data) => axiosClient.post("/customer/login", data);
