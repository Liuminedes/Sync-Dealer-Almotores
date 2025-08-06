import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Vehicle = sequelize.define(
  "Vehicle",
  {
    vin: { type: DataTypes.STRING, allowNull: false, unique: true },
    marca: { type: DataTypes.STRING, allowNull: false },
    modelo: { type: DataTypes.STRING, allowNull: false },
    cliente: { type: DataTypes.STRING, allowNull: false },
    fechaVenta: { type: DataTypes.DATE, allowNull: false },
    fechaMatricula: { type: DataTypes.DATE },
    fechaSOAT: { type: DataTypes.DATE },
    fechaPlacas: { type: DataTypes.DATE },
    estado: {
      type: DataTypes.ENUM("proceso", "matriculado", "placas", "soat"),
      allowNull: false,
    },
    observaciones: { type: DataTypes.TEXT },
  },
  { timestamps: true }
);

export default Vehicle;
