import { useEffect, useState } from "react";
import api from "../../api/api";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Target,
  Loader2,
} from "lucide-react";

function MockTestResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/mock-tests/results");

        console.log("MOCK RESULTS:", response.data);

        setResults(response.data.results || []);
      } catch (error) {
        console.log(
          "MOCK RESULTS ERROR:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
            "Failed to load mock test results"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* Header */}
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

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-12 shadow-premium">
          <div className="flex items-center gap-3 text-slate-600">
            <Loader2 className="h-6 w-6 animate-spin" />
            Loading results...
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      )}

      {/* No Results */}
      {!loading && !error && results.length === 0 && (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-premium">
          <Trophy className="mx-auto h-12 w-12 text-slate-300" />

          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            No Mock Test Results Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Student mock test results will appear here after they
            complete a test.
          </p>
        </div>
      )}

      {/* Results */}
      {!loading && !error && results.length > 0 && (
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-premium">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">

              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Mock Test
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Score
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Correct
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Wrong
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Percentage
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Submitted
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {results.map((result) => {

                  const student = result.students;
                  const mockTest = result.mock_tests;

                  return (
                    <tr
                      key={result.id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* Student */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700">
                            {student?.college_roll
                              ? student.college_roll
                                  .substring(0, 2)
                                  .toUpperCase()
                              : "ST"}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {student?.users?.full_name || `Student #${student?.id || "-"}`}
                            </p>

                            <p className="text-xs text-slate-500">
                              {student?.college_roll || "Roll number unavailable"}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* Mock Test */}
                      <td className="px-6 py-5">

                        <p className="font-semibold text-slate-900">
                          {mockTest?.title || "Unknown Test"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {mockTest?.description || "Mock Assessment"}
                        </p>

                      </td>

                      {/* Score */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-brand-600" />

                          <span className="font-bold text-slate-900">
                            {result.score} / {result.total_marks}
                          </span>
                        </div>

                      </td>

                      {/* Correct */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-emerald-600">
                          <CheckCircle2 className="h-4 w-4" />

                          <span className="font-semibold">
                            {result.correct_answers}
                          </span>
                        </div>

                      </td>

                      {/* Wrong */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-red-600">
                          <XCircle className="h-4 w-4" />

                          <span className="font-semibold">
                            {result.wrong_answers}
                          </span>
                        </div>

                      </td>

                      {/* Percentage */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-blue-600" />

                          <span
                            className={`font-bold ${
                              Number(result.percentage) >= 80
                                ? "text-emerald-600"
                                : Number(result.percentage) >= 60
                                ? "text-blue-600"
                                : Number(result.percentage) >= 40
                                ? "text-amber-600"
                                : "text-red-600"
                            }`}
                          >
                            {result.percentage}%
                          </span>
                        </div>

                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {result.submitted_at
                          ? new Date(
                              result.submitted_at
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
}

export default MockTestResultsPage;