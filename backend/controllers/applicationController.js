const supabase = require("../config/supabase");

// Apply Job
const applyJob = async (req, res) => {
  try {
    const { job_id } = req.body;

    // Validation
    if (!job_id) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    // Check Job Exists
    const { data: job } = await supabase
      .from("jobs")
      .select("id")
      .eq("id", job_id)
      .single();

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Get Student ID
    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", req.user.id)
      .single();

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // Check Already Applied
    const { data: existingApplication } = await supabase
      .from("applications")
      .select("id")
      .eq("student_id", student.id)
      .eq("job_id", job_id)
      .single();

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Save Application
    const { data, error } = await supabase
      .from("applications")
      .insert([
        {
          student_id: student.id,
          job_id,
          status: "Pending",
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Job Applied Successfully",
      application: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get My Applications
const getMyApplications = async (req, res) => {
  try {
console.log(req.user);
    // Get Student ID
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", req.user.id)
      .single();

    if (studentError || !student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // Get Applications
    const { data, error } = await supabase
      .from("applications")
      .select(`
        id,
        status,
        applied_at,
        jobs (
          id,
          job_title,
          job_type,
          salary,
          companies (
            company_name
          )
        )
      `)
      .eq("student_id", student.id)
      .order("applied_at", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      applications: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Applications (Admin)
const getAllApplications = async (req, res) => {
  try {

   const { data, error } = await supabase
  .from("applications")
  .select(`
    id,
    status,
    applied_at,
    students (
      id,
      college_roll,
      branch,
      users (
        full_name,
        email
      )
    ),
    jobs (
      id,
      job_title,
      companies (
        company_name
      )
    )
  `)
  .order("applied_at", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      applications: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Application Status (Admin)
const updateApplicationStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    // Validate Status
    const allowedStatus = ["Pending", "Selected", "Rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Status",
      });
    }

    // Check Application Exists
    const { data: application } = await supabase
      .from("applications")
      .select("id")
      .eq("id", id)
      .single();

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Update Status
    const { data, error } = await supabase
      .from("applications")
      .update({
        status,
      })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  applyJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
};