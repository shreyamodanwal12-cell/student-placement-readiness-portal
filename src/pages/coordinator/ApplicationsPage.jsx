import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  Mail,
  UserRound,
} from "lucide-react";
import api from "../../api/api";

function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications");

      console.log("APPLICATIONS:", response.data);

      setApplications(response.data.applications || []);
    } catch (error) {
      console.log(
        "APPLICATIONS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
            Placement Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Student Applications
          </h1>

          <p className="mt-2 text-slate-600">
            View students who have applied for available job opportunities.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-premium">
            <BriefcaseBusiness className="mx-auto h-10 w-10 text-slate-400" />

            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              No applications yet
            </h2>

            <p className="mt-2 text-slate-500">
              Student applications will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => (
              <div
                key={application.id}
                className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-premium"
              >
                <div className="grid gap-6 lg:grid-cols-[1fr_1fr_auto]">

                  {/* Student */}
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-brand-50 p-3">
                        <UserRound className="h-5 w-5 text-brand-600" />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                          Student
                        </p>

                        <h2 className="mt-1 text-lg font-semibold text-slate-950">
                          {application.students?.users?.full_name ||
                            "Unknown Student"}
                        </h2>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <p>
                        <strong>College Roll:</strong>{" "}
                        {application.students?.college_roll || "N/A"}
                      </p>

                      <p>
                        <strong>Branch:</strong>{" "}
                        {application.students?.branch || "N/A"}
                      </p>

                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />

                        {application.students?.users?.email || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Job */}
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-100 p-3">
                        <BriefcaseBusiness className="h-5 w-5 text-slate-700" />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                          Applied Job
                        </p>

                        <h2 className="mt-1 text-lg font-semibold text-slate-950">
                          {application.jobs?.job_title || "Unknown Job"}
                        </h2>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <p className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />

                        {application.jobs?.companies?.company_name ||
                          "Unknown Company"}
                      </p>

                      <p>
                        <strong>Applied:</strong>{" "}
                        {application.applied_at
                          ? new Date(
                              application.applied_at
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-start lg:justify-end">
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        application.status === "Selected"
                          ? "bg-green-100 text-green-700"
                          : application.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationsPage;