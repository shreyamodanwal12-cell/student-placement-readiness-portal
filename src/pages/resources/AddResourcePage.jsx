import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Plus } from "lucide-react";
import axios from "axios";

function AddResourcePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    file_url: "",
    resource_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

data.append("title", formData.title);
data.append("description", formData.description);
data.append("category", formData.category);
data.append("type", formData.type);

if (file) {
  data.append("file", file);
}

if (formData.resource_url) {
  data.append("resource_url", formData.resource_url);
}

const response = await axios.post(
  "http://localhost:5000/api/resources",
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);

      if (response.data.success) {
        setMessage("Resource added successfully!");

        setFormData({
          title: "",
          description: "",
          category: "",
          type: "",
          file_url: "",
          resource_url: "",
        });

        setTimeout(() => {
          navigate("/resources");
        }, 1000);
      }
    } catch (err) {
      console.error("ADD RESOURCE ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Failed to add resource. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">

      <button
        type="button"
        onClick={() => navigate("/resources")}
        className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Resources
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
            <FileText className="h-6 w-6 text-brand-600" />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
              Resource Management
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-950">
              Add Resource
            </h1>
          </div>
        </div>

        <p className="mt-3 text-slate-600">
          Add useful learning materials for placement preparation.
        </p>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">

        {message && (
          <div className="mb-6 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Resource Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. React Interview Questions"
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:bg-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe this resource..."
              rows={4}
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:bg-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:bg-white"
            >
              <option value="">Select Category</option>
              <option value="Technical">Technical</option>
              <option value="DSA">DSA</option>
              <option value="Aptitude">Aptitude</option>
              <option value="Interview">Interview</option>
              <option value="Communication">Communication</option>
              <option value="Placement">Placement</option>
              <option value="Career">Career</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Resource Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:bg-white"
            >
              <option value="">Select Type</option>
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
              <option value="Article">Article</option>
              <option value="Link">Link</option>
              <option value="Notes">Notes</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* File URL */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              File URL
            </label>

            <input
              type="url"
              name="file_url"
              value={formData.file_url}
              onChange={handleChange}
              placeholder="https://example.com/file.pdf"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:bg-white"
            />

            <p className="mt-2 text-xs text-slate-500">
              Optional. Add a PDF or downloadable file URL.
            </p>
          </div>
{/* Upload PDF */}
<div>
  <label className="mb-2 block text-sm font-semibold text-slate-800">
    Upload PDF
  </label>

  <input
    type="file"
    accept=".pdf,application/pdf"
    onChange={(e) => setFile(e.target.files[0])}
    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
  />

  <p className="mt-2 text-xs text-slate-500">
    Select a PDF file for students to view.
  </p>
</div>
          {/* Resource URL */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Resource URL
            </label>

            <input
              type="url"
              name="resource_url"
              value={formData.resource_url}
              onChange={handleChange}
              placeholder="https://example.com/resource"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:bg-white"
            />

            <p className="mt-2 text-xs text-slate-500">
              Optional. Add a YouTube, article, website or other resource link.
            </p>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-brand-700 disabled:opacity-60"
            >
              <Plus className="h-5 w-5" />

              {loading ? "Adding Resource..." : "Add Resource"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddResourcePage;