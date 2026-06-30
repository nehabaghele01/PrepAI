import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const active = (path) => {
    return location.pathname === path ? "active-nav" : "";
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/dashboard")}>
        <span className="logo-ai">PrepAI</span>
      </div>

      <div className="nav-links">
        <button
          className={active("/dashboard")}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

          {/* Placement Dropdown */}

        <div className="placement-menu">
          <button className="placement-btn">Placements ▾</button>

          <div className="placement-dropdown">
            <button onClick={() => navigate("/dsa")} className={active("/dsa")}>
              DSA
            </button>

            <button
              onClick={() => navigate("/aptitude")}
              className={active("/aptitude")}
            >
              Aptitude
            </button>

            <button
              onClick={() => navigate("/interview")}
              className={active("/interview")}
            >
              Interview
            </button>

            <button
              onClick={() => navigate("/project")}
              className={active("/project")}
            >
              Project
            </button>

            <button
              onClick={() => navigate("/resume")}
              className={active("/resume")}
            >
              Resume
            </button>
          </div>
        </div>

        <button className={active("/ai")} onClick={() => navigate("/ai")}>
          AI Coach
        </button>

        <div className="user-info">
          <div className="user-dropdown">
            <button
              className="dropdown-item"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>

            <button
              className="dropdown-item"
              onClick={() => navigate("/settings")}
            >
              Settings
            </button>

            {user?.email === "neha@gmail.com" && (
              <button
                className="dropdown-item"
                onClick={() => navigate("/admin")}
              >
                Admin
              </button>
            )}

            <button className="dropdown-item logout-item" onClick={logout}>
              Logout
            </button>
          </div>

          <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>

          <span className="user-name">{user?.name}</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
