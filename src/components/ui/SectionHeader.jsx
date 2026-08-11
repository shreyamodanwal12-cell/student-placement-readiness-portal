function SectionHeader({ eyebrow, title, description, className = '' }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">{eyebrow}</p>}
      {title && <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>}
      {description && <p className="max-w-2xl text-base leading-8 text-slate-600">{description}</p>}
    </div>
  )
}

export default SectionHeader
