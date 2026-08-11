const supabase = require("../config/supabase");

// Add Resource - Admin
// Add Resource - Admin
const addResource = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      resource_url,
    } = req.body;

    // Validation
    if (!title || !category || !type) {
      return res.status(400).json({
        success: false,
        message: "Title, category and type are required",
      });
    }

    let file_url = null;

    // Upload PDF to Supabase Storage
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;

      const { error: uploadError } = await supabase.storage
        .from("resources")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });

      if (uploadError) {
        return res.status(400).json({
          success: false,
          message: uploadError.message,
        });
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("resources")
        .getPublicUrl(fileName);

      file_url = publicUrlData.publicUrl;
    }

    // Save Resource in Database
    const { data, error } = await supabase
      .from("resources")
      .insert([
        {
          title,
          description,
          category,
          type,
          file_url,
          resource_url: resource_url || null,
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
      message: "Resource Added Successfully",
      resource: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Resources
const getAllResources = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("resources")
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
      resources: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Resource By ID
const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      resource: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addResource,
  getAllResources,
  getResourceById,
};