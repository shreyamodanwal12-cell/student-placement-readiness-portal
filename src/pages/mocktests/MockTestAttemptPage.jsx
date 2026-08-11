import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import api from "../../api/api";

function MockTestAttemptPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await api.get(`/mock-tests/${id}`);

        console.log("MOCK TEST:", response.data);

        setTest(response.data.test);
      } catch (error) {
        console.log(
          "MOCK TEST ERROR:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const formattedAnswers = Object.entries(answers).map(
        ([questionId, answer]) => ({
          question_id: Number(questionId),
          answer,
        })
      );

      const response = await api.post(
        `/mock-tests/${id}/submit`,
        {
          answers: formattedAnswers,
        }
      );

      console.log("RESULT:", response.data);

      alert("Mock Test Submitted Successfully");

      navigate("/mock-tests/result", {
        state: response.data.result,
      });
    } catch (error) {
      console.log(
        "SUBMIT TEST ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to submit mock test"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading test...
        </p>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center">
          <h2 className="text-xl font-semibold">
            Mock Test not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
          Mock Test
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          {test.title}
        </h1>

        <p className="mt-2 text-slate-600">
          {test.description}
        </p>
      </div>

      <div className="space-y-6">

        {test.mock_questions?.map((question, index) => (
          <div
            key={question.id}
            className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-premium"
          >

            <div className="flex items-start gap-3">

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                {index + 1}
              </span>

              <h2 className="text-lg font-semibold text-slate-900">
                {question.question}
              </h2>

            </div>

            <div className="mt-6 space-y-3">

              {[
                ["A", question.option_a],
                ["B", question.option_b],
                ["C", question.option_c],
                ["D", question.option_d],
              ].map(([letter, option]) => (

                <label
                  key={letter}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                    answers[question.id] === letter
                      ? "border-brand-500 bg-brand-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >

                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={letter}
                    checked={
                      answers[question.id] === letter
                    }
                    onChange={() =>
                      handleAnswerChange(
                        question.id,
                        letter
                      )
                    }
                  />

                  <span className="font-semibold text-slate-700">
                    {letter}.
                  </span>

                  <span className="text-slate-700">
                    {option}
                  </span>

                </label>

              ))}

            </div>

          </div>
        ))}

      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
      >
        <CheckCircle2 className="h-5 w-5" />

        {submitting
          ? "Submitting..."
          : "Submit Test"}
      </button>

    </div>
  );
}

export default MockTestAttemptPage;