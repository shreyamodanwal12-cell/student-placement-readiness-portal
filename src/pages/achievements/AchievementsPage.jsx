import { useEffect, useState } from "react";
import { Award, Plus, Trash2, Pencil, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function AchievementsPage() {
  const navigate = useNavigate();

  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  // GET achievements
  const fetchAchievements = async () => {
    try {
      const response = await api.get("/achievements");

      console.log("ACHIEVEMENTS RESPONSE:", response.data);

      setAchievements(response.data.achievements || []);
    } catch (error) {
      console.log(
        "ACHIEVEMENTS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // POST / PUT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // UPDATE
        const response = await api.put(
          `/achievements/${editingId}`,
          formData
        );

        console.log("UPDATE ACHIEVEMENT:", response.data);

        alert("Achievement Updated Successfully");
      } else {
        // CREATE
        const response = await api.post(
          "/achievements",
          formData
        );

        console.log("ADD ACHIEVEMENT:", response.data);

        alert("Achievement Added Successfully");
      }

      setFormData({
        title: "",
        description: "",
        date: "",
      });

      setIsAdding(false);
      setEditingId(null);

      fetchAchievements();
    } catch (error) {
      console.log(
        "SAVE ACHIEVEMENT ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // Edit
  const handleEdit = (achievement) => {
    setEditingId(achievement.id);

    setFormData({
      title: achievement.title || "",
      description: achievement.description || "",
      date: achievement.date || "",
    });

    setIsAdding(true);
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this achievement?"
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(
        `/achievements/${id}`
      );

      console.log("DELETE ACHIEVEMENT:", response.data);

      alert("Achievement Deleted Successfully");

      fetchAchievements();
    } catch (error) {
      console.log(
        "DELETE ACHIEVEMENT ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete achievement"
      );
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-600">
          Loading achievements...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-brand-600" />

              <h1 className="text-2xl font-semibold text-slate-950">
                Achievements
              </h1>
            </div>

            <p className="mt-1 text-sm text-slate-600">
              Add and manage your academic and professional achievements.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingId(null);

            setFormData({
              title: "",
              description: "",
              date: "",
            });

            setIsAdding(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Plus className="h-5 w-5" />
          Add Achievement
        </button>
      </div>

      {/* Add / Edit Form */}
      {isAdding && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow">

          <h2 className="text-xl font-semibold text-slate-950">
            {editingId
              ? "Edit Achievement"
              : "Add New Achievement"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Achievement Title"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand-600"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Achievement Description"
              rows="4"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand-600"
            />

            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Date / Year (e.g. 2026)"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand-600"
            />

            <div className="flex gap-3">

              <button
                type="submit"
                className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
              >
                {editingId
                  ? "Update Achievement"
                  : "Save Achievement"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                }}
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

            </div>
          </form>
        </div>
      )}

      {/* Achievements */}
      {achievements.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">

          <Award className="mx-auto h-12 w-12 text-slate-400" />

          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            No achievements yet
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Add your first achievement to build your placement profile.
          </p>

        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">

          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600/10">
                    <Award className="h-6 w-6 text-brand-600" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">
                      {achievement.title}
                    </h3>

                    {achievement.date && (
                      <p className="mt-1 text-sm text-slate-500">
                        {achievement.date}
                      </p>
                    )}
                  </div>

                </div>

                <div className="flex gap-2">

                  <button
                    type="button"
                    onClick={() => handleEdit(achievement)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(achievement.id)
                    }
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                </div>

              </div>

              {achievement.description && (
                <p className="mt-5 text-sm leading-6 text-slate-600">
                  {achievement.description}
                </p>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default AchievementsPage;