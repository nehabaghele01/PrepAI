const Aptitude = require("../models/Aptitude");

// Add Aptitude Topic

const addTopic = async (req, res) => {
  try {
    const { title, category, difficulty, status, score } = req.body;

    // Validation

    if (!title || !category || !difficulty) {
      return res.status(400).json({
        message: "Title, category and difficulty are required",
      });
    }

    const topic = await Aptitude.create({
      title,
      category,
      difficulty,
      status,
      score,

      user: req.user._id,
    });

    res.status(201).json({
      message: "Aptitude topic added successfully",
      topic,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTopics = async (req, res) => {
  try {
    const topics = await Aptitude.find({
      user: req.user._id,
    });

    res.status(200).json({
      count: topics.length,
      topics,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTopic = async (req, res) => {
  try {
    const topic = await Aptitude.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({
        message: "Topic not found",
      });
    }

    if (topic.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    const updatedTopic = await Aptitude.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    res.status(200).json({
      message: "Topic updated successfully",
      topic: updatedTopic,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteTopic = async (req, res) => {
  try {
    const topic = await Aptitude.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({
        message: "Topic not found",
      });
    }

    if (topic.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    await topic.deleteOne();

    res.status(200).json({
      message: "Topic deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addTopic,
  getTopics,
  updateTopic,
  deleteTopic,
};
