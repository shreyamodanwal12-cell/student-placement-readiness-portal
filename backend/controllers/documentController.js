const supabase = require("../config/supabase");

// GET all documents of logged-in user
const getDocuments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", req.user.id)
      .order("id", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      documents: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// POST / Add document
// Add document
const createDocument = async (req, res) => {
  try {
    const {
      document_name,
      document_type,
    } = req.body;

    // Check PDF
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF document",
      });
    }

    // Automatically create file URL
    const file_url = `/uploads/documents/${req.file.filename}`;

    if (!document_name) {
      return res.status(400).json({
        success: false,
        message: "Document name is required",
      });
    }

    const { data, error } = await supabase
      .from("documents")
      .insert([
        {
          user_id: req.user.id,
          document_name,
          document_type,
          file_url,
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
      message: "Document Added Successfully",
      document: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE document
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("documents")
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
      message: "Document Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// UPDATE document
const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      document_name,
      document_type,
      file_url,
    } = req.body;

    const { data, error } = await supabase
      .from("documents")
      .update({
        document_name,
        document_type,
        file_url,
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
      message: "Document Updated Successfully",
      document: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
};