import { Link } from 'react-router-dom'
import { ArrowRight, Lock, Mail, ShieldCheck, Users } from 'lucide-react'

function CoordinatorLoginPage() {
  return (
    <div className="w-full">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="space-y-6 rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-premium sm:p-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-600">Placement coordinator access</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Sign in to manage student placement readiness</h1>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              Review student progress, monitor profile completion, and coordinate placement readiness from a centralized dashboard.
            </p>
          </div>

          <form className="space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Work email</span>
              <div className="mt-2 flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500/20">
                <Mail className="h-5 w-5 text-slate-400" />
                <input type="email" placeholder="coordinator@college.edu" className="w-full border-none bg-transparent text-sm text-slate-900 outline-none" />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <div className="mt-2 flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500/20">
                <Lock className="h-5 w-5 text-slate-400" />
                <input type="password" placeholder="Enter your password" className="w-full border-none bg-transparent text-sm text-slate-900 outline-none" />
              </div>
            </label>

            <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                Keep me signed in
              </label>
              <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">Student login</Link>
            </div>

            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-brand-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-700">
              Continue to coordinator workspace
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-premium sm:p-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-3xl bg-white/10 px-4 py-2 text-sm text-slate-200">
              <Users className="h-5 w-5 text-brand-400" />
              Coordinator workspace
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">A focused view of every student’s placement journey.</h2>
            <p className="max-w-lg text-sm leading-7 text-slate-300">
              Coordinate profile updates, monitor readiness progress, and support students with a clear overview of their placement preparation.
            </p>
          </div>

          <div className="mt-8 space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="rounded-3xl bg-slate-900/70 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Quick overview</p>
              <p className="mt-3 text-sm leading-6 text-slate-200">
                Track completed profiles, pending documentation, and resumes uploaded without leaving the coordinator workspace.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Centralized student view</p>
                <p className="mt-2 text-slate-400">Manage student records from one professional dashboard.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Placement-ready insights</p>
                <p className="mt-2 text-slate-400">Monitor readiness scores and next best actions for each student.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-white/5 px-5 py-4 text-sm text-slate-400">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-brand-400" />
              <span>Secure coordinator access for placement operations and student oversight.</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CoordinatorLoginPage
