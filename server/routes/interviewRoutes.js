const express = require("express");

const protect = require("../middleware/authMiddleware");

const checkOwnership = require("../middleware/ownerMiddleware");

const InterviewQuestion = require("../models/InterviewQuestion");

const {
  addQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/interviewController");

const router = express.Router();

// Add
router.post("/", protect, addQuestion);

// Get
router.get("/", protect, getQuestions);

// Update
router.put("/:id", protect, checkOwnership(InterviewQuestion), updateQuestion);

// Delete
router.delete(
  "/:id",
  protect,
  checkOwnership(InterviewQuestion),
  deleteQuestion,
);

module.exports = router;
