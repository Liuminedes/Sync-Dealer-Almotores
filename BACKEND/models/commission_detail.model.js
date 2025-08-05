export default (sequelize, DataTypes) => {
  const CommissionDetail = sequelize.define("CommissionDetail", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  return CommissionDetail;
};
