import { useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function Interview() {
  const emptyForm = {
    question: "",
    category: "",
    difficulty: "",
    status: "",
  };

  const [form, setForm] = useState(emptyForm);

  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);

  // Search + Filters

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("");

  const [difficultyFilter, setDifficultyFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  // =====================
  // GET
  // =====================

  const fetchQuestions = async () => {
    try {
      const res = await api.get("/interview", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setQuestions(res.data.questions);

      setLoading(false);
    } catch (error) {
      console.log(error.response?.data);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // =====================
  // INPUT CHANGE
  // =====================

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  // =====================
  // ADD / UPDATE
  // =====================

  const addQuestion = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(
          `/interview/${editId}`,

          form,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        toast.success("Question updated");

        setEditId(null);
      } else {
        await api.post(
          "/interview",

          form,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        toast.success("Question added");
      }

      setForm(emptyForm);

      fetchQuestions();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // =====================
  // DELETE
  // =====================

  const deleteQuestion = async (id) => {
    try {
      await api.delete(
        `/interview/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Question deleted");

      fetchQuestions();
    } catch (error) {
      console.log(error.response?.data);
    }
  };


  // EDIT
  

  const editQuestion = (item) => {
    setForm({
      question: item.question,
      category: item.category,
      difficulty: item.difficulty,
      status: item.status,
    });

    setEditId(item._id);
  };


  // SEARCH + FILTER


  const filteredQuestions = questions.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "" || item.category === categoryFilter;

    const matchesDifficulty =
      difficultyFilter === "" || item.difficulty === difficultyFilter;

    const matchesStatus = statusFilter === "" || item.status === statusFilter;

    return (
      matchesSearch && matchesCategory && matchesDifficulty && matchesStatus
    );
  });
  return (
    <div className="tracker-page">
      <h1>Interview Tracker</h1>

      <form className="tracker-form" onSubmit={addQuestion}>
        <input
          name="question"
          placeholder="Interview Question"
          value={form.question}
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

        <button className="primary-btn">
          {editId ? "Update Question" : "Add Question"}
        </button>
      </form>

      {/* SEARCH + FILTER */}

      <div className="search-filter-bar">
        <input
          className="search-input"
          placeholder="Search Question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          className="search-input"
          placeholder="Filter Category..."
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
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

      <h2 className="section-title">Your Questions</h2>

      {loading ? (
        <div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="empty-state">
          <h3>No Questions Found</h3>

          <p>Try changing search or filters.</p>
        </div>
      ) : (
        filteredQuestions.map((item) => (
          <div className="problem-card" key={item._id}>
            <h3>{item.question}</h3>

            <p>Category : {item.category}</p>

            <p>Difficulty : {item.difficulty}</p>

            <p>Status : {item.status}</p>

            <div className="card-buttons">
              <button className="edit-btn" onClick={() => editQuestion(item)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteQuestion(item._id)}
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

export default Interview;
