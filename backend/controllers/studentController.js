const supabase = require("../config/supabase");

const getProfile = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select(`
        id,
        full_name,
        email,
        role,
        students (
          id,
          phone,
          college_roll,
          branch,
          course,
          semester,
          passing_year,
          cgpa,
          skills,
          linkedin,
          github,
          resume_url,
          readiness_score
        )
      `)
      .eq("id", req.user.id)
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      profile: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const updateProfile = async (req, res) => {
  try {
   const {
  phone,
  college_roll,
  branch,
  course,
  semester,
  passing_year,
  cgpa,
  skills,
  linkedin,
  github
} = req.body;

    // Check if profile already exists
    const { data: existingStudent } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", req.user.id)
      .single();

    let result;

    if (existingStudent) {
      result = await supabase
        .from("students")
    .update({
  phone,
  college_roll,
  branch,
  course,
  semester,
  passing_year,
  cgpa,
  skills,
  linkedin,
  github,
})
        .eq("user_id", req.user.id)
        .select();
    } else {
      result = await supabase
        .from("students")
       .insert([
  {
    user_id: req.user.id,
    phone,
    college_roll,
    branch,
    course,
    semester,
    passing_year,
    cgpa,
    skills,
    linkedin,
    github,
  },

        ])
        .select();
    }

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      data: result.data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//----------------------upload resume
const uploadResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume",
      });
    }

    const resume_url = `/uploads/${req.file.filename}`;

    const { data: existingStudent } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", req.user.id)
      .single();

    let result;

    if (existingStudent) {
      result = await supabase
        .from("students")
        .update({
          resume_url,
        })
        .eq("user_id", req.user.id)
        .select();
    } else {
      result = await supabase
        .from("students")
        .insert([
          {
            user_id: req.user.id,
            resume_url,
          },
        ])
        .select();
    }

    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume Uploaded Successfully",
      data: result.data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//-------------------------getrezdiness score
const getReadinessScore = async (req, res) => {
  try {
    const { data: student, error } = await supabase
      .from("students")
      .select("*")
      .eq("user_id", req.user.id)
      .single();

    if (error || !student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    let score = 0;

    if (student.phone) score += 10;
    if (student.resume_url) score += 20;
    if (student.skills) score += 20;
    if (student.cgpa) score += 20;
    if (student.github) score += 15;
    if (student.linkedin) score += 15;

    // Save score in database
    await supabase
      .from("students")
      .update({
        readiness_score: score,
      })
      .eq("user_id", req.user.id);

    let status = "";

    if (score >= 90) {
      status = "Placement Ready";
    } else if (score >= 70) {
      status = "Almost Ready";
    } else {
      status = "Needs Improvement";
    }

    res.status(200).json({
      success: true,
      readiness_score: score,
      status,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Students (Admin)
const getAllStudents = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("students")
      .select(`
        id,
        college_roll,
        branch,
        semester,
        readiness_score,
        resume_url,
        users (
          full_name,
          email
        )
      `)
      .order("id", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      students: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadResume,
  getReadinessScore,
  getAllStudents,
};