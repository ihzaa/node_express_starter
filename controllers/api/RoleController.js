const { Role, Permission, RoleHasPermission } = require("../../models");
const { validationResult } = require("express-validator");

module.exports = {
  index: async (req, res) => {
    res.json(res.paginatedResult);
  },

  store: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }
    const { name } = req.body;

    let createdData = await Role.create({ name });

    res.status(201).json({
      message: "Data Successfully Created!",
      data: {
        id: createdData.id,
      },
    });
  },

  show: async (req, res) => {
    const id = req.params.id;

    res.json({
      message: "Data Found!",
      data: res.obj,
    });
  },

  update: async (req, res) => {
    const id = req.params.id;

    let { name } = req.body;
    await Role.update(
      { name },
      {
        where: {
          id,
        },
      }
    );

    res.json({
      message: "Data Successfully Updated!",
    });
  },

  destroy: async (req, res) => {
    await res.obj.destroy();
    res.json({
      message: "Data Successfully Deleted!",
    });
  },

  getPermission: async (req, res) => {
    let permissions = await res.obj.getPermissions({
      attributes: ["name"],
      joinTableAttributes: [],
    });
    res.json({ permissions });
  },

  storePermission: async (req, res) => {
    let id = req.params.id;
    RoleHasPermission.destroy({
      where: {
        RoleId: id,
      },
    });
    let permissions = [...new Set(req.body.permissions)];
    permissions.forEach(async (permission) => {
      let get_permission = await Permission.findOne({
        where: { name: permission },
      });
      if (get_permission === null) {
        let created_permission = await Permission.create({ name: permission });
        await RoleHasPermission.create({
          PermissionId: created_permission.id,
          RoleId: id,
        });
      } else {
        await RoleHasPermission.create({
          permissionId: get_permission.id,
          RoleId: id,
        });
      }
    });

    res.status(201).json({
      message: "Data Successfully Created!",
    });
  },
};
