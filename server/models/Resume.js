const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    skills: [String],

    targetRole: {
      type: String,
      default: "Full Stack Developer",
    },

    resumeStatus: {
      type: String,
      default: "Needs Improvement",
    },

    version: {
      type: Number,
      default: 1,
    },

    projects: [
      {
        title: String,
        description: String,
        link: String,
      },
    ],

    education: [
      {
        degree: String,
        college: String,
        year: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        duration: String,
      },
    ],

    resumeScore: {
      type: Number,
      default: 0,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Resume", resumeSchema);
