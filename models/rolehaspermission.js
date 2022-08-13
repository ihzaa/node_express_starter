"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoleHasPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RoleHasPermission.init(
    {
      permissionId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RoleHasPermission",
      timestamps: false,
    }
  );
  return RoleHasPermission;
};
