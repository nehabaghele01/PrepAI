const User = require("../models/User");
const DSAProblem = require("../models/DSAProblem");
const Aptitude = require("../models/Aptitude");
const Project = require("../models/Project");
const InterviewQuestion = require("../models/InterviewQuestion");

// Dashboard Stats
const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalDSA = await DSAProblem.countDocuments();

    const totalAptitude = await Aptitude.countDocuments();

    const totalProjects = await Project.countDocuments();

    const totalInterviews = await InterviewQuestion.countDocuments();

    const recentUsers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalUsers,
      totalDSA,
      totalAptitude,
      totalProjects,
      totalInterviews,
      recentUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete User

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await DSAProblem.deleteMany({ user: req.params.id });

    await Aptitude.deleteMany({ user: req.params.id });

    await Project.deleteMany({ user: req.params.id });

    await InterviewQuestion.deleteMany({ user: req.params.id });

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAdminDashboard,
  getAllUsers,
  deleteUser,
};
