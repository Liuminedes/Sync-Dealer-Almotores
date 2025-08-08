import { useAuthStore } from "../store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

  return authUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
