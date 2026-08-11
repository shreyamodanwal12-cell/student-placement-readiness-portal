import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Jobs', to: '/jobs' },
  { label: 'Mock Tests', to: '/mock-tests' },
  { label: 'Profile', to: '/profile' },
  { label: 'Resources', to: '/resources' },
  { label: 'Resume', to: '/resume' },
  { label: 'Settings', to: '/settings' }
]
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-3 text-lg font-semibold text-slate-950">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-500/20">S</span>
          <span>Placement Portal</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} className="text-sm font-medium text-slate-700 transition hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className="rounded-2xl px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
            Login
          </Link>
          <Link to="/register" className="rounded-2xl bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/15 transition hover:bg-brand-700">
            Register
          </Link>
        </div>

        <button type="button" className="inline-flex items-center rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 transition hover:bg-slate-50 md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white/98 px-6 py-6 shadow-xl md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-100">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3">
            <Link to="/login" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
              Login
            </Link>
            <Link to="/register" className="rounded-2xl bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-700">
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
