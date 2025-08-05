// BACKEND/scripts/seed.js
import { Role, Branch, sequelize } from "../models/index.js";

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos");

    // ROLES
    const roles = [
      "Admin",
      "Asistente de Ventas",
      "Control Interno",
      "Director Comercial",
      "Asesor Comercial",
    ];

    for (const roleName of roles) {
      const [role, created] = await Role.findOrCreate({
        where: { name: roleName },
      });
      if (created) {
        console.log(`✅ Rol creado: ${roleName}`);
      }
    }

    // SEDES
    const branches = [
      { name: "Norte", brand: "KIA" },
      { name: "39", brand: "KIA" },
      { name: "Pasoancho", brand: "KIA" },
    ];

    for (const branchData of branches) {
      const [branch, created] = await Branch.findOrCreate({
        where: { name: branchData.name },
        defaults: { brand: branchData.brand },
      });
      if (created) {
        console.log(`✅ Sede creada: ${branchData.name} (${branchData.brand})`);
      }
    }

    console.log("🎉 Seeding completado correctamente");
    process.exit(0); // salir del script
  } catch (error) {
    console.error("❌ Error al hacer seeding:", error.message);
    process.exit(1);
  }
};

seed();
