const DSAProblem = require("../models/DSAProblem");

// Add DSA Problem
const addProblem = async (req, res) => {
  try {
    const { title, platform, topic, difficulty, status, link } = req.body;

    if (!title || !platform || !difficulty) {
      return res.status(400).json({
        message: "Title, platform and difficulty are required",
      });
    }

    const problem = await DSAProblem.create({
      title,
      platform,
      topic,
      difficulty,
      status,
      link,

      user: req.user._id,
    });

    res.status(201).json({
      message: "Problem added successfully",
      problem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getProblems = async (req, res) => {
  try {
    const problems = await DSAProblem.find({
      user: req.user._id,
    });

    res.status(200).json({
      count: problems.length,
      problems,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateProblem = async (req, res) => {
  try {
    const problem = await DSAProblem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    if (req.body.title === "") {
      return res.status(400).json({
        message: "Title cannot be empty",
      });
    }

    const updatedProblem = await DSAProblem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    res.status(200).json({
      message: "Problem updated successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteProblem = async (req, res) => {
  try {
    const problem = await DSAProblem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    await problem.deleteOne();

    res.status(200).json({
      message: "Problem deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProblem,
  getProblems,
  updateProblem,
  deleteProblem,
};
