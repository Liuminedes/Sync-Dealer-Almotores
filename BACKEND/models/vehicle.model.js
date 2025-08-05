export default (sequelize, DataTypes) => {
  const Vehicle = sequelize.define("Vehicle", {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    table1: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    table2: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    table3: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "KIA", // para otras marcas a futuro
    },
  }, {
    timestamps: true,
  });

  return Vehicle;
};
