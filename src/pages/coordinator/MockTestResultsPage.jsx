function MockTestResultsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
          Assessment Management
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Mock Test Results
        </h1>

        <p className="mt-2 text-slate-600">
          View student mock test performance and assessment results.
        </p>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-premium">
        <h2 className="text-xl font-semibold text-slate-900">
          Mock Test Results
        </h2>

        <p className="mt-2 text-slate-500">
          Student results will appear here.
        </p>
      </div>
    </div>
  );
}

export default MockTestResultsPage;