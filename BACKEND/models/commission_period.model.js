export default (sequelize, DataTypes) => {
  const CommissionPeriod = sequelize.define("CommissionPeriod", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  return CommissionPeriod;
};
