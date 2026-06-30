import { useEffect, useState } from "react";
import api from "../api/axios";
import StatsCard from "../components/StatsCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const [streak, setStreak] = useState(1);

  const [lastLogin, setLastLogin] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setData(res.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchDashboard();

    // -------- LOGIN STREAK --------

    const today = new Date().toDateString();

    const user = JSON.parse(localStorage.getItem("user"));

    const streakKey = `loginStreak_${user?._id}`;
    const dateKey = `lastLoginDate_${user?._id}`;

    const savedDate = localStorage.getItem(dateKey);

    let savedStreak = parseInt(localStorage.getItem(streakKey)) || 1;

    if (savedDate !== today) {
      const yesterday = new Date();

      yesterday.setDate(yesterday.getDate() - 1);

      if (savedDate === yesterday.toDateString()) {
        savedStreak += 1;
      } else {
        savedStreak = 1;
      }

      localStorage.setItem(streakKey, savedStreak);

      localStorage.setItem(dateKey, today);
    }

    setStreak(savedStreak);

    setLastLogin(savedDate === today ? "Today" : today);
  }, []);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard">
      {/* Hero */}
      <div className="hero-section">
        <div className="hero-left">
          <h1>Welcome back, {data.user} 👋</h1>

          <p>
            Your placement preparation is moving in the right direction. Stay
            consistent, solve problems every day and keep improving.
          </p>

          <div className="hero-meta">
            <div className="hero-badge">
              🔥 {streak} Day{streak > 1 ? "s" : ""} Streak
            </div>

            <div className="hero-badge">🕒 Last Login : {lastLogin}</div>
          </div>
        </div>

        <div className="hero-right">
          <div className="motivation-card">
            <div className="motivation-icon">🎯</div>

            <h3>Today's Goal</h3>

            <div className="goal-list">
              <div className="goal-item">
                <span className="goal-icon">✅</span>
                <span>
                  Solve <strong>2 DSA Problems</strong>
                </span>
              </div>

              <div className="goal-item">
                <span className="goal-icon">✅</span>
                <span>
                  Complete <strong>1 Aptitude Quiz</strong>
                </span>
              </div>

              <div className="goal-item">
                <span className="goal-icon">✅</span>
                <span>
                  Revise <strong>1 Interview Topic</strong>
                </span>
              </div>
            </div>

            <div className="motivation-quote">
              "Small progress every day leads to big success."
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="quick-actions">
        <button
          className="quick-btn glass-btn"
          onClick={() => navigate("/dsa")}
        >
          + Add DSA
        </button>

        <button
          className="quick-btn glass-btn"
          onClick={() => navigate("/aptitude")}
        >
          + Add Aptitude
        </button>

        <button
          className="quick-btn glass-btn"
          onClick={() => navigate("/project")}
        >
          + Add Project
        </button>

        <button
          className="quick-btn glass-btn"
          onClick={() => navigate("/interview")}
        >
          + Add Interview
        </button>
      </div>

      {/* Summary */}

      <div className="dashboard-summary">
        <div className="summary-card">
          <h4>Profile Completion</h4>
          <span>{data.profileCompletion}</span>
        </div>

        <div className="summary-card">
          <h4>Overall Progress</h4>
          <span>{data.overallProgress}</span>
        </div>
      </div>

      {/* Stats */}

      <div className="cards">
        <StatsCard title="DSA" data={data.dsa} />

        <StatsCard title="Aptitude" data={data.aptitude} />

        <StatsCard title="Project" data={data.project} />

        <StatsCard title="Interview" data={data.interview} />
      </div>

      {/* Tips */}

      <div className="ai-card">
        <h2>🚀 Placement Tips</h2>

        <ul className="tips-list">
          <li>
            Solve at least <strong>2 DSA problems</strong> daily.
          </li>

          <li>
            Practice <strong>15-20 Aptitude questions</strong>.
          </li>

          <li>
            Revise one <strong>Interview Question</strong>.
          </li>

          <li>
            Keep your <strong>Projects & Resume</strong> updated.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
