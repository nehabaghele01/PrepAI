import { useNavigate } from "react-router-dom";

function StatsCard({ title, data }) {
  const navigate = useNavigate();

  const percentage =
    data.total === 0 ? 0 : Math.round((data.completed / data.total) * 100);

  const routes = {
    DSA: "/dsa",
    Aptitude: "/aptitude",
    Project: "/project",
    Interview: "/interview",
  };

  return (
    <div
      className="stats-card clickable-card"
      onClick={() => navigate(routes[title])}
    >
      <div className="stats-top">
        <div>
          <h2>{title}</h2>

          <p className="stats-subtitle">
            {data.total} {data.total === 1 ? "Task" : "Tasks"}
          </p>
        </div>

        <div className="progress-badge">{percentage}%</div>
      </div>

      <div className="progress-container">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        ></div>
      </div>

      <div className="stats-footer">
        <div className="footer-item">
          <span>Completed</span>

          <strong className="completed">{data.completed}</strong>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-item">
          <span>Pending</span>

          <strong className="pending">{data.pending}</strong>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
