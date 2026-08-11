import { Search, Filter, Users, CheckCircle2, AlertCircle, FileText, ArrowRight } from 'lucide-react'
import StatisticCard from '../../components/ui/StatisticCard'
import SectionHeader from '../../components/ui/SectionHeader'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

 

function CoordinatorDashboardPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");

useEffect(() => {
  fetchStudents();
}, []);


const fetchStudents = async () => {
  
  try {
    const response = await api.get("/students");
console.log(JSON.stringify(response.data.students[0], null, 2));
    setStudents(response.data.students);

    console.log(response.data.students);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};
const filteredStudents = students.filter((student) => {
  const matchName = student.users?.full_name
    ?.toLowerCase()
    .includes(search.toLowerCase());

  const matchBranch =
    branch === "" || student.branch === branch;

  return matchName && matchBranch;
});
const completedProfiles = students.filter(
  (student) => student.readiness_score >= 70
).length;

const incompleteProfiles = students.filter(
  (student) => student.readiness_score < 70
).length;

const uploadedResume = students.filter(
  (student) => student.resume_url
).length;
  return (
    <div className="min-h-screen bg-soft text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">Coordinator workspace</p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Placement coordinator dashboard</h1>
              <button
  onClick={() => navigate("/add-job")}
  className="rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
>
  + Add Job
</button>
              <p className="max-w-2xl text-sm leading-7 text-slate-600">Track student readiness, review profile completion, and identify who needs support before placement drives begin.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-5 py-3 text-sm font-medium text-slate-700">Last synced: 10 mins ago</div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatisticCard
  label="Total students"
  value={students.length}
  accent
/>

<StatisticCard
  label="Completed profiles"
  value={completedProfiles}
/>

<StatisticCard
  label="Incomplete profiles"
  value={incompleteProfiles}
/>

<StatisticCard
  label="Resume uploaded"
  value={uploadedResume}
/>
  
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <SectionHeader eyebrow="Student overview" title="Search and filter placement-ready students" description="Quickly explore student profiles based on branch, course, or passing year." className="mb-6" />
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.6fr_0.6fr_0.6fr]">
              <label className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3">
                <Search className="h-5 w-5 text-slate-400" />
                <input
  type="text"
  placeholder="Search student name"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border-none bg-transparent text-sm text-slate-900 outline-none"
/>
              </label>
              <label className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3">
                <Filter className="h-5 w-5 text-slate-400" />
               <select
  value={branch}
  onChange={(e) => setBranch(e.target.value)}
  className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
>
                  <option value="">All Branches</option>

{[...new Set(students.map(student => student.branch))].map((branchName) => (
  <option key={branchName} value={branchName}>
    {branchName}
  </option>
))}
                </select>
              </label>
              <label className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3">
                <Filter className="h-5 w-5 text-slate-400" />
                <select className="w-full border-none bg-transparent text-sm text-slate-700 outline-none">
                  <option>All courses</option>
                  <option>B.Tech</option>
                  <option>MCA</option>
                </select>
              </label>
              <label className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3">
                <Filter className="h-5 w-5 text-slate-400" />
                <select className="w-full border-none bg-transparent text-sm text-slate-700 outline-none">
                  <option>All years</option>
                  <option>2026</option>
                  <option>2027</option>
                </select>
              </label>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">Recent registered students</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">Latest student signups</h2>
              </div>
              <button className="inline-flex items-center gap-2 rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
                View all students
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
  onClick={() => navigate("/applications")}
  className="inline-flex items-center gap-2 rounded-3xl border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
>
  View applications
  <ArrowRight className="h-4 w-4" />
</button>
<button
  onClick={() => navigate("/mock-results")}
  className="inline-flex items-center gap-2 rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
>
  Mock Test Results
  <ArrowRight className="h-4 w-4" />
</button>
<button
  onClick={() => navigate("/resources")}
  className="inline-flex items-center gap-2 rounded-3xl border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
>
  <FileText className="h-4 w-4" />
  Manage Resources
</button>
            </div>

            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200">
              <div className="hidden grid-cols-[1.4fr_0.8fr_0.8fr_0.6fr_0.8fr_0.7fr_0.7fr] bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-600 md:grid">
                <div>Student name</div>
                <div>Branch</div>
                <div>Course</div>
                <div>Semester</div>
                <div>Profile</div>
                <div>Resume</div>
                <div>Action</div>
              </div>
              <div className="divide-y divide-slate-200">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="grid gap-4 px-5 py-4 text-sm text-slate-700 md:grid-cols-[1.4fr_0.8fr_0.8fr_0.6fr_0.8fr_0.7fr_0.7fr] md:items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-sm font-semibold text-brand-700">{student.users?.full_name
  ?.split(" ")
  .map((part) => part[0])
  .join("")
  .slice(0, 2)}</div>
                      <div>
                        <p className="font-semibold text-slate-900">{student.users?.full_name}</p>
                        <p className="text-xs text-slate-500">Registered recently</p>
                      </div>
                    </div>
                    <div>{student.branch}</div>
                    <div>{"N/A"}</div>
                    <div>{student.semester}</div>
                    <div>{student.readiness_score}%</div>
                    <div
  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
    student.resume_url
      ? "bg-emerald-50 text-emerald-700"
      : "bg-amber-50 text-amber-700"
  }`}
>
  {student.resume_url ? (
    <CheckCircle2 className="h-3.5 w-3.5" />
  ) : (
    <AlertCircle className="h-3.5 w-3.5" />
  )}

  {student.resume_url ? "Uploaded" : "Pending"}
</div>
                    <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">
                      <FileText className="h-4 w-4" />
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoordinatorDashboardPage
