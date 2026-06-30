const { askGroq } = require("../services/groqService");
const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const prompt = `
You are PrepAI, an AI placement preparation assistant.

Rules:
- Help students preparing for placements.
- Answer in simple language.
- Give concise answers.
- Focus on DSA, Aptitude, DBMS, OS, CN, OOP, HR Interview, Resume and Projects.

Student Question:
${message}
`;

    const reply = await askGroq(prompt);

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI failed.",
    });
  }
};

module.exports = {
  chatWithAI,
};
