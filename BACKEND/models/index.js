import { sequelize } from "../config/database.js";

// Importar modelos
import "./User.js";
import "./Branch.js";
import "./Vehicle.js";
import "./CommissionTable.js";
import "./CommissionValue.js";
import "./CommissionReport.js";

// Obtener modelos desde sequelize
const { models } = sequelize;

const { User, Branch, Vehicle, CommissionTable, CommissionValue, CommissionReport } = models;

// Relaciones
User.belongsTo(Branch);
Branch.hasMany(User);

Vehicle.belongsTo(User, { as: "asesor", foreignKey: "asesorId" });
User.hasMany(Vehicle, { foreignKey: "asesorId" });

CommissionValue.belongsTo(CommissionTable);
CommissionTable.hasMany(CommissionValue);

CommissionReport.belongsTo(User, { as: "asesor", foreignKey: "asesorId" });
CommissionReport.belongsTo(CommissionTable);

export {
  sequelize,
  User,
  Branch,
  Vehicle,
  CommissionTable,
  CommissionValue,
  CommissionReport,
};
