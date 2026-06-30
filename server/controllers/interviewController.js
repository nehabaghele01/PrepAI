const InterviewQuestion = require("../models/InterviewQuestion");

// Add Interview Question

const addQuestion = async (req, res) => {
  try {
    const { question, category, difficulty, status } = req.body;

    // Validation

    if (!question || !category || !difficulty) {
      return res.status(400).json({
        message: "Question, category and difficulty are required",
      });
    }

    const newQuestion = await InterviewQuestion.create({
      question,
      category,
      difficulty,
      status,

      user: req.user._id,
    });

    res.status(201).json({
      message: "Interview question added successfully",
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await InterviewQuestion.find({
      user: req.user._id,
    });

    res.status(200).json({
      count: questions.length,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const question = await InterviewQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    if (question.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    const updatedQuestion = await InterviewQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    res.status(200).json({
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteQuestion = async (req, res) => {
  try {
    const question = await InterviewQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    if (question.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    await question.deleteOne();

    res.status(200).json({
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
};
