import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import api from "../../api/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const [rememberMe, setRememberMe] = useState(false);
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    alert("Login Successful");

    if (response.data.user.role === "admin") {
  navigate("/coordinator-dashboard");
} else {
  navigate("/dashboard");
}
  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
};

  return (
    <div className="min-h-screen bg-soft text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col px-6 py-10 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <section className="space-y-6 rounded-[2rem] border border-slate-200 bg-white/95 p-10 shadow-premium">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-600">Student access</p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Login to your readiness workspace</h1>
              <p className="max-w-xl text-sm leading-7 text-slate-600">
                Enter your credentials to continue managing your placement profile, resume uploads, and readiness score.
              </p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <div className="mt-2 flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500/20">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full border-none bg-transparent text-sm text-slate-900 outline-none"
/>
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <div className="mt-2 flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500/20">
                  <Lock className="h-5 w-5 text-slate-400" />
                  <input
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full border-none bg-transparent text-sm text-slate-900 outline-none"
/>
                </div>
              </label>

              <div className="flex items-center justify-between gap-4 text-sm text-slate-600 sm:text-base">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <Link to="/" className="font-semibold text-brand-600 hover:text-brand-700">Forgot password?</Link>
              </div>

              <button type="submit" className="inline-flex w-full items-center justify-center rounded-3xl bg-brand-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-700">
                Continue to dashboard
              </button>
            </form>
            <p className="text-center text-sm text-slate-500">
              New here?{' '}
              <Link to="/register" className="font-semibold text-slate-900 hover:text-brand-600">
                Create account
              </Link>
            </p>
          </section>

          <section className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-950 p-10 text-white shadow-premium">
            <div className="space-y-5">
              <div className="inline-flex rounded-3xl bg-white/10 px-4 py-2 text-sm text-slate-200">
                Designed for high performers
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Confidence starts with a premium profile.</h2>
              <p className="max-w-md text-sm leading-7 text-slate-300">
                Access a tailored student placement experience with modern tracking, resume guidance, and readiness analytics.
              </p>
            </div>
            <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Placement score</p>
                  <p className="mt-2 text-2xl font-semibold text-white">94 / 100</p>
                </div>
                <div className="rounded-3xl bg-brand-600/10 px-4 py-2 text-sm font-semibold text-brand-100">On track</div>
              </div>
              <div className="rounded-3xl bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Mock interview feedback</p>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  Personalized recommendations for resume polish, project storytelling and soft skills messaging.
                </p>
              </div>
            </div>
            <div className="rounded-3xl bg-white/5 px-5 py-4 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-brand-400" />
                <span>Secure student data preview and onboarding guidance.</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
