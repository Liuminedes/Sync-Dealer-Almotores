import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", // Asegúrate de que el puerto coincida con tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adjuntar token automáticamente en cada request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
