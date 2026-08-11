import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import WorkspaceSidebar from './WorkspaceSidebar'

function WorkspaceLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden shrink-0 border-r border-slate-200 bg-white/95 shadow-[12px_0_40px_rgba(15,23,42,0.06)] backdrop-blur lg:flex lg:flex-col ${
          collapsed ? 'w-24' : 'w-72'
        }`}
      >
        <WorkspaceSidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((value) => !value)}
          onCloseMobile={() => setMobileOpen(false)}
        />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <WorkspaceSidebar
          collapsed={false}
          onToggleCollapse={() => setCollapsed((value) => !value)}
          onCloseMobile={() => setMobileOpen(false)}
        />
      </aside>

      {/* Main content */}
      <div
        className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ${
          collapsed ? 'lg:pl-24' : 'lg:pl-72'
        }`}
      >

        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Workspace
                </p>

                <h1 className="text-lg font-semibold text-slate-900">
                  Student Placement Readiness
                </h1>
              </div>
            </div>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>

          </div>
        </header>

        {/* ⭐ VERY IMPORTANT */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default WorkspaceLayout