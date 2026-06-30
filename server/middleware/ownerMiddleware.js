const checkOwnership = (Model) => {
  return async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id);

      if (!item) {
        return res.status(404).json({
          message: "Data not found",
        });
      }

      if (item.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          message: "Not allowed",
        });
      }

      req.item = item;

      next();
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
};

module.exports = checkOwnership;
