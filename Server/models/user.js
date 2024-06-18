"use strict";
const { Model } = require("sequelize");
const { hashPass } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favorite, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email is already in use, please use another email",
        },
        validate: {
          notNull: {
            msg: "Email cannot be empty",
          },
          isEmail: {
            msg: "Email is not valid",
          },
          notEmpty: {
            msg: "Email cannot be empty",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "username cannot be empty",
          },
          notEmpty: {
            msg: "username cannot be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password cannot be empty",
          },
          notEmpty: "Password cannot be empty",
          len: {
            args: [5],
            msg: "Password must be at least 5 characters long",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
      avatarUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPass(user.password);
  });
  return User;
};
