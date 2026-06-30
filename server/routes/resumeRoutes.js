const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  addResume,
  getResume,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

const router = express.Router();

router.post("/", protect, addResume);
router.get("/", protect, getResume);
router.put("/", protect, updateResume);
router.delete("/", protect, deleteResume);

module.exports = router;
