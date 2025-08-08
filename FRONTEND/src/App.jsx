import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <div className="flex justify-center items-center h-screen">Cargando autenticación...</div>;

  return (
    <>
      <BrowserRouter>
        <AppRouter isAuthenticated={!!authUser} />
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
