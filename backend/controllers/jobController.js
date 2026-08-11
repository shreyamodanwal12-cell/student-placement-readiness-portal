const supabase = require("../config/supabase");

// Add Job
const addJob = async (req, res) => {
  try {
    const {
      company_id,
      job_title,
      job_description,
      job_type,
      salary,
      eligibility_cgpa,
      deadline,
      apply_link,
    } = req.body;

    // Validation
    if (
      !company_id ||
      !job_title ||
      !job_description ||
      !job_type ||
      !salary ||
      !apply_link
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    // Check Company Exists
    const { data: company } = await supabase
      .from("companies")
      .select("id")
      .eq("id", company_id)
      .single();

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Insert Job
    const { data, error } = await supabase
      .from("jobs")
      .insert([
        {
          company_id,
          job_title,
          job_description,
          job_type,
          salary,
          eligibility_cgpa,
          deadline,
          apply_link,
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
      message: "Job Added Successfully",
      job: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Jobs
const getAllJobs = async (req, res) => {
  try {

    const { data, error } = await supabase
      .from("jobs")
      .select(`
        *,
        companies (
          id,
          company_name
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
      jobs: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Job By ID
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("jobs")
      .select(`
        *,
        companies (
          id,
          company_name
        )
      `)
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Job
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      company_id,
      job_title,
      job_description,
      job_type,
      salary,
      eligibility_cgpa,
      deadline,
      apply_link: applyLink,
    } = req.body;

    const { data, error } = await supabase
      .from("jobs")
      .update({
        company_id,
        job_title,
        job_description,
        job_type,
        salary,
        eligibility_cgpa,
        deadline,
        apply_link: applyLink,
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
      message: "Job Updated Successfully",
      job: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Job Deleted Successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};