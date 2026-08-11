import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function AddJobPage() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState({
    company_id: "",
    job_title: "",
    job_description: "",
    job_type: "",
    salary: "",
    eligibility_cgpa: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [applyLink, setApplyLink] = useState("");
  // Get Companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/companies");

        console.log("COMPANIES:", response.data);

        setCompanies(response.data.companies || []);
      } catch (error) {
        console.log(
          "COMPANIES ERROR:",
          error.response?.data || error.message
        );
      }
    };

    fetchCompanies();
  }, []);

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

      const response = await api.post("/jobs", {
  ...formData,
  company_id: Number(formData.company_id),
  eligibility_cgpa: Number(formData.eligibility_cgpa),
  apply_link: applyLink,
});

      console.log("JOB ADDED:", response.data);

      alert("Job Added Successfully");

      navigate("/jobs");
    } catch (error) {
      console.log(
        "ADD JOB ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to add job"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
            Job Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Add New Job
          </h1>

          <p className="mt-2 text-slate-600">
            Create a new placement opportunity for students.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium"
        >

          {/* Company */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Company
            </label>

            <select
              name="company_id"
              value={formData.company_id}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
            >
              <option value="">
                Select Company
              </option>

              {companies.map((company) => (
                <option
                  key={company.id}
                  value={company.id}
                >
                  {company.company_name}
                </option>
              ))}
            </select>
          </div>

          {/* Job Title */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Job Title
            </label>

            <input
              type="text"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Job Description
            </label>

            <textarea
              name="job_description"
              value={formData.job_description}
              onChange={handleChange}
              placeholder="Enter job description"
              rows="5"
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Job Type
            </label>

            <select
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
            >
              <option value="">
                Select Job Type
              </option>

              <option value="Full Time">
                Full Time
              </option>

              <option value="Part Time">
                Part Time
              </option>

              <option value="Internship">
                Internship
              </option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Salary
            </label>

            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. 5-8 LPA"
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
            />
          </div>

          {/* CGPA */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Minimum Eligibility CGPA
            </label>

            <input
              type="number"
              step="0.01"
              name="eligibility_cgpa"
              value={formData.eligibility_cgpa}
              onChange={handleChange}
              placeholder="e.g. 7.0"
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Application Deadline
            </label>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
            />
          </div>
<div>
  <label className="block text-sm font-medium text-slate-700">
    Company Apply Link
  </label>

  <input
    type="url"
    placeholder="https://company.com/careers/job"
    value={applyLink}
    onChange={(e) => setApplyLink(e.target.value)}
    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20"
  />

  <p className="mt-2 text-xs text-slate-500">
    Student will be redirected to this company's original application page.
  </p>
</div>
          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
          >
            {loading ? "Adding Job..." : "Add Job"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddJobPage;