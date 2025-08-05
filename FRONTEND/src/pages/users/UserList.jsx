import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function UserList({ onEdit }) {
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
        <button className="btn btn-primary" onClick={() => onEdit(null)}>
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
                <th>Avatar</th>
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

                  {/* Avatar */}
                  <td>
                    <div className="avatar">
                      <div className="w-10 rounded-full ring ring-base-300 ring-offset-1">
                        <img
                          src={user.profilePic || "/avatar.png"}
                          alt={user.fullName}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </td>

                  {/* Nombre */}
                  <td className="font-medium">{user.fullName}</td>

                  <td>{user.email}</td>
                  <td>{user.Role?.name}</td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-outline btn-warning"
                        onClick={() => onEdit(user)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button className="btn btn-sm btn-outline btn-error">
                        <Trash2 size={16} />
                      </button>
                    </div>
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
