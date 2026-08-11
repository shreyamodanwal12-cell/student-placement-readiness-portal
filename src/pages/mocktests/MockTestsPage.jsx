import { useEffect, useState } from "react";
import { Clock3, FileQuestion, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function MockTestsPage() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMockTests = async () => {
      try {
        const response = await api.get("/mock-tests");

        console.log("MOCK TESTS:", response.data);

        setTests(response.data.tests || []);
      } catch (error) {
        console.log(
          "MOCK TEST ERROR:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMockTests();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">Loading mock tests...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
          Practice & Assessment
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Mock Tests
        </h1>

        <p className="mt-2 text-slate-600">
          Test your knowledge and prepare yourself for placement interviews.
        </p>
      </div>

      {tests.length === 0 ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-premium">
          <FileQuestion className="mx-auto h-10 w-10 text-slate-400" />

          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            No mock tests available
          </h2>

          <p className="mt-2 text-slate-500">
            New mock tests will appear here when they are added by the
            coordinator.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {tests.map((test) => (
            <div
              key={test.id}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-premium transition hover:-translate-y-1"
            >
              <h2 className="text-xl font-bold text-slate-950">
                {test.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {test.description || "Practice test for placement preparation."}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock3 className="h-4 w-4" />
                    <span className="text-xs">Duration</span>
                  </div>

                  <p className="mt-1 font-semibold text-slate-900">
                    {test.duration} minutes
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FileQuestion className="h-4 w-4" />
                    <span className="text-xs">Questions</span>
                  </div>

                  <p className="mt-1 font-semibold text-slate-900">
                    {test.total_questions}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate(`/mock-tests/${test.id}`)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
              >
                Start Test
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MockTestsPage;