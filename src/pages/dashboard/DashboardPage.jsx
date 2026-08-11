import { useEffect, useState } from "react";
import {
  BookmarkPlus,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
import StatisticCard from "../../components/ui/StatisticCard";
import api from "../../api/api";

function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [readinessScore, setReadinessScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [projectCount, setProjectCount] = useState(0);
  const [achievementCount, setAchievementCount] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);
  const [applicationCount, setApplicationCount] = useState(0);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

 const fetchDashboardData = async () => {
  try {
    setLoading(true);

    // PROFILE
    try {
      const profileResponse = await api.get(
        "/students/profile"
      );

      console.log(
        "DASHBOARD PROFILE:",
        profileResponse.data
      );

      setProfile(profileResponse.data.profile || null);
    } catch (error) {
      console.log(
        "PROFILE ERROR:",
        error.response?.data || error.message
      );
    }

    // READINESS
    try {
      const readinessResponse = await api.get(
        "/students/readiness"
      );

      console.log(
        "DASHBOARD READINESS:",
        readinessResponse.data
      );

      setReadinessScore(
        readinessResponse.data.readiness_score || 0
      );
    } 
    
    
    catch (error) {
      console.log(
        "READINESS ERROR:",
        error.response?.data || error.message
      );
    }
// PROJECTS
try {
  const projectsResponse = await api.get("/projects");

  console.log(
    "DASHBOARD PROJECTS:",
    projectsResponse.data
  );

  setProjectCount(
    projectsResponse.data.projects?.length || 0
  );
} catch (error) {
  console.log(
    "PROJECTS ERROR:",
    error.response?.data || error.message
  );
}


// ACHIEVEMENTS
try {
  const achievementsResponse = await api.get(
    "/achievements"
  );

  console.log(
    "DASHBOARD ACHIEVEMENTS:",
    achievementsResponse.data
  );

  setAchievementCount(
    achievementsResponse.data.achievements?.length || 0
  );
} catch (error) {
  console.log(
    "ACHIEVEMENTS ERROR:",
    error.response?.data || error.message
  );
}

// DOCUMENTS
try {
  const documentsResponse = await api.get("/documents");

  console.log(
    "DASHBOARD DOCUMENTS:",
    documentsResponse.data
  );

  setDocumentCount(
    documentsResponse.data.documents?.length || 0
  );
} catch (error) {
  console.log(
    "DOCUMENTS ERROR:",
    error.response?.data || error.message
  );
}

// APPLICATIONS
try {
  const applicationsResponse = await api.get(
    "/applications/my"
  );

  console.log(
    "DASHBOARD APPLICATIONS:",
    applicationsResponse.data
  );

  setApplicationCount(
    applicationsResponse.data.applications?.length || 0
  );
} catch (error) {
  console.log(
    "APPLICATIONS ERROR:",
    error.response?.data || error.message
  );
}
// NOTIFICATIONS
try {
  const notificationsResponse = await api.get(
    "/notifications"
  );

  console.log(
    "DASHBOARD NOTIFICATIONS:",
    notificationsResponse.data
  );

  const notifications =
    notificationsResponse.data.notifications || [];

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  setUnreadNotificationCount(unreadCount);
} catch (error) {
  console.log(
    "NOTIFICATIONS ERROR:",
    error.response?.data || error.message
  );
}
  } catch (error) {
    console.log(
      "DASHBOARD ERROR:",
      error.response?.data || error.message
    );
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  const student = Array.isArray(profile?.students)
  ? profile.students[0]
  : profile?.students;

  const skills = student?.skills
    ? student.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  const profileFields = [
    student?.phone,
    student?.college_roll,
    student?.branch,
    student?.course,
    student?.semester,
    student?.passing_year,
    student?.cgpa,
    student?.skills,
    student?.linkedin,
    student?.github,
  ];

  const completedFields = profileFields.filter(
    Boolean
  ).length;

  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100
  );

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">
          Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-slate-950">
          Welcome back, {profile?.full_name || "Student"}
        </h1>

        <p className="mt-2 text-slate-600">
          Your placement readiness dashboard
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Review your profile health, resume status,
          skills and next actions in one workspace.
        </p>
      </div>

      {/* READINESS */}
      <div className="rounded-[2rem] bg-brand-600 p-8 text-white shadow-premium">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
          Today's readiness
        </p>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-5xl font-bold">
              {readinessScore}%
            </p>

            <p className="mt-2 text-white/80">
              {readinessScore >= 90
                ? "Placement Ready"
                : readinessScore >= 70
                ? "Almost Ready"
                : "Needs Improvement"}
            </p>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-white/20 sm:w-64">
            <div
              className="h-full rounded-full bg-white transition-all"
              style={{
                width: `${readinessScore}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  <StatisticCard
    label="Profile completion"
    value={`${profileCompletion}%`}
    accent
  />

  <StatisticCard
    label="Resume uploaded"
    value={
      student?.resume_url
        ? "Complete"
        : "Pending"
    }
  />

  <StatisticCard
    label="Skills added"
    value={`${skills.length}`}
  />

  <StatisticCard
    label="Projects"
    value={`${projectCount}`}
  />

  <StatisticCard
  label="Achievements"
  value={`${achievementCount}`}
/>

<StatisticCard
  label="Documents"
  value={`${documentCount}`}
/>
<StatisticCard
  label="Applications"
  value={`${applicationCount}`}
/>
<StatisticCard
  label="Unread notifications"
  value={`${unreadNotificationCount}`}
/>
</div>

      {/* QUICK ACTIONS */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">
            Quick actions
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            Keep your placement profile updated.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

          <a
            href="/profile"
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm text-slate-500">
              Update profile
            </p>

            <p className="mt-3 text-lg font-semibold text-slate-950">
              Personal information
            </p>
          </a>

          <a
            href="/projects"
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm text-slate-500">
              Add new project
            </p>

            <p className="mt-3 text-lg font-semibold text-slate-950">
              Project showcase
            </p>
          </a>

          <a
            href="/resume"
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm text-slate-500">
              Manage resume
            </p>

            <p className="mt-3 text-lg font-semibold text-slate-950">
              Resume status
            </p>
          </a>

        </div>
      </div>

      {/* ACADEMIC SNAPSHOT + MILESTONE */}
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">
                Academic snapshot
              </p>

              <h2 className="mt-3 text-xl font-semibold text-slate-950">
                Your current academic information
              </h2>
            </div>

            <div className="rounded-3xl bg-slate-50 px-4 py-2 text-sm text-slate-700">
              {student?.course || "Course not added"}
            </div>

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                CGPA
              </p>

              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {student?.cgpa || "Not added"}
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                Branch
              </p>

              <p className="mt-2 text-lg font-semibold text-slate-950">
                {student?.branch || "Not added"}
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                Semester
              </p>

              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {student?.semester || "Not added"}
              </p>
            </div>

          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">

          <div className="flex items-center gap-3 text-slate-700">
            <BookmarkPlus className="h-6 w-6 text-brand-600" />

            <p className="font-semibold">
              Next milestone
            </p>
          </div>

          <div className="mt-6 space-y-3">

            <p className="text-sm text-slate-500">
              Keep improving your profile to increase
              your placement readiness.
            </p>

            <div className="rounded-3xl bg-slate-50 p-4">

              <p className="text-sm text-slate-700">
                Profile completion
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-950">
                {profileCompletion}%
              </p>

            </div>

          </div>
        </div>

      </div>

      {/* SIDEBAR */}
      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">

          <div className="flex items-center gap-3 text-slate-700">

            <CalendarCheck className="h-6 w-6 text-brand-600" />

            <p className="font-semibold">
              Placement status
            </p>

          </div>

          <div className="mt-6 rounded-3xl bg-slate-50 p-5">

            <p className="text-sm text-slate-500">
              Current readiness
            </p>

            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {readinessScore}%
            </p>

            <p className="mt-2 text-sm text-slate-600">
              {readinessScore >= 90
                ? "You are placement ready."
                : "Complete more profile sections to improve your score."}
            </p>

          </div>

        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">

          <div className="flex items-center gap-3 text-slate-700">

            <ShieldCheck className="h-6 w-6 text-brand-600" />

            <p className="font-semibold">
              Account status
            </p>

          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            Your account is active and your placement
            profile is connected to the portal.
          </p>

          <div className="mt-5 rounded-3xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              Account
            </p>

            <p className="mt-1 font-semibold text-slate-950">
              {profile?.email || "Email not available"}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;