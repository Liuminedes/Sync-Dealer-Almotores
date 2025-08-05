export default (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  }, {
    timestamps: true,
  });

  return Sale;
};
