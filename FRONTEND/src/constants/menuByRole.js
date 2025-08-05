// src/constants/menuByRole.js
export const menuByRole = {
  admin: [
    { name: "Dashboard", path: "/", icon: "home" },
    { name: "Usuarios", path: "/usuarios", icon: "users" },
    { name: "Vehículos", path: "/vehiculos", icon: "car" },
    { name: "Comisiones", path: "/comisiones", icon: "dollar-sign" },
    { name: "Sucursales", path: "/sucursales", icon: "store" },
    {
      name: "Configuración",
      icon: "settings",
      children: [
        { name: "Perfil", path: "/config/perfil", icon: "user" },
        { name: "Temas", path: "/config/temas", icon: "palette" },
        { name: "Cerrar sesión", action: "logout", icon: "log-out" },
      ],
    },
  ],
  asistente: [
    { name: "Dashboard", path: "/", icon: "home" },
    { name: "Vehículos", path: "/vehiculos", icon: "car" },
    { name: "Comisiones", path: "/comisiones", icon: "dollar-sign" },
    {
      name: "Configuración",
      icon: "settings",
      children: [
        { name: "Perfil", path: "/config/perfil", icon: "user" },
        { name: "Temas", path: "/config/temas", icon: "palette" },
        { name: "Cerrar sesión", action: "logout", icon: "log-out" },
      ],
    },
  ],
  "control interno": [
    { name: "Dashboard", path: "/", icon: "home" },
    { name: "Usuarios", path: "/usuarios", icon: "users" },
    { name: "Vehículos", path: "/vehiculos", icon: "car" },
    { name: "Comisiones", path: "/comisiones", icon: "dollar-sign" },
    { name: "Sucursales", path: "/sucursales", icon: "store" },
    {
      name: "Configuración",
      icon: "settings",
      children: [
        { name: "Perfil", path: "/config/perfil", icon: "user" },
        { name: "Temas", path: "/config/temas", icon: "palette" },
        { name: "Cerrar sesión", action: "logout", icon: "log-out" },
      ],
    },
  ],
  "director comercial": [
    { name: "Dashboard", path: "/", icon: "home" },
    { name: "Comisiones", path: "/comisiones", icon: "dollar-sign" },
    {
      name: "Configuración",
      icon: "settings",
      children: [
        { name: "Perfil", path: "/config/perfil", icon: "user" },
        { name: "Temas", path: "/config/temas", icon: "palette" },
        { name: "Cerrar sesión", action: "logout", icon: "log-out" },
      ],
    },
  ],
  "asesor comercial": [
    { name: "Dashboard", path: "/", icon: "home" },
    { name: "Mi Historial", path: "/historial", icon: "clock" },
    {
      name: "Configuración",
      icon: "settings",
      children: [
        { name: "Perfil", path: "/config/perfil", icon: "user" },
        { name: "Temas", path: "/config/temas", icon: "palette" },
        { name: "Cerrar sesión", action: "logout", icon: "log-out" },
      ],
    },
  ],
};
