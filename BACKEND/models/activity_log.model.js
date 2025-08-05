export default (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define("ActivityLog", {
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetTable: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  return ActivityLog;
};
