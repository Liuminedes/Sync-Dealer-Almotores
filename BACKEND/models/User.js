import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    fullName: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    role: {
      type: DataTypes.ENUM(
        "admin",
        "asistente",
        "gerente",
        "director",
        "asesor"
      ),
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default User;
