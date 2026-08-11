import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Profile", to: "/profile" },
  { label: "Resume", to: "/resume" },
  { label: "Settings", to: "/settings" },
];

function WorkspaceNav() {
  const location = useLocation()

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-card">
      <nav className="flex flex-wrap gap-3">
        {navItems.map((item) => {
          const active = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                active
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/15'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default WorkspaceNav
