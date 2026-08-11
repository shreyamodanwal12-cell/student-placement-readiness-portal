function FeatureCard({ title, description, icon }) {
  return (
    <div className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-premium">
      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-50 text-brand-600 shadow-sm transition group-hover:bg-brand-100">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  )
}

export default FeatureCard
