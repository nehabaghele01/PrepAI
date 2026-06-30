const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const projectRoutes = require("./routes/projectRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const aptitudeRoutes = require("./routes/aptitudeRoutes");
const dsaRoutes = require("./routes/dsaRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const aiRoutes = require("./routes/aiRoutes");


const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dsa", dsaRoutes);
app.use("/api/aptitude", aptitudeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);

// database
connectDB();

app.get("/", (req, res) => {
  res.send("PrepAI Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
