import { useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function Project() {
  const emptyForm = {
    title: "",
    description: "",
    techStack: "",
    github: "",
    status: "",
  };

  const [form, setForm] = useState(emptyForm);

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);

  // Search + Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [techFilter, setTechFilter] = useState("");

  
  // GET PROJECTS


  const fetchProjects = async () => {
    try {
      const res = await api.get("/project", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProjects(res.data.projects);

      setLoading(false);
    } catch (error) {
      console.log(error.response?.data);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // INPUT CHANGE
 
  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  // ADD + UPDATE

  const submitProject = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(
          `/project/${editId}`,

          form,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        toast.success("Project updated");

        setEditId(null);
      } else {
        await api.post(
          "/project",

          form,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        toast.success("Project added");
      }

      setForm(emptyForm);

      fetchProjects();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // DELETE

  const deleteProject = async (id) => {
    try {
      await api.delete(
        `/project/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Project deleted");

      fetchProjects();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

// EDIT

  const editProject = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      github: project.github,
      status: project.status,
    });

    setEditId(project._id);
  };

 // SEARCH + FILTER

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.techStack.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" || project.status === statusFilter;

    const matchesTech =
      techFilter === "" ||
      project.techStack.toLowerCase().includes(techFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesTech;
  });
  return (
    <div className="tracker-page">
      <h1>Project Tracker</h1>

      <form className="tracker-form" onSubmit={submitProject}>
        <input
          name="title"
          placeholder="Project Name"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="techStack"
          placeholder="Tech Stack"
          value={form.techStack}
          onChange={handleChange}
        />

        <input
          name="github"
          placeholder="Github Link"
          value={form.github}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="">Select Status</option>

          <option>Pending</option>

          <option>Completed</option>
        </select>

        <button className="primary-btn">
          {editId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* SEARCH + FILTER */}

      <div className="search-filter-bar">
        <input
          className="search-input"
          placeholder="Search Project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter-dropdown"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>

          <option>Pending</option>

          <option>Completed</option>
        </select>

        <select
          className="filter-dropdown"
          value={techFilter}
          onChange={(e) => setTechFilter(e.target.value)}
        >
          <option value="">All Tech Stack</option>

          {[...new Set(projects.map((p) => p.techStack))].map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>

      <h2 className="section-title">Your Projects</h2>

      {loading ? (
        <div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <p className="empty-state">No Projects Found</p>
      ) : (
        filteredProjects.map((project) => (
          <div className="problem-card" key={project._id}>
            <h3>{project.title}</h3>

            <p>Tech Stack : {project.techStack}</p>

            <p>Description : {project.description}</p>

            <p>Status : {project.status}</p>

            <a
              className="problem-link"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>

            <div className="card-buttons">
              <button className="edit-btn" onClick={() => editProject(project)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteProject(project._id)}
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

export default Project;
