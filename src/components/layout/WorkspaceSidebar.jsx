import { Link, useLocation } from 'react-router-dom'
import {
  BellRing,
  FileText,
  FolderKanban,
  Home,
  LogOut,
  PanelsTopLeft,
  Settings,
  Sparkles,
  Trophy,
  UserCircle2,
  FileStack,
  PanelLeftClose,
  PanelLeftOpen,
  FileQuestion
} from 'lucide-react'

const navItems = [
  { label: 'My Profile', to: '/profile', icon: UserCircle2 },
  { label: 'Resume', to: '/resume', icon: FileText },
  { label: 'Skills', to: '/skills', icon: Sparkles },
  { label: 'Projects', to: '/projects', icon: FolderKanban },
  { label: 'Achievements', to: '/achievements', icon: Trophy },
  { label: 'Documents', to: '/documents', icon: FileStack },
   { label: 'Mock Tests', to: '/mock-tests', icon: FileQuestion },
  { label: 'Notifications', to: '/notifications', icon: BellRing },
  { label: 'Settings', to: '/settings', icon: Settings },
  { label: 'Logout', to: '/login', icon: LogOut }
]

function WorkspaceSidebar({ collapsed, onToggleCollapse, onCloseMobile }) {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 py-4 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/20">
            <PanelsTopLeft className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Student hub</p>
              <p className="text-sm font-semibold text-slate-900">Placement Portal</p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:bg-slate-100 lg:inline-flex"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      <nav className="mt-4 flex-1 space-y-2 px-3 lg:px-4">
        {navItems.map((item) => {
          const active = isActive(item.to)
          const Icon = item.icon

          return (
            <Link
              key={item.label}
              to={item.to}
              onClick={onCloseMobile}
              className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/15'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${collapsed ? 'justify-center px-2' : ''}`}
            >
              <Icon className={`h-5 w-5 shrink-0 ${active ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className={`border-t border-slate-200 px-4 py-4 ${collapsed ? 'px-2' : ''}`}>
        <div className={`rounded-3xl bg-slate-50 p-4 ${collapsed ? 'px-2 py-3' : ''}`}>
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-sm font-semibold text-brand-700">AS</div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold text-slate-900">Aarav Singh</p>
                <p className="text-xs text-slate-500">Final year • CSE</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceSidebar
