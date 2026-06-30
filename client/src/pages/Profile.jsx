import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setUser(storedUser);
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="tracker-page">
      <h1>My Profile</h1>

      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-details">
            <h2>{user.name}</h2>

            <p className="profile-role">Computer Science Student</p>
          </div>
        </div>

        <hr />

        <div className="profile-info">
          <div className="profile-item">
            <span>Name</span>

            <strong>{user.name}</strong>
          </div>

          <div className="profile-item">
            <span>Email</span>

            <strong>{user.email}</strong>
          </div>

          <div className="profile-item">
            <span>Role</span>

            <strong>Placement Candidate</strong>
          </div>

          <div className="profile-item">
            <span>Platform</span>

            <strong>PrepAI User</strong>
          </div>
        </div>

        <div className="profile-stats">
          <div className="profile-stat">
            <h3>DSA</h3>

            <p>Tracking Active</p>
          </div>

          <div className="profile-stat">
            <h3>Aptitude</h3>

            <p>Tracking Active</p>
          </div>

          <div className="profile-stat">
            <h3>Projects</h3>

            <p>Tracking Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
