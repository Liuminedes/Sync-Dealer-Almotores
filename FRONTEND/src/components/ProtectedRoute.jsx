// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
        <p className="ml-2">Verificando sesión...</p>
      </div>
    );
  }

  // Si no está logueado, lo redirige al login
  if (!authUser) return <Navigate to="/login" replace />;

  return children;
}
