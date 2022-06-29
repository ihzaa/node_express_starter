"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Permission.belongsToMany(models.Role, {
        through: models.RoleHasPermission,
      });
    }
  }
  Permission.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "Permission",
      timestamps: false,
    }
  );
  return Permission;
};