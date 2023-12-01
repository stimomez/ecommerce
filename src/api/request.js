import axios from "axios";

export const urlAPI = axios.create({
  baseURL: "https://ecommerce-server-trxr.onrender.com/api/v1",
});
