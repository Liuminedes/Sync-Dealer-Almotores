import { create } from "zustand";
import { axiosInstance } from "../api/axiosInstance";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      set({ authUser: res.data.user });
    } catch (error) {
      console.error(
        "❌ checkAuth:",
        error.response?.data?.message || error.message
      );
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async ({ username, password }) => {
    set({ isLoggingIn: true });
    try {
      const { data } = await axios.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, isLoggedIn: true });
      toast.success("Inicio de sesión exitoso");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error al iniciar sesión");
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error(
        "Error en logout:",
        error.response?.data?.message || error.message
      );
    } finally {
      localStorage.removeItem("token");
      set({ authUser: null });
      toast.success("Sesión cerrada correctamente");
    }
  },
}));
