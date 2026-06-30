const express = require("express");

const protect = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const {
  getAdminDashboard,
  getAllUsers,
  deleteUser,
} = require("../controllers/adminController");

const router = express.Router();

// Admin Dashboard
router.get("/dashboard", protect, admin, getAdminDashboard);

// All Users
router.get("/users", protect, admin, getAllUsers);

// Delete User
router.delete("/users/:id", protect, admin, deleteUser);

module.exports = router;
