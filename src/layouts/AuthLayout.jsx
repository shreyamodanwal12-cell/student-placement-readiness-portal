import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function AuthLayout() {
  return (
    <div className="min-h-screen bg-soft text-slate-950">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col px-6 py-10 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout
