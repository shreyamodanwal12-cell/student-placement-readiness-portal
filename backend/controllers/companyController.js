const supabase = require("../config/supabase");

// Add Company
const addCompany = async (req, res) => {
  try {
    const {
      company_name,
      description,
      location,
      package_lpa,
      eligibility_cgpa,
      deadline,
    } = req.body;

    if (
      !company_name ||
      !location ||
      !package_lpa ||
      !eligibility_cgpa ||
      !deadline
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    const { data, error } = await supabase
      .from("companies")
      .insert([
        {
          company_name,
          description,
          location,
          package_lpa,
          eligibility_cgpa,
          deadline,
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
      message: "Company Added Successfully",
      company: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Companies
const getAllCompanies = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      companies: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Company By ID
const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      company: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Company
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      company_name,
      description,
      location,
      package_lpa,
      eligibility_cgpa,
      deadline,
    } = req.body;

    const { data, error } = await supabase
      .from("companies")
      .update({
        company_name,
        description,
        location,
        package_lpa,
        eligibility_cgpa,
        deadline,
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
      message: "Company Updated Successfully",
      company: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Company
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("companies")
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
      message: "Company Deleted Successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


module.exports = {
  addCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};