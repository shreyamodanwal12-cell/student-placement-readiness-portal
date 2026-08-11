import { useEffect, useState } from "react";
import api from "../../api/api";
import BackButton from "../../components/ui/BackButton";
function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [readinessScore, setReadinessScore] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
    fetchReadiness();
  }, []);

  // ---------------- GET PROFILE ----------------
  const fetchProfile = async () => {
    try {
      const response = await api.get("/students/profile");

      console.log("PROFILE RESPONSE:", response.data);

      const fetchedProfile = response.data.profile;

      setProfile(fetchedProfile);

      const student = fetchedProfile.students?.[0];

      setFormData({
        phone: student?.phone || "",
        college_roll: student?.college_roll || "",
        branch: student?.branch || "",
        course: student?.course || "",
        semester: student?.semester || "",
        passing_year: student?.passing_year || "",
        cgpa: student?.cgpa || "",
        skills: student?.skills || "",
        linkedin: student?.linkedin || "",
        github: student?.github || "",
      });
    } catch (error) {
      console.log(
        "PROFILE ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // ---------------- GET READINESS ----------------
  const fetchReadiness = async () => {
    try {
      const response = await api.get("/students/readiness");

      console.log("READINESS RESPONSE:", response.data);

      setReadinessScore(response.data.readiness_score);
    } catch (error) {
      console.log(
        "READINESS ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // ---------------- INPUT CHANGE ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- SAVE PROFILE ----------------
  const handleSave = async () => {
    try {
      const response = await api.put(
        "/students/profile",
        formData
      );

      console.log("UPDATE PROFILE:", response.data);

      alert("Profile Updated Successfully");

      setIsEditing(false);

      // Refresh profile data
      await fetchProfile();

      // Refresh readiness score
      await fetchReadiness();
    } catch (error) {
      console.log(
        "UPDATE PROFILE ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Profile Update Failed"
      );
    }
  };

  // ---------------- LOADING ----------------
  if (!profile) {
    return (
      <div className="p-8">
        Loading profile...
      </div>
    );
  }

  const student = profile.students?.[0];

  // ---------------- UI ----------------
  return (
    
    <div className="p-8">
      <BackButton />

    <h1 className="text-3xl font-semibold text-slate-950">
      My Profile
    </h1>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">
            My Profile
          </h1>

          <p className="mt-2 text-slate-600">
            Welcome, {profile.full_name}
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* PERSONAL INFORMATION */}

      <div className="mt-8 rounded-2xl bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">
          Personal Information
        </h2>

        <p className="mt-4">
          <strong>Name:</strong>{" "}
          {profile.full_name}
        </p>

        <p className="mt-2">
          <strong>Email:</strong>{" "}
          {profile.email}
        </p>

        <p className="mt-2">
          <strong>Role:</strong>{" "}
          {profile.role}
        </p>
      </div>

      {/* STUDENT INFORMATION */}

      <div className="mt-6 rounded-2xl bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">
          Student Information
        </h2>

        {!isEditing ? (
          /* -------- NORMAL VIEW -------- */
          <div className="mt-4">
            <p>
              <strong>Roll No:</strong>{" "}
              {student?.college_roll || "Not added"}
            </p>

            <p className="mt-2">
              <strong>Branch:</strong>{" "}
              {student?.branch || "Not added"}
            </p>

            <p className="mt-2">
              <strong>Course:</strong>{" "}
              {student?.course || "Not added"}
            </p>

            <p className="mt-2">
              <strong>Semester:</strong>{" "}
              {student?.semester || "Not added"}
            </p>

            <p className="mt-2">
              <strong>Passing Year:</strong>{" "}
              {student?.passing_year || "Not added"}
            </p>

            <p className="mt-2">
              <strong>CGPA:</strong>{" "}
              {student?.cgpa || "Not added"}
            </p>

            <p className="mt-2">
              <strong>Phone:</strong>{" "}
              {student?.phone || "Not added"}
            </p>

            <p className="mt-2">
              <strong>Skills:</strong>{" "}
              {student?.skills || "Not added"}
            </p>

            <p className="mt-2">
              <strong>LinkedIn:</strong>{" "}
              {student?.linkedin || "Not added"}
            </p>

            <p className="mt-2">
              <strong>GitHub:</strong>{" "}
              {student?.github || "Not added"}
            </p>

            <p className="mt-2">
              <strong>Readiness Score:</strong>{" "}
              {readinessScore}%
            </p>
          </div>
        ) : (
          /* -------- EDIT VIEW -------- */
          <div className="mt-6 space-y-4">

            <input
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              name="college_roll"
              value={formData.college_roll || ""}
              onChange={handleChange}
              placeholder="College Roll Number"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              name="branch"
              value={formData.branch || ""}
              onChange={handleChange}
              placeholder="Branch"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              name="course"
              value={formData.course || ""}
              onChange={handleChange}
              placeholder="Course"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              name="semester"
              value={formData.semester || ""}
              onChange={handleChange}
              placeholder="Semester"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              name="passing_year"
              value={formData.passing_year || ""}
              onChange={handleChange}
              placeholder="Passing Year"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              name="cgpa"
              value={formData.cgpa || ""}
              onChange={handleChange}
              placeholder="CGPA"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              name="skills"
              value={formData.skills || ""}
              onChange={handleChange}
              placeholder="Skills"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              name="linkedin"
              value={formData.linkedin || ""}
              onChange={handleChange}
              placeholder="LinkedIn URL"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              name="github"
              value={formData.github || ""}
              onChange={handleChange}
              placeholder="GitHub URL"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />

            {/* BUTTONS */}

            <div className="flex gap-3 pt-4">

              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);

                  // Reset form to existing data
                  setFormData({
                    phone: student?.phone || "",
                    college_roll:
                      student?.college_roll || "",
                    branch: student?.branch || "",
                    course: student?.course || "",
                    semester: student?.semester || "",
                    passing_year:
                      student?.passing_year || "",
                    cgpa: student?.cgpa || "",
                    skills: student?.skills || "",
                    linkedin:
                      student?.linkedin || "",
                    github: student?.github || "",
                  });
                }}
                className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;