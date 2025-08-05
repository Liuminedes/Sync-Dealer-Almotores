import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/authStore";

export default function MainLayout() {
  const { isAuthLoaded } = useAuthStore();

  if (!isAuthLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
        <p className="ml-2 text-base">Cargando plataforma...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-base-100">
        <Outlet />
      </main>
    </div>
  );
}
