const { Role } = require("../../models");
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
};
