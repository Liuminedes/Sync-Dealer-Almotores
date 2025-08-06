import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const CommissionValue = sequelize.define("CommissionValue", {
  modelo: { type: DataTypes.STRING, allowNull: false },
  codigo: { type: DataTypes.STRING, allowNull: false },
  version: { type: DataTypes.STRING, allowNull: false },
  valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { timestamps: true });

export default CommissionValue;