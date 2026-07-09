// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// function AdminUsers() {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/admin/users", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setUsers(res.data);
//     } catch (error) {
//       console.log(error.response?.data);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const deleteUser = async (id, name) => {
//     const confirmDelete = window.confirm(`Delete ${name}?`);

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       await api.delete(`/admin/users/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       toast.success("User deleted");

//       fetchUsers();
//     } catch (error) {
//       console.log(error.response?.data);
//     }
//   };

//   return (
//     <div className="tracker-page">
//       <h1>User Management</h1>

//       <div className="problem-card">
//         <table
//           style={{
//             width: "100%",
//             textAlign: "left",
//           }}
//         >
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.name}</td>

//                 <td>{user.email}</td>

//                 <td>{user.role}</td>

//                 <td>
//                   {user.role === "admin" ? (
//                     <span
//                       style={{
//                         color: "#22c55e",
//                         fontWeight: "600",
//                       }}
//                     >
//                       Protected
//                     </span>
//                   ) : (
//                     <button
//                       className="delete-btn"
//                       onClick={() => deleteUser(user._id, user.name)}
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default AdminUsers;



import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(res.data);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("User deleted");
      fetchUsers();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  if (loading) {
    return (
      <div className="page-loader">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="tracker-page">
      <h1>User Management</h1>

      <div className="problem-card">
        <table
          style={{
            width: "100%",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  {user.role === "admin" ? (
                    <span
                      style={{
                        color: "#22c55e",
                        fontWeight: 600,
                      }}
                    >
                      Protected
                    </span>
                  ) : (
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user._id, user.name)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;