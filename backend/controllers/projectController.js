const supabase = require("../config/supabase");

// Get logged-in student's projects
const getProjects = async (req, res) => {
  try {
    console.log("GET PROJECTS API CALLED");
    console.log("USER:", req.user);

    const { data, error } = await supabase
      .from("projects")
      .select("*");

    console.log("PROJECT DATA:", data);
    console.log("PROJECT ERROR:", error);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      projects: data,
    });

  } catch (err) {
    console.log("PROJECT CATCH ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// Add project
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      project_url,
      github_url,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Project title is required",
      });
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          user_id: req.user.id,
          title,
          description,
          technologies,
          project_url,
          github_url,
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
      message: "Project Added Successfully",
      project: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// Update project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      technologies,
      project_url,
      github_url,
    } = req.body;

    const { data, error } = await supabase
      .from("projects")
      .update({
        title,
        description,
        technologies,
        project_url,
        github_url,
      })
      .eq("id", id)
      .eq("user_id", req.user.id)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Project Updated Successfully",
      project: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// Delete project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Project Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};