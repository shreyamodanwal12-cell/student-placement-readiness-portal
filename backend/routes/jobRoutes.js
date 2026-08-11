const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  addJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

router.post("/", auth, admin, addJob);

router.get("/", auth, getAllJobs);

router.get("/:id", auth, getJobById);

router.put("/:id", auth, admin, updateJob);

router.delete("/:id", auth, admin, deleteJob);

module.exports = router;