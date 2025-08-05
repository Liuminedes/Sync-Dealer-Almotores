import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
});

// Si hay token en localStorage, agregarlo por defecto
const token = localStorage.getItem("token");
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
