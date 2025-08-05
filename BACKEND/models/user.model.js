export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [6] },
    },
    profilePic: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "general",
    },
  }, {
    timestamps: true,
    paranoid: true,
  });

  return User;
};
