function FAQItem({ question, answer }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
      <p className="font-semibold text-slate-950">{question}</p>
      <p className="mt-3 text-sm leading-7 text-slate-600">{answer}</p>
    </div>
  )
}

export default FAQItem
