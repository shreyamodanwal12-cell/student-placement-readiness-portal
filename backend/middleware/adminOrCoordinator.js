const adminOrCoordinator = (req, res, next) => {
  if (
    req.user.role !== "admin" &&
    req.user.role !== "coordinator"
  ) {
    return res.status(403).json({
      success: false,
      message: "Access Denied. Admin or Coordinator Only.",
    });
  }

  next();
};

module.exports = adminOrCoordinator;