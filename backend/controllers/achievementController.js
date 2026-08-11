const supabase = require("../config/supabase");

// GET all achievements of logged-in student
const getAchievements = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("achievements")
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
      achievements: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// CREATE achievement
const createAchievement = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Achievement title is required",
      });
    }

    const { data, error } = await supabase
      .from("achievements")
      .insert([
        {
          user_id: req.user.id,
          title,
          description,
          date,
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
      message: "Achievement Added Successfully",
      achievement: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE achievement
const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;

    const { data, error } = await supabase
      .from("achievements")
      .update({
        title,
        description,
        date,
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
      message: "Achievement Updated Successfully",
      achievement: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE achievement
const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("achievements")
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
      message: "Achievement Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};