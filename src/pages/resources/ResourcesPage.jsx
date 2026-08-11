import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Plus,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import axios from "axios";

function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const user = JSON.parse(localStorage.getItem("user"));
const isAdmin = user?.role === "admin";
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/resources",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setResources(response.data.resources || []);
      }
    } catch (err) {
      console.error("RESOURCES ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load resources."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
            Learning Center
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Placement Resources
          </h1>

          <p className="mt-2 text-slate-600">
            Explore useful resources to improve your placement preparation.
          </p>
        </div>

        {/* Add Resource */}
        {isAdmin && (
  <Link
    to="/add-resource"
    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-brand-700"
  >
    <Plus className="h-5 w-5" />
    Add Resource
  </Link>
)}

      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-premium">
          <p className="text-slate-500">
            Loading resources...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-[2rem] bg-red-50 p-6 text-center text-red-700">
          {error}
        </div>
      )}

      {/* No Resources */}
      {!loading && !error && resources.length === 0 && (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-premium">

          <BookOpen className="mx-auto h-12 w-12 text-slate-400" />

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            No Resources Available
          </h2>

          <p className="mt-2 text-slate-500">
            Resources will appear here once they are added.
          </p>

        </div>
      )}

      {/* Resources List */}
      {!loading && resources.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {resources.map((resource) => (
            <div
              key={resource.id}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-premium transition hover:-translate-y-1"
            >

              {/* Icon + Type */}
              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
                  <FileText className="h-6 w-6 text-brand-600" />
                </div>

                {resource.type && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {resource.type}
                  </span>
                )}

              </div>

              {/* Title */}
              <h2 className="mt-5 text-xl font-bold text-slate-950">
                {resource.title}
              </h2>

              {/* Category */}
              {resource.category && (
                <p className="mt-1 text-sm font-medium text-brand-600">
                  {resource.category}
                </p>
              )}

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {resource.description || "No description available."}
              </p>

              {/* Buttons */}
              <div className="mt-5 flex flex-wrap gap-2">

                {resource.resource_url && (
                  <a
                    href={resource.resource_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-100"
                  >
                    Open Resource
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}

                {resource.file_url && (
                  <a
                    href={resource.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
                  >
                    View File
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default ResourcesPage;