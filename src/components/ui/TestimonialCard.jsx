function TestimonialCard({ quote, author, role }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card transition hover:-translate-y-1 hover:shadow-premium">
      <p className="text-base leading-8 text-slate-700">“{quote}”</p>
      <div className="mt-6 space-y-1">
        <p className="font-semibold text-slate-950">{author}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
    </div>
  )
}

export default TestimonialCard
