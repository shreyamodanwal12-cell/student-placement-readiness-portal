function StatisticCard({ label, value, accent }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-card">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-3 text-3xl font-semibold ${accent ? 'text-brand-600' : 'text-slate-950'}`}>{value}</p>
    </div>
  )
}

export default StatisticCard
