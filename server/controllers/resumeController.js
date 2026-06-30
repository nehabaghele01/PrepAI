const Resume = require("../models/Resume");

// calculate resume score function

const calculateScore = (skills, projects, education, experience) => {
  let score = 0;

  if (skills && skills.length > 0) {
    score += 30;
  }

  if (projects && projects.length > 0) {
    score += 30;
  }

  if (education && education.length > 0) {
    score += 20;
  }

  if (experience && experience.length > 0) {
    score += 20;
  }

  return score;
};

// Add Resume Details

const addResume = async (req, res) => {
  try {
    const existingResume = await Resume.findOne({
      user: req.user._id,
    });

    if (existingResume) {
      return res.status(400).json({
        message: "Resume already exists",
      });
    }

    const { skills, projects, education, experience } = req.body;

    if (!skills && !projects && !education && !experience) {
      return res.status(400).json({
        message: "Resume data required",
      });
    }

    const score = calculateScore(skills, projects, education, experience);

    const resume = await Resume.create({
      skills,
      projects,
      education,
      experience,

      resumeScore: score,

      user: req.user._id,
    });

    res.status(201).json({
      message: "Resume added successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Resume

const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.status(200).json({
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Resume

const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const { skills, projects, education, experience } = req.body;

    const score = calculateScore(skills, projects, education, experience);

    const updatedResume = await Resume.findByIdAndUpdate(
      resume._id,

      {
        ...req.body,

        resumeScore: score,
      },

      {
        new: true,
      },
    );

    res.status(200).json({
      message: "Resume updated successfully",

      resume: updatedResume,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Resume

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    await resume.deleteOne();

    res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addResume,
  getResume,
  updateResume,
  deleteResume,
};
