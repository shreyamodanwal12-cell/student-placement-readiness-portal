const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/achievementController");

router.get("/", auth, getAchievements);

router.post("/", auth, createAchievement);

router.put("/:id", auth, updateAchievement);

router.delete("/:id", auth, deleteAchievement);

module.exports = router;