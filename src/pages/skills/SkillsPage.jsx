import { useEffect, useState } from "react";
import api from "../../api/api";
import BackButton from "../../components/ui/BackButton";

function SkillsPage() {
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await api.get("/students/profile");

      console.log("SKILLS PROFILE:", response.data);

      const student = response.data.profile?.students?.[0];

      setSkills(student?.skills || "");
    } catch (error) {
      console.log(
        "SKILLS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const response = await api.put("/students/profile", {
        skills,
      });

      console.log("SKILLS UPDATE:", response.data);

      alert("Skills Updated Successfully");
    } catch (error) {
      console.log(
        "SKILLS UPDATE ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Skills Update Failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow">
        Loading skills...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BackButton />

      {/* Header */}
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
          Skills
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-slate-950">
          My Skills
        </h1>

        <p className="mt-2 text-slate-600">
          Add the technical skills and tools you know.
        </p>
      </div>

      {/* Skills Card */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">

        <label className="text-sm font-semibold text-slate-700">
          Technical Skills
        </label>

        <textarea
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Example: React, Node.js, Express, PostgreSQL"
          rows={5}
          className="mt-3 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />

        <p className="mt-2 text-sm text-slate-500">
          Separate multiple skills using commas.
        </p>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="mt-6 rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Skills"}
        </button>

      </div>

      {/* Preview */}
      <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">

        <h2 className="text-xl font-semibold text-slate-950">
          Skills Preview
        </h2>

        {skills ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
              .map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {skill}
                </span>
              ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-500">
            No skills added yet.
          </p>
        )}

      </div>

    </div>
  );
}

export default SkillsPage;