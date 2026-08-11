import { Link } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'
import FeatureCard from '../components/ui/FeatureCard'
import StatisticsSection from '../components/ui/StatisticsSection'
import TestimonialCard from '../components/ui/TestimonialCard'
import FAQItem from '../components/ui/FAQItem'
import { FileCheck, Sparkles, Trophy, Rocket, ShieldCheck, Users } from 'lucide-react'

const features = [
  {
    title: 'Profile mastery',
    description: 'Build a polished placement profile with sections that reflect campus recruiter expectations.',
    icon: <FileCheck size={20} />,
  },
  {
    title: 'Resume readiness',
    description: 'Track resume uploads, replace drafts, and verify your resume status with clear feedback.',
    icon: <ShieldCheck size={20} />,
  },
  {
    title: 'Skill spotlight',
    description: 'Showcase your technical and soft skills with validated proficiency indicators and scorecards.',
    icon: <Sparkles size={20} />,
  },
]

const testimonials = [
  {
    quote: 'The portal made my placement journey feel calm and organized. Every update increased my confidence.',
    author: 'Nina Patel',
    role: 'CSE Student, 2026 Batch',
  },
  {
    quote: 'I loved how the readiness score surfaced the exact areas I needed to improve before interviews.',
    author: 'Rahul Singh',
    role: 'ECE Student, 2026 Batch',
  },
]

const faqs = [
  {
    question: 'Who is this portal built for?',
    answer: 'Students preparing for campus placements who want a complete, premium ready-to-share profile.',
  },
  {
    question: 'Can I update my profile anytime?',
    answer: 'Yes, the dashboard is designed for continuous updates as your projects and skills evolve.',
  },
  {
    question: 'Is this a real application interface?',
    answer: 'Yes, the UI is a frontend-only experience with realistic data and premium interactions.',
  },
]

function HomePage() {
  return (
    <div className="min-h-screen bg-soft text-slate-900">
      <main className="relative overflow-hidden">
        <section className="relative mx-auto max-w-7xl px-6 pt-10 pb-16 lg:px-8 lg:pt-16">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur">
                Launch campus-ready careers with a polished student profile.
              </div>
              <div className="space-y-6">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Student placement readiness, designed like a premium SaaS product.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Manage every detail recruiters care about—from skills and projects to resume uploads and readiness analytics—all in one modern portal.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/register" className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:-translate-y-0.5 hover:bg-brand-700">
                  Start building profile
                </Link>
                <a href="#features" className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50">
                  Explore features
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <FeatureCard title="Resume-ready" description="Quick resume uploads and status verification." icon={<FileCheck size={20} />} />
                <FeatureCard title="Mock interview prep" description="Practice questions and feedback for campus interviews." icon={<Rocket size={20} />} />
                <FeatureCard title="Recruiter insights" description="See what recruiters care about for each profile section." icon={<Users size={20} />} />
              </div>
            </div>
            <div className="relative rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-premium">
              <div className="absolute inset-x-0 top-0 h-1 rounded-full bg-gradient-to-r from-brand-500 via-accent to-sky-400"></div>
              <div className="space-y-6 pt-5">
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-inner">
                  <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-50 via-white to-slate-100 p-6">
                    <div className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-brand-200/60 blur-2xl" />
                    <div className="absolute -right-8 bottom-10 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
                    <div className="h-72 rounded-[28px] bg-slate-100 shadow-inner" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Live readiness</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-950">89%</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Applied roles</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-950">34</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <SectionHeader
            eyebrow="Features"
            title="Everything a student needs to launch a placement-ready profile"
            description="A high-end dashboard experience built around skills, projects, and recruiter-ready readiness signals."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} />
            ))}
          </div>
        </section>

        <section id="benefits" className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-premium">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">How it works</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">A guided process for placement readiness.</h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                From profile basics to resume validation, each step is laid out clearly so students can focus on meaningful progress instead of guessing what comes next.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-lg font-semibold text-slate-950">1</p>
                  <p className="mt-3 text-sm text-slate-600">Complete your profile</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-lg font-semibold text-slate-950">2</p>
                  <p className="mt-3 text-sm text-slate-600">Upload resume and projects</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-lg font-semibold text-slate-950">3</p>
                  <p className="mt-3 text-sm text-slate-600">Track readiness progress</p>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-10 text-white shadow-premium">
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Student benefits</p>
                <h3 className="mt-5 text-3xl font-semibold text-white">A premium workspace for every stage.</h3>
                <ul className="mt-8 space-y-4 text-sm text-slate-300">
                  <li>High-impact profile sections designed for recruiters.</li>
                  <li>Clear guidance on missing information and readiness gaps.</li>
                  <li>Rich analytics for skills, projects, and interviews.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <SectionHeader eyebrow="Placement readiness" title="Track your growth with clarity and momentum." description="A dashboard built to surface the most valuable placement signals first." />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-50 text-brand-600">
                <Trophy size={20} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-950">Readiness score</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">Understand how complete your placement profile appears to recruiters.</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-50 text-brand-600">
                <Rocket size={20} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-950">Action plan</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">Get clear next steps for skills, projects, and resume improvement.</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-50 text-brand-600">
                <Users size={20} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-950">Recruiter ready</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">Keep profile sections aligned with the latest placement expectations.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <SectionHeader eyebrow="Testimonials" title="Students love the clarity and premium polish." description="Real campus candidates shared their experience with the readiness workflow." />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {testimonials.map((item) => (
              <TestimonialCard key={item.author} quote={item.quote} author={item.author} role={item.role} />
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-premium">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Contact</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Ready to set up your placement profile?</h2>
              <p className="max-w-xl text-base leading-8 text-slate-600">
                Jump into a highly polished front-end experience that feels like a true enterprise SaaS product.
              </p>
              <Link to="/register" className="inline-flex rounded-3xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
                Start for free
              </Link>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-10 text-white shadow-premium">
              <div className="space-y-5">
                <div className="rounded-3xl bg-slate-900/80 p-6 text-sm">
                  <p className="font-semibold text-white">Need a demo?</p>
                  <p className="mt-3 text-slate-400">Our interface is ready for placement-ready storytelling and recruiter-facing polish.</p>
                </div>
                <div className="grid gap-4 text-sm text-slate-300">
                  <div className="rounded-3xl bg-slate-900/80 p-5">
                    <p className="font-semibold text-white">Email</p>
                    <p className="mt-2 text-slate-400">hello@placementportal.com</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/80 p-5">
                    <p className="font-semibold text-white">Support</p>
                    <p className="mt-2 text-slate-400">support@placementportal.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-premium">
            <SectionHeader eyebrow="FAQ" title="Frequently asked questions" description="Everything students need to know about the portal experience." />
            <div className="grid gap-4 md:grid-cols-3">
              {faqs.map((item) => (
                <FAQItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
