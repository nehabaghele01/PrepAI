const admin = (req, res, next) => {
  console.log("ROLE =", req.user.role);
  console.log("USER =", req.user);

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }

  next();
};

module.exports = admin;
