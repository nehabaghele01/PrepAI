const Project = require("../models/Project");

// CREATE PROJECT

const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,

      user: req.user._id,
    });

    res.status(201).json({
      message: "Project added",

      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET PROJECTS

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user._id,
    });

    res.json({
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PROJECT

const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },

      req.body,

      {
        new: true,
      },
    );

    res.json({
      message: "Project updated",

      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PROJECT

const deleteProject = async (req, res) => {
  try {
    await Project.findOneAndDelete({
      _id: req.params.id,

      user: req.user._id,
    });

    res.json({
      message: "Project deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,

  getProjects,

  updateProject,

  deleteProject,
};
