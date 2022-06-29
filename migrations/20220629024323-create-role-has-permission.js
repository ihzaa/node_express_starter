"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RoleHasPermissions", {
      permission_id: {
        type: Sequelize.INTEGER,
      },
      RoleId: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RoleHasPermissions");
  },
};
