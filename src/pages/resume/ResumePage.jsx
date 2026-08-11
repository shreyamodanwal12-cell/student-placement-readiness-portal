import { useEffect, useState } from "react";
import {
  FileCheck,
  UploadCloud,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import api from "../../api/api";
import BackButton from "../../components/ui/BackButton";

function ResumePage() {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // ---------------- GET PROFILE ----------------
  const fetchResume = async () => {
    try {
      const response = await api.get("/students/profile");

      console.log("PROFILE RESPONSE:", response.data);

      const student = response.data.profile?.students?.[0];

      setResumeUrl(student?.resume_url || null);
    } catch (error) {
      console.log(
        "RESUME FETCH ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  // ---------------- SELECT FILE ----------------
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Only PDF allowed
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file only.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);

    console.log("Selected Resume:", file);
  };

  // ---------------- UPLOAD RESUME ----------------
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a PDF resume first.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("resume", selectedFile);

      const response = await api.put(
        "/students/resume",
        formData
      );

      console.log("UPLOAD RESPONSE:", response.data);

      alert("Resume Uploaded Successfully");

      setSelectedFile(null);

      // Refresh resume
      await fetchResume();
    } catch (error) {
      console.log(
        "UPLOAD ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Resume Upload Failed"
      );
    } finally {
      setUploading(false);
    }
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="p-8">
        Loading resume...
      </div>
    );
  }

  return (
    <div className="p-8">

      {/* BACK BUTTON */}
      <BackButton />

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-950">
          Resume
        </h1>

        <p className="mt-2 text-slate-600">
          Upload and manage your latest placement resume.
        </p>
      </div>

      {/* STATUS + LAST UPDATED */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div className="rounded-[1.75rem] bg-slate-50 p-6">
          <div className="flex items-center gap-3 text-brand-600">
            <FileCheck className="h-5 w-5" />

            <p className="text-sm font-semibold uppercase tracking-[0.28em]">
              Status
            </p>
          </div>

          <p className="mt-4 text-4xl font-semibold text-slate-950">
            {resumeUrl ? "Uploaded" : "Not Uploaded"}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {resumeUrl
              ? "Your resume is available for placement tracking."
              : "Upload your resume to improve your placement readiness."}
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
            Current Resume
          </p>

          <p className="mt-4 text-xl font-semibold text-slate-950">
            {resumeUrl
              ? "Resume Available"
              : "No Resume Added"}
          </p>

          {resumeUrl && (
            <a
              href={`http://localhost:5000${resumeUrl}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              View Resume →
            </a>
          )}
        </div>
      </div>

      {/* UPLOAD SECTION */}
      <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow">

        <div className="flex items-center gap-3 text-slate-700">
          <UploadCloud className="h-6 w-6 text-brand-600" />

          <div>
            <p className="font-semibold">
              Upload Latest Resume
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Only PDF files are allowed.
            </p>
          </div>
        </div>

        {/* FILE INPUT */}
        <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">

          <input
            id="resume"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="resume"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
          >
            <UploadCloud className="h-5 w-5" />
            Choose PDF
          </label>

          {selectedFile && (
            <p className="mt-4 text-sm font-medium text-slate-700">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        {/* UPLOAD BUTTON */}
        <button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="mt-6 w-full rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading
            ? "Uploading..."
            : "Upload Resume"}
        </button>
      </div>

      {/* RESUME PREVIEW */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow">

          <div className="flex items-center gap-3 text-slate-700">
            <ClipboardList className="h-5 w-5 text-brand-600" />

            <p className="font-semibold">
              Resume Preview
            </p>
          </div>

          {resumeUrl ? (
            <div className="mt-6">
              <p className="text-sm text-slate-600">
                Your uploaded resume is ready.
              </p>

              <a
                href={`http://localhost:5000${resumeUrl}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
              >
                Open Resume
              </a>
            </div>
          ) : (
            <p className="mt-6 text-sm text-slate-500">
              No resume uploaded yet.
            </p>
          )}
        </div>

        {/* QUICK INSIGHTS */}
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow">

          <div className="flex items-center gap-3 text-slate-700">
            <Sparkles className="h-5 w-5 text-brand-600" />

            <p className="font-semibold">
              Quick Insights
            </p>
          </div>

          <ul className="mt-6 space-y-4 text-sm text-slate-600">

            <li className="rounded-3xl bg-white p-4">
              Keep your resume updated.
            </li>

            <li className="rounded-3xl bg-white p-4">
              Highlight measurable project impact.
            </li>

            <li className="rounded-3xl bg-white p-4">
              Keep the resume concise and recruiter-friendly.
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}

export default ResumePage;