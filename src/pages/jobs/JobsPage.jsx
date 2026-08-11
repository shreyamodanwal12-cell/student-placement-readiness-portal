import { useEffect, useState } from "react";
import { BriefcaseBusiness, Building2, CalendarDays } from "lucide-react";
import api from "../../api/api";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");

        console.log("JOBS:", response.data);

        setJobs(response.data.jobs || []);
      } catch (error) {
        console.log(
          "JOBS ERROR:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
            Career Opportunities
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Available Jobs
          </h1>

          <p className="mt-2 text-slate-600">
            Explore the latest placement opportunities and find the right role
            for you.
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-premium">
            <BriefcaseBusiness className="mx-auto h-10 w-10 text-slate-400" />

            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              No jobs available
            </h2>

            <p className="mt-2 text-slate-500">
              New job opportunities will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-premium transition hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">
                      {job.job_title}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <Building2 className="h-4 w-4" />

                      <span>
                        {job.companies?.company_name || "Company"}
                      </span>
                    </div>
                  </div>

                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {job.job_type}
                  </span>
                </div>

                <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
                  {job.job_description}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">
                      Salary
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {job.salary}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">
                      Minimum CGPA
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {job.eligibility_cgpa}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays className="h-4 w-4" />

                  <span>
                    Deadline:{" "}
                    {job.deadline
                      ? new Date(job.deadline).toLocaleDateString()
                      : "Not specified"}
                  </span>
                </div>

                <button
  onClick={() => {
    if (job.apply_link) {
      window.open(job.apply_link, "_blank", "noopener,noreferrer");
    } else {
      alert("Application link is not available for this job.");
    }
  }}
  className="mt-6 w-full rounded-2xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
>
  Apply Now
</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsPage;