import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function RequireAuth({ children }) {
  const { authUser } = useAuthStore();

  if (!authUser) return <Navigate to="/login" replace />;
  return children;
}
