const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const askGroq = async (prompt) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are PrepAI, an AI placement preparation assistant. Help students with DSA, Aptitude, DBMS, OS, CN, OOP, Resume, Projects and Interview preparation. Give concise and practical answers.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.5,
  });

  return chatCompletion.choices[0].message.content;
};

module.exports = {
  askGroq,
};
