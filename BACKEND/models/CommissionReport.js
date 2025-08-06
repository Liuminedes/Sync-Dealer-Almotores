import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const CommissionReport = sequelize.define("CommissionReport", {
  mes: { type: DataTypes.INTEGER, allowNull: false },
  año: { type: DataTypes.INTEGER, allowNull: false },
  totalVehiculos: { type: DataTypes.INTEGER, allowNull: false },
  totalComision: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  pdfUrl: { type: DataTypes.TEXT },
}, { timestamps: true });

export default CommissionReport;