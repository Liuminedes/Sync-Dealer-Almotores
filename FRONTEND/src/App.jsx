import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import AppRouter from "./routes/AppRouter";
import { axiosInstance } from "./lib/axios";
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
        <p className="ml-2 text-base">Verificando sesión...</p>
      </div>
    );
  }

  return (
    <>
      <AppRouter />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
