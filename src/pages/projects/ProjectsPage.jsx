import { useEffect, useState } from "react";
import api from "../../api/api";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    project_url: "",
    github_url: "",
  });

  // ---------------- GET PROJECTS ----------------
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await api.get("/projects");

      console.log("PROJECTS RESPONSE:", response.data);

      setProjects(response.data.projects || []);
    } catch (error) {
      console.log(
        "PROJECTS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ---------------- INPUT CHANGE ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- ADD PROJECT ----------------
  const handleAddProject = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/projects", formData);

      console.log("ADD PROJECT RESPONSE:", response.data);

      alert("Project Added Successfully");

      setFormData({
        title: "",
        description: "",
        technologies: "",
        project_url: "",
        github_url: "",
      });

      setIsAdding(false);

      fetchProjects();
    } catch (error) {
      console.log(
        "ADD PROJECT ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Project Add Failed"
      );
    }
  };

  // ---------------- EDIT PROJECT ----------------
  const handleEdit = (project) => {
    setEditingId(project.id);

    setFormData({
      title: project.title || "",
      description: project.description || "",
      technologies: project.technologies || "",
      project_url: project.project_url || "",
      github_url: project.github_url || "",
    });

    setIsAdding(true);
  };

  // ---------------- UPDATE PROJECT ----------------
  const handleUpdateProject = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(
        `/projects/${editingId}`,
        formData
      );

      console.log(
        "UPDATE PROJECT RESPONSE:",
        response.data
      );

      alert("Project Updated Successfully");

      setEditingId(null);

      setFormData({
        title: "",
        description: "",
        technologies: "",
        project_url: "",
        github_url: "",
      });

      setIsAdding(false);

      fetchProjects();
    } catch (error) {
      console.log(
        "UPDATE PROJECT ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Project Update Failed"
      );
    }
  };

  // ---------------- DELETE PROJECT ----------------
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(
        `/projects/${id}`
      );

      console.log(
        "DELETE PROJECT RESPONSE:",
        response.data
      );

      alert("Project Deleted Successfully");

      fetchProjects();
    } catch (error) {
      console.log(
        "DELETE PROJECT ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Project Delete Failed"
      );
    }
  };

  // ---------------- CANCEL ----------------
  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);

    setFormData({
      title: "",
      description: "",
      technologies: "",
      project_url: "",
      github_url: "",
    });
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-950">
            My Projects
          </h1>

          <p className="mt-2 text-slate-600">
            Manage your academic and personal projects.
          </p>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
          >
            + Add Project
          </button>
        )}
      </div>

      {/* ADD / EDIT FORM */}
      {isAdding && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow">

          <h2 className="text-xl font-semibold text-slate-950">
            {editingId ? "Edit Project" : "Add New Project"}
          </h2>

          <form
            onSubmit={
              editingId
                ? handleUpdateProject
                : handleAddProject
            }
            className="mt-6 space-y-4"
          >

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Project Title"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project Description"
              rows="4"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="Technologies (React, Node.js, PostgreSQL)"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              name="project_url"
              value={formData.project_url}
              onChange={handleChange}
              placeholder="Project URL"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              name="github_url"
              value={formData.github_url}
              onChange={handleChange}
              placeholder="GitHub URL"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <div className="flex gap-3 pt-2">

              <button
                type="submit"
                className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
              >
                {editingId
                  ? "Update Project"
                  : "Save Project"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700"
              >
                Cancel
              </button>

            </div>
          </form>
        </div>
      )}

      {/* PROJECT LIST */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow">

        <h2 className="text-xl font-semibold text-slate-950">
          Your Projects
        </h2>

        {loading ? (
          <p className="mt-6 text-slate-600">
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <div className="mt-6 rounded-xl bg-slate-50 p-6 text-center">
            <p className="text-slate-600">
              No projects added yet.
            </p>

            <button
              onClick={() => setIsAdding(true)}
              className="mt-4 rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white"
            >
              Add Your First Project
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2">

            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-slate-200 p-5"
              >

                <h3 className="text-xl font-semibold text-slate-950">
                  {project.title}
                </h3>

                {project.description && (
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {project.description}
                  </p>
                )}

                {project.technologies && (
                  <p className="mt-3 text-sm">
                    <strong>Technologies:</strong>{" "}
                    {project.technologies}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-3">

                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      View Project
                    </a>
                  )}

                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      GitHub
                    </a>
                  )}

                  <button
                    onClick={() => handleEdit(project)}
                    className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(project.id)
                    }
                    className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;