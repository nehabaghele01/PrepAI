const Project = require("../models/Project");
const User = require("../models/User");
const DSAProblem = require("../models/DSAProblem");
const Aptitude = require("../models/Aptitude");
const InterviewQuestion = require("../models/InterviewQuestion");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // DSA Stats

    const dsaTotal = await DSAProblem.countDocuments({
      user: userId,
    });

    const dsaSolved = await DSAProblem.countDocuments({
      user: userId,
      status: "Solved",
    });

    const dsaPending = await DSAProblem.countDocuments({
      user: userId,
      status: "Pending",
    });

    // Aptitude Stats

    const aptitudeTotal = await Aptitude.countDocuments({
      user: userId,
    });

    const aptitudeCompleted = await Aptitude.countDocuments({
      user: userId,
      status: "Completed",
    });

    const aptitudePending = await Aptitude.countDocuments({
      user: userId,
      status: "Pending",
    });

    // Interview Stats

    const interviewTotal = await InterviewQuestion.countDocuments({
      user: userId,
    });

    const interviewCompleted = await InterviewQuestion.countDocuments({
      user: userId,
      status: "Completed",
    });

    const interviewPending = await InterviewQuestion.countDocuments({
      user: userId,
      status: "Pending",
    });

    // Project Stats

    const projectTotal = await Project.countDocuments({
      user: userId,
    });

    const projectCompleted = await Project.countDocuments({
      user: userId,
      status: "Completed",
    });

    const projectPending = await Project.countDocuments({
      user: userId,
      status: "Pending",
    });

    // Overall Progress

    const totalTasks = dsaTotal + aptitudeTotal + interviewTotal + projectTotal;

    const completedTasks =
      dsaSolved + aptitudeCompleted + interviewCompleted + projectCompleted;

    const progressPercentage =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Profile Completion

    const user = await User.findById(userId);

    let profileScore = 0;

    if (user.name) {
      profileScore += 10;
    }

    if (user.email) {
      profileScore += 10;
    }

    if (dsaTotal > 0) {
      profileScore += 15;
    }

    if (aptitudeTotal > 0) {
      profileScore += 15;
    }

    if (interviewTotal > 0) {
      profileScore += 15;
    }

    if (projectTotal > 0) {
      profileScore += 15;
    }

    if (completedTasks > 0) {
      profileScore += 20;
    }

    res.status(200).json({
      user: req.user.name,

      dsa: {
        total: dsaTotal,

        completed: dsaSolved,

        pending: dsaPending,
      },

      aptitude: {
        total: aptitudeTotal,

        completed: aptitudeCompleted,

        pending: aptitudePending,
      },

      interview: {
        total: interviewTotal,

        completed: interviewCompleted,

        pending: interviewPending,
      },

      project: {
        total: projectTotal,

        completed: projectCompleted,

        pending: projectPending,
      },

      overallProgress: `${progressPercentage}%`,

      profileCompletion: `${profileScore}%`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};
