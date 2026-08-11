import { useState } from "react";
import { Bell, ShieldCheck, LayoutGrid, Bookmark } from "lucide-react";
import SectionHeader from "../../components/ui/SectionHeader";
import api from "../../api/api";
import BackButton from "../../components/ui/BackButton";


  function SettingsPage() {
  const [formData, setFormData] = useState({
    phone: "",
    college_roll: "",
    branch: "",
    course: "",
    semester: "",
    passing_year: "",
    cgpa: "",
    skills: "",
    linkedin: "",
    github: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.put("/students/profile", formData);

      console.log("PROFILE UPDATE:", response.data);

      alert("Student profile saved successfully!");
    } catch (error) {
      console.log(
        "PROFILE UPDATE ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Profile update failed"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    
    <div className="min-h-full bg-soft text-slate-900">
      <BackButton />

<h1>Settings</h1>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">

  <div>
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
      Student Profile
    </p>

    <h2 className="mt-3 text-2xl font-semibold text-slate-950">
      Student Information
    </h2>

    <p className="mt-2 text-sm text-slate-600">
      Add your academic and professional information for placement readiness.
    </p>
  </div>

  <form
    onSubmit={handleSubmit}
    className="mt-8 grid gap-5 md:grid-cols-2"
  >

    {/* Phone */}
    <div>
      <label className="text-sm font-medium text-slate-700">
        Phone
      </label>

      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="9876543210"
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
      />
    </div>

    {/* College Roll */}
    <div>
      <label className="text-sm font-medium text-slate-700">
        College Roll
      </label>

      <input
        type="text"
        name="college_roll"
        value={formData.college_roll}
        onChange={handleChange}
        placeholder="CS22001"
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
      />
    </div>

    {/* Branch */}
    <div>
      <label className="text-sm font-medium text-slate-700">
        Branch
      </label>

      <input
        type="text"
        name="branch"
        value={formData.branch}
        onChange={handleChange}
        placeholder="Computer Science"
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
      />
    </div>

    {/* Course */}
    <div>
      <label className="text-sm font-medium text-slate-700">
        Course
      </label>

      <input
        type="text"
        name="course"
        value={formData.course}
        onChange={handleChange}
        placeholder="B.Tech"
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
      />
    </div>

    {/* Semester */}
    <div>
      <label className="text-sm font-medium text-slate-700">
        Semester
      </label>

      <input
        type="number"
        name="semester"
        value={formData.semester}
        onChange={handleChange}
        placeholder="8"
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
      />
    </div>

    {/* Passing Year */}
    <div>
      <label className="text-sm font-medium text-slate-700">
        Passing Year
      </label>

      <input
        type="number"
        name="passing_year"
        value={formData.passing_year}
        onChange={handleChange}
        placeholder="2026"
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
      />
    </div>

    {/* CGPA */}
    <div>
      <label className="text-sm font-medium text-slate-700">
        CGPA
      </label>

      <input
        type="number"
        step="0.01"
        name="cgpa"
        value={formData.cgpa}
        onChange={handleChange}
        placeholder="8.7"
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
      />
    </div>

    {/* Skills */}
    <div>
      <label className="text-sm font-medium text-slate-700">
        Skills
      </label>

      <input
        type="text"
        name="skills"
        value={formData.skills}
        onChange={handleChange}
        placeholder="React, Node.js, Express"
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
      />
    </div>

    {/* LinkedIn */}
    <div>
      <label className="text-sm font-medium text-slate-700">
        LinkedIn
      </label>

      <input
        type="text"
        name="linkedin"
        value={formData.linkedin}
        onChange={handleChange}
        placeholder="https://linkedin.com/in/..."
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
      />
    </div>

    {/* GitHub */}
    <div>
      <label className="text-sm font-medium text-slate-700">
        GitHub
      </label>

      <input
        type="text"
        name="github"
        value={formData.github}
        onChange={handleChange}
        placeholder="https://github.com/..."
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-brand-500"
      />
    </div>

    {/* Save */}
    <div className="md:col-span-2">
      <button
        type="submit"
        disabled={loading}
        className="rounded-3xl bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Student Profile"}
      </button>
    </div>

  </form>
</section>
          <section className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">
            <SectionHeader
              eyebrow="Account settings"
              title="Manage your notifications, privacy, and profile preferences"
              description="Control how the portal communicates with you, keep your profile secure, and fine-tune your placement workspace experience."
            />

            <div className="grid gap-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
              <div className="flex items-center gap-4 text-slate-700">
                <Bell className="h-6 w-6 text-brand-600" />
                <div>
                  <p className="font-semibold text-slate-950">Notification preferences</p>
                  <p className="text-sm text-slate-600">Choose the updates you receive about resume feedback, interview invites, and placement milestones.</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm">
                  <span className="text-sm font-medium text-slate-700">Resume alerts</span>
                  <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                </label>
                <label className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm">
                  <span className="text-sm font-medium text-slate-700">Interview reminders</span>
                  <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                </label>
                <label className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm">
                  <span className="text-sm font-medium text-slate-700">Placement news</span>
                  <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                </label>
                <label className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm">
                  <span className="text-sm font-medium text-slate-700">Mentor updates</span>
                  <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                </label>
              </div>
            </div>

            <div className="grid gap-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
              <div className="flex items-center gap-4 text-slate-700">
                <ShieldCheck className="h-6 w-6 text-brand-600" />
                <div>
                  <p className="font-semibold text-slate-950">Privacy controls</p>
                  <p className="text-sm text-slate-600">Review your account visibility, data sharing, and consent preferences for campus placement services.</p>
                </div>
              </div>
              <div className="space-y-4">
                <label className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm">
                  <span className="text-sm font-medium text-slate-700">Public profile</span>
                  <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                </label>
                <label className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm">
                  <span className="text-sm font-medium text-slate-700">Personal data sharing</span>
                  <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                </label>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">
              <div className="flex items-center gap-4 text-slate-700">
                <LayoutGrid className="h-6 w-6 text-brand-600" />
                <div>
                  <p className="font-semibold text-slate-950">Workspace preferences</p>
                  <p className="text-sm text-slate-600">Choose how you want to navigate the portal and display your readiness data.</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <label className="flex items-center justify-between rounded-3xl bg-slate-50 p-5">
                  <span>Compact dashboard layout</span>
                  <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                </label>
                <label className="flex items-center justify-between rounded-3xl bg-slate-50 p-5">
                  <span>Show placement tips</span>
                  <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                </label>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-premium">
              <div className="flex items-center gap-3 text-slate-700">
                <Bookmark className="h-6 w-6 text-brand-600" />
                <p className="font-semibold">Helpful resources</p>
              </div>
              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="rounded-3xl bg-white p-4">Check resume feedback before applying.</div>
                <div className="rounded-3xl bg-white p-4">Set alerts for upcoming placement drives.</div>
                <div className="rounded-3xl bg-white p-4">Keep your profile and permissions up to date.</div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Security status</p>
              <p className="mt-4 text-2xl font-semibold text-slate-950">All set</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">Your account settings are configured for secure placement tracking and confidential resume handling.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage;
