export default (sequelize, DataTypes) => {
  const Commission = sequelize.define("Commission", {
    totalAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    pdfUrl: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: true,
  });

  return Commission;
};
