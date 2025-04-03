// ✅ CORRECTO
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/", // sin /api
  headers: {
    "Content-Type": "application/json"
  }
});

export const axiosFormData = axios.create({
  baseURL: "http://localhost:4000/api", // sin /api
  headers: {
    "Content-Type": "multipart/form-data"
  }
});
