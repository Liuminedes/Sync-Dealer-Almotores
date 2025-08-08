import { useAuthStore } from "../../store/useAuthStore";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-center items-center px-4">
      <div className="bg-base-100 shadow-xl rounded-xl p-8 max-w-xl w-full text-center space-y-6">
        <h1 className="text-3xl font-bold">
          ¡Bienvenido, {authUser.fullName}!
        </h1>
        <p className="text-base-content/60">
          Este es tu panel provisional.
        </p>

        <div className="grid grid-cols-2 gap-4 text-left text-base-content/80">
          <div>
            <p className="font-semibold">Usuario:</p>
            <p>{authUser.username}</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{authUser.email}</p>
          </div>
          <div>
            <p className="font-semibold">Rol:</p>
            <p>{authUser.role}</p>
          </div>
          <div>
            <p className="font-semibold">Sede:</p>
            <p>{authUser.branchId}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="btn btn-error btn-outline mt-4"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
