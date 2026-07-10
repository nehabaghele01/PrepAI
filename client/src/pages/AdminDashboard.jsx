import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

function AdminDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await api.get("/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setData(res.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchAdminData();
  }, []);

  if (!data) {
  return (
    <div className="page-loader">
      <h2>Loading...</h2>
    </div>
  );
}

  return (
    <div className="tracker-page">
      <h1>Admin Dashboard</h1>

      <button className="primary-btn" onClick={() => navigate("/admin/users")}>
        Manage Users
      </button>

      <div className="cards">
        <div className="stats-card-admin">
          <h2>Users</h2>
          <h1>{data.totalUsers}</h1>
        </div>

        <div className="stats-card-admin">
          <h2>DSA</h2>
          <h1>{data.totalDSA}</h1>
        </div>

        <div className="stats-card-admin">
          <h2>Aptitude</h2>
          <h1>{data.totalAptitude}</h1>
        </div>

        <div className="stats-card-admin">
          <h2>Projects</h2>
          <h1>{data.totalProjects}</h1>
        </div>

        <div className="stats-card-admin">
          <h2>Interviews</h2>
          <h1>{data.totalInterviews}</h1>
        </div>
      </div>

      <h2
        style={{
          marginTop: "40px",
        }}
      >
        Recent Users
      </h2>

      <div className="problem-card">
         <div className="table-scroll">
        <table
          style={{
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {data.recentUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
