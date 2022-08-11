const find_or_fail = (model) => {
  return async (req, res, next) => {
    try {
      const id = req.params.id;
      res.obj = await model.findByPk(id);

      if (res.obj !== null) {
        next();
      } else {
        res.status(404).json({
          message: "Data Not Found!",
        });
      }
    } catch (e) {
      res.status(500).json({ message: e });
    }
  };
};

module.exports = { find_or_fail };
