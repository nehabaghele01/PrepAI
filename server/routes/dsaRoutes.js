const express = require("express");

const router = express.Router();

const {
  addProblem,
  getProblems,
  updateProblem,
  deleteProblem,
} = require("../controllers/dsaController");

const authMiddleware = require("../middleware/authMiddleware");

const checkOwnership = require("../middleware/ownerMiddleware");

const DSAProblem = require("../models/DSAProblem");

router.post("/", authMiddleware, addProblem);

router.get("/", authMiddleware, getProblems);

router.put("/:id", authMiddleware, checkOwnership(DSAProblem), updateProblem);

router.delete(
  "/:id",
  authMiddleware,
  checkOwnership(DSAProblem),
  deleteProblem,
);

module.exports = router;
