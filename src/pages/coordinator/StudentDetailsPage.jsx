import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Download, FileText, BadgeCheck, AlertCircle, Briefcase, GraduationCap, Sparkles } from 'lucide-react'
import SectionHeader from '../../components/ui/SectionHeader'

const studentData = {
  1: {
    name: 'Aarav Singh',
    email: 'aarav.singh@example.com',
    phone: '+91 98765 43210',
    branch: 'CSE',
    course: 'B.Tech',
    semester: '7th',
    graduationYear: '2026',
    cgpa: '9.1',
    skills: ['React', 'Tailwind CSS', 'JavaScript', 'Node.js'],
    projects: ['Placement Readiness Portal', 'AI Resume Analyzer'],
    objective: 'To build impactful software solutions and contribute to product teams with strong technical and problem-solving skills.',
    completion: '92%',
    resumeStatus: 'Uploaded',
    resumeName: 'Aarav_Singh_Resume.pdf'
  },
  2: {
    name: 'Meera Sharma',
    email: 'meera.sharma@example.com',
    phone: '+91 91234 56789',
    branch: 'ECE',
    course: 'B.Tech',
    semester: '6th',
    graduationYear: '2027',
    cgpa: '8.4',
    skills: ['Embedded Systems', 'C', 'Python', 'VLSI'],
    projects: ['Smart Irrigation System', 'Signal Processing Dashboard'],
    objective: 'To pursue a career in electronics and embedded engineering with a focus on practical innovation.',
    completion: '78%',
    resumeStatus: 'Pending',
    resumeName: 'Meera_Sharma_Resume.pdf'
  },
  3: {
    name: 'Rohan Verma',
    email: 'rohan.verma@example.com',
    phone: '+91 99887 66554',
    branch: 'ME',
    course: 'B.Tech',
    semester: '8th',
    graduationYear: '2026',
    cgpa: '8.8',
    skills: ['CAD', 'SolidWorks', 'Product Design', 'Thermodynamics'],
    projects: ['Fabrication Prototype', 'Mechanical Automation System'],
    objective: 'To contribute to product design and manufacturing using engineering insights and hands-on creativity.',
    completion: '88%',
    resumeStatus: 'Uploaded',
    resumeName: 'Rohan_Verma_Resume.pdf'
  },
  4: {
    name: 'Sneha Rao',
    email: 'sneha.rao@example.com',
    phone: '+91 97777 12345',
    branch: 'IT',
    course: 'MCA',
    semester: '3rd',
    graduationYear: '2027',
    cgpa: '8.9',
    skills: ['Java', 'Spring Boot', 'MySQL', 'UI Design'],
    projects: ['Library Management System', 'Campus Event Portal'],
    objective: 'To grow as a full-stack developer and contribute to modern digital products with strong backend foundations.',
    completion: '67%',
    resumeStatus: 'Pending',
    resumeName: 'Sneha_Rao_Resume.pdf'
  },
  5: {
    name: 'Kunal Patel',
    email: 'kunal.patel@example.com',
    phone: '+91 96543 22110',
    branch: 'CSE',
    course: 'M.Tech',
    semester: '2nd',
    graduationYear: '2027',
    cgpa: '9.3',
    skills: ['Machine Learning', 'Python', 'Data Science', 'MLOps'],
    projects: ['ML Model Deployment', 'Predictive Analytics Tool'],
    objective: 'To develop intelligent systems and data-driven applications that solve real-world challenges.',
    completion: '95%',
    resumeStatus: 'Uploaded',
    resumeName: 'Kunal_Patel_Resume.pdf'
  }
}

function StudentDetailsPage() {
  const { id } = useParams()
  const student = studentData[id]

  if (!student) {
    return (
      <div className="min-h-full bg-soft text-slate-900">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">Student not found</p>
          <p className="mt-3 text-lg text-slate-700">The requested student profile could not be found.</p>
        </div>
      </div>
    )
  }

  const resumeUploaded = student.resumeStatus === 'Uploaded'

  return (
    <div className="min-h-full bg-soft text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">Student details</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{student.name}</h1>
            </div>
            <Link to="/students" className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              <ArrowLeft className="h-4 w-4" />
              Back to list
            </Link>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
                <SectionHeader eyebrow="Personal details" title="Student profile summary" description="Core information and academic standing for placement coordination." />
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Email</p>
                    <p className="mt-3 text-sm font-semibold text-slate-900">{student.email}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Phone</p>
                    <p className="mt-3 text-sm font-semibold text-slate-900">{student.phone}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Branch</p>
                    <p className="mt-3 text-sm font-semibold text-slate-900">{student.branch}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Course</p>
                    <p className="mt-3 text-sm font-semibold text-slate-900">{student.course}</p>
                  </div>
                </div>
              </section>

              <section className="rounded-[2rem] border border-slate-200 bg-white p-8">
                <SectionHeader eyebrow="Academic details" title="Performance and academic profile" description="Placement readiness is based on academic consistency, progress, and completion of required milestones." />
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Semester</p>
                    <p className="mt-3 text-xl font-semibold text-slate-950">{student.semester}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Passing year</p>
                    <p className="mt-3 text-xl font-semibold text-slate-950">{student.graduationYear}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">CGPA</p>
                    <p className="mt-3 text-xl font-semibold text-slate-950">{student.cgpa}</p>
                  </div>
                </div>
              </section>

              <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Sparkles className="h-5 w-5 text-brand-600" />
                    <p className="font-semibold">Skills</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {student.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Briefcase className="h-5 w-5 text-brand-600" />
                    <p className="font-semibold">Projects</p>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-600">
                    {student.projects.map((project) => (
                      <li key={project} className="rounded-3xl bg-white p-4 shadow-sm">{project}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">
                <div className="flex items-center gap-3 text-slate-700">
                  <GraduationCap className="h-5 w-5 text-brand-600" />
                  <p className="font-semibold">Career objective</p>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-600">{student.objective}</p>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
                <div className="flex items-center gap-3 text-slate-700">
                  <FileText className="h-5 w-5 text-brand-600" />
                  <p className="font-semibold">Resume status</p>
                </div>
                <div className={`mt-5 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${resumeUploaded ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                  {resumeUploaded ? <BadgeCheck className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  {student.resumeStatus}
                </div>
                <div className="mt-6 space-y-3">
                  <button className="flex w-full items-center justify-center gap-2 rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
                    <FileText className="h-4 w-4" />
                    Resume Preview
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                    <Download className="h-4 w-4" />
                    Download Resume
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetailsPage
