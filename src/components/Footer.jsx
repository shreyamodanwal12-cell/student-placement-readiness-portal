function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-xl space-y-4">
          <p className="text-2xl font-semibold text-slate-950">Placement Portal</p>
          <p className="max-w-md text-sm leading-6 text-slate-600">
            Build a career-ready placement profile with confidence. Every section is designed to present your achievements clearly and professionally.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          <div className="space-y-3 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Product</p>
            <a href="#features" className="block hover:text-slate-900">Features</a>
            <a href="#benefits" className="block hover:text-slate-900">Benefits</a>
            <a href="#contact" className="block hover:text-slate-900">Contact</a>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Company</p>
            <a href="#" className="block hover:text-slate-900">About</a>
            <a href="#" className="block hover:text-slate-900">Careers</a>
            <a href="#" className="block hover:text-slate-900">Press</a>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Support</p>
            <a href="#" className="block hover:text-slate-900">Help Center</a>
            <a href="#" className="block hover:text-slate-900">Terms</a>
            <a href="#" className="block hover:text-slate-900">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
