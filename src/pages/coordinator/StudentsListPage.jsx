import { Link } from 'react-router-dom'
import { Search, Filter, FileText, ArrowRight, BadgeCheck, AlertCircle } from 'lucide-react'
import SectionHeader from '../../components/ui/SectionHeader'

const students = [
  { id: 1, name: 'Aarav Singh', branch: 'CSE', course: 'B.Tech', semester: '7th', completion: '92%', resume: 'Uploaded' },
  { id: 2, name: 'Meera Sharma', branch: 'ECE', course: 'B.Tech', semester: '6th', completion: '78%', resume: 'Pending' },
  { id: 3, name: 'Rohan Verma', branch: 'ME', course: 'B.Tech', semester: '8th', completion: '88%', resume: 'Uploaded' },
  { id: 4, name: 'Sneha Rao', branch: 'IT', course: 'MCA', semester: '3rd', completion: '67%', resume: 'Pending' },
  { id: 5, name: 'Kunal Patel', branch: 'CSE', course: 'M.Tech', semester: '2nd', completion: '95%', resume: 'Uploaded' }
]

function StudentsListPage() {
  return (
    <div className="min-h-full bg-soft text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Students list"
              title="Manage student placement records"
              description="Review student profiles, track completion progress, and access resume status from one coordinated workspace."
            />
            <div className="rounded-3xl bg-slate-50 px-5 py-3 text-sm font-medium text-slate-700">5 students tracked</div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.6fr_0.6fr_0.6fr]">
              <label className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3">
                <Search className="h-5 w-5 text-slate-400" />
                <input type="text" placeholder="Search student name" className="w-full border-none bg-transparent text-sm text-slate-900 outline-none" />
              </label>
              <label className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3">
                <Filter className="h-5 w-5 text-slate-400" />
                <select className="w-full border-none bg-transparent text-sm text-slate-700 outline-none">
                  <option>All branches</option>
                  <option>CSE</option>
                  <option>ECE</option>
                  <option>IT</option>
                  <option>ME</option>
                </select>
              </label>
              <label className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3">
                <Filter className="h-5 w-5 text-slate-400" />
                <select className="w-full border-none bg-transparent text-sm text-slate-700 outline-none">
                  <option>All courses</option>
                  <option>B.Tech</option>
                  <option>M.Tech</option>
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

          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200">
            <div className="hidden grid-cols-[1.3fr_0.7fr_0.8fr_0.7fr_0.8fr_0.8fr_0.8fr] bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-600 md:grid">
              <div>Student Name</div>
              <div>Branch</div>
              <div>Course</div>
              <div>Semester</div>
              <div>Profile Completion</div>
              <div>Resume Status</div>
              <div>Action</div>
            </div>
            <div className="divide-y divide-slate-200">
              {students.map((student) => (
                <div key={student.id} className="grid gap-4 px-5 py-4 text-sm text-slate-700 md:grid-cols-[1.3fr_0.7fr_0.8fr_0.7fr_0.8fr_0.8fr_0.8fr] md:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-sm font-semibold text-brand-700">
                      {student.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{student.name}</p>
                      <p className="text-xs text-slate-500">Placement candidate</p>
                    </div>
                  </div>
                  <div>{student.branch}</div>
                  <div>{student.course}</div>
                  <div>{student.semester}</div>
                  <div>{student.completion}</div>
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${student.resume === 'Uploaded' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {student.resume === 'Uploaded' ? <BadgeCheck className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                    {student.resume}
                  </div>
                  <Link to={`/students/${student.id}`} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">
                    <FileText className="h-4 w-4" />
                    View Profile
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentsListPage
