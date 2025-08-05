import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Usuarios</h2>
        <button className="btn btn-primary">
          <Plus className="w-5 h-5" />
          Nuevo Usuario
        </button>
      </div>

      {loading ? (
        <div className="text-center">Cargando usuarios...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user, idx) => (
                <tr key={user.id}>
                  <td>{idx + 1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.Role?.name}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-outline btn-warning">
                      <Pencil size={16} />
                    </button>
                    <button className="btn btn-sm btn-outline btn-error">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
