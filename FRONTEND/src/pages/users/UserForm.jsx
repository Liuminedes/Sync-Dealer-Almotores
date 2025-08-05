// pages/users/UserForm.jsx
import { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { X, User, Mail, Lock, UserPlus, IdCard } from "lucide-react";

export default function UserForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    cedula: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleId: "",
    branchId: "",
  });

  const [roles, setRoles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesRes, branchesRes] = await Promise.all([
          axiosInstance.get("/roles"),
          axiosInstance.get("/branches"),
        ]);
        setRoles(rolesRes.data);
        setBranches(branchesRes.data);
      } catch (error) {
        toast.error("Error cargando datos de roles o sedes");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/users", formData);
      toast.success("Usuario creado correctamente");
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-base-100 w-full max-w-2xl rounded-2xl p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn btn-sm btn-circle"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <img
            src="/avatar.png"
            alt="avatar"
            className="w-24 h-24 rounded-full ring ring-base-300 mb-4"
          />
          <p className="text-sm text-base-content/60">
            El avatar se asignará por defecto
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre completo</span>
            </label>
            <div className="relative">
              <input
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="input input-bordered w-full pl-10"
              />
              <User className="absolute left-3 top-3.5 w-5 h-5 text-base-content/50" />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Cédula</span>
            </label>
            <div className="relative">
              <input
                name="cedula"
                type="text"
                required
                value={formData.cedula}
                onChange={handleChange}
                className="input input-bordered w-full pl-10"
              />
              <IdCard className="absolute left-3 top-3.5 w-5 h-5 text-base-content/50" />
            </div>
          </div>

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Correo electrónico</span>
            </label>
            <div className="relative">
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full pl-10"
              />
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-base-content/50" />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Rol del usuario</span>
            </label>
            <select
              name="roleId"
              required
              value={formData.roleId}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="" disabled>
                Selecciona un rol
              </option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Sede</span>
            </label>
            <select
              name="branchId"
              required
              value={formData.branchId}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="" disabled>
                Selecciona una sede
              </option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name} ({branch.brand})
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Contraseña</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full pl-10"
              />
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-base-content/50" />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirmar contraseña</span>
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input input-bordered w-full pl-10"
              />
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-base-content/50" />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              <UserPlus className="w-5 h-5 mr-2" /> Crear usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
