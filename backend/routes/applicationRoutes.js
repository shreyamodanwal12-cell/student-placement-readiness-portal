const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const admin = require("../middleware/admin");

const {
  applyJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

router.post("/apply", auth, applyJob);

router.get("/my", auth, getMyApplications);

router.get("/", auth, admin, getAllApplications);

router.put("/:id", auth, admin, updateApplicationStatus);

module.exports = router;