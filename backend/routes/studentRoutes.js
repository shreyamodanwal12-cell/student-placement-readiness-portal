const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const adminOrCoordinator = require("../middleware/adminOrCoordinator");  
const upload = require("../middleware/upload");

const {
  getProfile,
  updateProfile,
  uploadResume,
  getReadinessScore,
  getAllStudents,
} = require("../controllers/studentController");

router.get("/", auth, adminOrCoordinator, getAllStudents);

router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.put("/resume", auth, upload.single("resume"), uploadResume);
router.get("/readiness", auth, getReadinessScore);

module.exports = router;