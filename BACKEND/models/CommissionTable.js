import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const CommissionTable = sequelize.define("CommissionTable", {
  nombre: { type: DataTypes.STRING, allowNull: false },
  rangoMin: { type: DataTypes.INTEGER, allowNull: false },
  rangoMax: { type: DataTypes.INTEGER }, // puede ser null (infinito)
}, { timestamps: true });

export default CommissionTable;