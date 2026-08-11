import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

function RegisterPage() {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", {
        full_name,
        email,
        password,
        role: "student",
      });

      console.log("REGISTER RESPONSE:", response.data);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(
        "REGISTER ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Registration Form */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">
                Get started
              </p>

              <h1 className="mt-3 text-3xl font-semibold text-slate-950">
                Create a placement-ready student profile.
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Create your account to start your placement journey.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Full Name */}
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Full name
                </span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={full_name}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500"
                />
              </label>

              {/* Email */}
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Email address
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500"
                />
              </label>

              {/* Password */}
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Create password
                </span>

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  minLength={6}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500"
                />
              </label>

              {/* Button */}
              <button
                type="submit"
                className="w-full rounded-3xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
              >
                Create account
              </button>

            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-brand-600"
              >
                Login
              </Link>
            </p>

          </section>

          {/* Right Side */}
          <section className="rounded-[2rem] bg-slate-950 p-10 text-white shadow-premium">

            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Fresh profile onboarding
            </p>

            <h2 className="mt-5 text-3xl font-semibold">
              Start your placement journey.
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              Create your student account and complete your
              academic profile, skills, projects and resume.
            </p>

          </section>

        </div>

      </div>
    </div>
  );
}

export default RegisterPage;