import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  token: null,

  isCheckingAuth: true,
  isLoggingIn: false,
  isSigningUp: false,

  // ✅ Verificar sesión con token almacenado
  checkAuth: async () => {
    const token = localStorage.getItem("token");

    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }

    try {
      const res = await axiosInstance.get("/users/me");
      set({ authUser: res.data, token });
    } catch (error) {
      console.log("❌ Error en checkAuth:", error.response?.data?.message);
      set({ authUser: null, token: null });
      localStorage.removeItem("token");
      delete axiosInstance.defaults.headers.common["Authorization"];
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ✅ Registro de usuarios
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      toast.success("Usuario registrado correctamente");
      // Opcional: iniciar sesión automáticamente
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al registrar");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // ✅ Login y guardar token + usuario
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      set({ authUser: user, token });

      toast.success("Bienvenido " + user.fullName);
      return true; // ✅ Necesario
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
      return false; // ✅ Para manejarlo en el Login.jsx
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // ✅ Logout
  logout: () => {
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
    set({ authUser: null, token: null });
    toast.success("Sesión cerrada correctamente");
  },
}));
