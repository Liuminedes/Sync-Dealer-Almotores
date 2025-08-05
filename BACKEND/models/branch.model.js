// BACKEND/models/branch.model.js

export default (sequelize, DataTypes) => {
  const Branch = sequelize.define("Branch", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "KIA", // Puedes cambiar esto en el seeder
    },
  }, {
    timestamps: false,
  });

  return Branch;
};
