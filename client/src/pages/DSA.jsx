import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function DSA() {
  const emptyForm = {
    title: "",
    platform: "",
    topic: "",
    difficulty: "",
    status: "",
    link: "",
  };

  const [form, setForm] = useState(emptyForm);

  const [problems, setProblems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);

  // SEARCH + FILTER STATES

  const [search, setSearch] = useState("");

  const [difficultyFilter, setDifficultyFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const fetchProblems = async () => {
    try {
      const res = await api.get("/dsa", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProblems(res.data.problems);

      setLoading(false);
    } catch (error) {
      console.log(error.response?.data);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const submitProblem = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(
          `/dsa/${editId}`,

          form,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        toast.success("Problem updated");

        setEditId(null);
      } else {
        await api.post(
          "/dsa",

          form,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        toast.success("Problem added");
      }

      setForm(emptyForm);

      fetchProblems();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const deleteProblem = async (id) => {
    try {
      await api.delete(
        `/dsa/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Deleted");

      fetchProblems();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const editProblem = (problem) => {
    setForm({
      title: problem.title,
      platform: problem.platform,
      topic: problem.topic,
      difficulty: problem.difficulty,
      status: problem.status,
      link: problem.link,
    });

    setEditId(problem._id);
  };

  // FILTERED DATA

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(search.toLowerCase()) ||
      problem.platform.toLowerCase().includes(search.toLowerCase()) ||
      problem.topic.toLowerCase().includes(search.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === "" || problem.difficulty === difficultyFilter;

    const matchesStatus =
      statusFilter === "" || problem.status === statusFilter;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  return (
    <div className="tracker-page">
      <h1>DSA Tracker</h1>

      <form className="tracker-form" onSubmit={submitProblem}>
        <input
          name="title"
          placeholder="Problem Title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="platform"
          placeholder="Platform"
          value={form.platform}
          onChange={handleChange}
        />

        <input
          name="topic"
          placeholder="Topic"
          value={form.topic}
          onChange={handleChange}
        />

        <input
          name="link"
          placeholder="Problem Link"
          value={form.link}
          onChange={handleChange}
        />

        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
        >
          <option value="">Select Difficulty</option>

          <option>Easy</option>

          <option>Medium</option>

          <option>Hard</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="">Select Status</option>

          <option>Pending</option>

          <option>Solved</option>
        </select>

        <button className="primary-btn">
          {editId ? "Update Problem" : "Add Problem"}
        </button>
      </form>

      {/* SEARCH + FILTER */}
      <div className="search-filter-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search Problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter-dropdown"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          <option value="">All Difficulty</option>

          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <select
          className="filter-dropdown"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>

          <option>Pending</option>
          <option>Solved</option>
        </select>
      </div>

      <h2 className="section-title">Your Problems</h2>

      {loading ? (
        <div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      ) : filteredProblems.length === 0 ? (
        <div className="empty-state">
          <h3>No Problems Found</h3>

          <p>Try changing search or filters.</p>
        </div>
      ) : (
        filteredProblems.map((problem) => (
          <div className="problem-card" key={problem._id}>
            <h3>{problem.title}</h3>

            <p>Platform : {problem.platform}</p>

            <p>Topic : {problem.topic}</p>

            <p>Difficulty : {problem.difficulty}</p>

            <p>Status : {problem.status}</p>

            <a
              className="problem-link"
              href={problem.link}
              target="_blank"
              rel="noreferrer"
            >
              Open Link
            </a>

            <div className="card-buttons">
              <button className="edit-btn" onClick={() => editProblem(problem)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteProblem(problem._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DSA;
