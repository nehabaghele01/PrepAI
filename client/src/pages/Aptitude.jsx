import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

function Aptitude() {
  const emptyForm = {
    title: "",
    category: "",
    difficulty: "",
    status: "",
    score: "",
  };

  const [form, setForm] = useState(emptyForm);

  const [topics, setTopics] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");

  const [difficultyFilter, setDifficultyFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  // GET TOPICS

  const fetchTopics = async () => {
    try {
      const res = await api.get("/aptitude", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTopics(res.data.topics);

      setLoading(false);
    } catch (error) {
      console.log(error.response?.data);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const addTopic = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(
          `/aptitude/${editId}`,

          form,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        toast.success("Topic updated");

        setEditId(null);
      } else {
        await api.post(
          "/aptitude",

          form,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        toast.success("Topic added");
      }

      setForm(emptyForm);

      fetchTopics();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const deleteTopic = async (id) => {
    try {
      await api.delete(
        `/aptitude/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Topic deleted");

      fetchTopics();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const editTopic = (topic) => {
    setForm({
      title: topic.title,
      category: topic.category,
      difficulty: topic.difficulty,
      status: topic.status,
      score: topic.score,
    });

    setEditId(topic._id);
  };

  // SEARCH + FILTER

  const filteredTopics = topics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(search.toLowerCase()) ||
      topic.category.toLowerCase().includes(search.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === "" || topic.difficulty === difficultyFilter;

    const matchesStatus = statusFilter === "" || topic.status === statusFilter;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  return (
    <div className="tracker-page">
      <h1>Aptitude Tracker</h1>

      <form className="tracker-form" onSubmit={addTopic}>
        <input
          name="title"
          placeholder="Topic Name"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
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

          <option>Completed</option>
        </select>

        <input
          type="number"
          name="score"
          placeholder="Score"
          value={form.score}
          onChange={handleChange}
        />

        <button className="primary-btn">
          {editId ? "Update Topic" : "Add Topic"}
        </button>
      </form>

      {/* Search + Filters */}

      <div className="search-filter-bar">
        <input
          className="search-input"
          placeholder="Search Topic..."
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

          <option>Completed</option>
        </select>
      </div>

      <h2 className="section-title">Your Topics</h2>

      {loading ? (
        <div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      ) : filteredTopics.length === 0 ? (
        <p className="empty-state">No Topics Found</p>
      ) : (
        filteredTopics.map((topic) => (
          <div className="problem-card" key={topic._id}>
            <h3>{topic.title}</h3>

            <p>Category : {topic.category}</p>

            <p>Difficulty : {topic.difficulty}</p>

            <p>Status : {topic.status}</p>

            <p>Score : {topic.score}</p>

            <div className="card-buttons">
              <button className="edit-btn" onClick={() => editTopic(topic)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTopic(topic._id)}
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

export default Aptitude;
