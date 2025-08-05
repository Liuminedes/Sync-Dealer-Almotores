import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Navigate, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();
  const { authUser, isCheckingAuth } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  if (isCheckingAuth) return <div>Cargando sesión...</div>;
  if (authUser) return <Navigate to="/" />;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    const success = await login(form);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo & Heading */}
          <div className="text-center mb-6">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <LogIn className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Bienvenido de nuevo</h1>
              <p className="text-base-content/60 text-sm">
                Ingresa los datos de tu cuenta
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-base-content/40" />
                <input
                  name="email"
                  type="email"
                  placeholder="correo@empresa.com"
                  value={form.email}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Contraseña</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-base-content/40" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-base-content/40" />
                  ) : (
                    <Eye className="w-5 h-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Cargando...
                </>
              ) : (
                "Ingresar"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side (optional background/pattern/image) */}
      <div className="bg-primary text-white hidden lg:flex flex-col justify-center items-center p-10">
        <h2 className="text-3xl font-bold">Commission Maker</h2>
        <p className="mt-4 text-center text-lg max-w-md">
          Administra perfiles, comisiones y sucursales de múltiples marcas de
          vehículos en un solo lugar.
        </p>
      </div>
    </div>
  );
}
