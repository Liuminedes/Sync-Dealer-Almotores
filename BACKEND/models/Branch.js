import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Branch = sequelize.define("Branch", {
  name: { type: DataTypes.STRING, allowNull: false },
  ciudad: { type: DataTypes.STRING, allowNull: false },
  direccion: { type: DataTypes.STRING },
}, { timestamps: true });

export default Branch;