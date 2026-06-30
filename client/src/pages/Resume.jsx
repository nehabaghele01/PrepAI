import { useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function Resume() {
  const emptyForm = {
    skills: "",
    projects: "",
    education: "",
    experience: "",
    targetRole: "",
  };

  const [form, setForm] = useState(emptyForm);

  const [resume, setResume] = useState(null);

  const [editMode, setEditMode] = useState(false);

  // GET RESUME

  const fetchResume = async () => {
    try {
      const res = await api.get("/resume", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setResume(res.data.resume);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const addResume = async (e) => {
    e.preventDefault();

    try {
      const resumeData = {
        skills: form.skills.split(","),

        targetRole: form.targetRole,

        projects: [
          {
            title: form.projects,
            description: "",
          },
        ],

        education: [
          {
            degree: form.education,
            college: "",
            year: "",
          },
        ],

        experience: [
          {
            company: form.experience,
            role: "",
            duration: "",
          },
        ],
      };

      if (editMode) {
        await api.put(
          "/resume",

          resumeData,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        toast.success("Resume updated");

        setEditMode(false);
      } else {
        await api.post(
          "/resume",

          resumeData,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        toast.success("Resume added");
      }

      setForm(emptyForm);

      fetchResume();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const editResume = () => {
    setForm({
      skills: resume.skills.join(","),

      projects: resume.projects[0]?.title || "",

      education: resume.education[0]?.degree || "",

      experience: resume.experience[0]?.company || "",

      targetRole: resume.targetRole || "",
    });

    setEditMode(true);
  };

  const deleteResume = async () => {
    try {
      await api.delete(
        "/resume",

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Resume deleted");

      setResume(null);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="tracker-page">
      <h1>Resume Tracker</h1>

      <form className="tracker-form" onSubmit={addResume}>
        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
        />

        <input
          name="targetRole"
          placeholder="Target Role"
          value={form.targetRole}
          onChange={handleChange}
        />

        <input
          name="projects"
          placeholder="Project Name"
          value={form.projects}
          onChange={handleChange}
        />

        <input
          name="education"
          placeholder="Education"
          value={form.education}
          onChange={handleChange}
        />

        <input
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
        />

        <button className="primary-btn">
          {editMode ? "Update Resume" : "Add Resume"}
        </button>
      </form>

      <h2 className="section-title">Your Resume</h2>

      {resume ? (
        <div className="problem-card">
          <h3>Resume Score : {resume.resumeScore}%</h3>

          <h4>Target Role : {resume.targetRole}</h4>

          <h4>
            Resume Status :
            {resume.resumeScore >= 80 ? " Ready ✅" : " Needs Improvement ⚠️"}
          </h4>

          <h4>Version : v{resume.version || 1}</h4>

          <p>Last Updated :{new Date(resume.updatedAt).toLocaleDateString()}</p>

          <hr />

          <p>Skills :{resume.skills.join(", ")}</p>

          <p>Projects :{resume.projects.map((p) => p.title).join(", ")}</p>

          <p>Education :{resume.education.map((e) => e.degree).join(", ")}</p>

          <p>
            Experience :{resume.experience.map((e) => e.company).join(", ")}
          </p>

          <div className="card-buttons">
            <button className="edit-btn" onClick={editResume}>
              Edit{" "}
            </button>

            <button className="delete-btn" onClick={deleteResume}>
              Delete{" "}
            </button>
          </div>
        </div>
      ) : (
        <p>No Resume Added</p>
      )}
    </div>
  );
}

export default Resume;
