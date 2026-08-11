const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");
const {
  addResource,
  getAllResources,
  getResourceById,
} = require("../controllers/resourceController");

// Admin adds resource
router.post("/", auth, admin, upload.single("file"), addResource);

// Student/Admin can see all resources
router.get("/", auth, getAllResources);

// Student/Admin can see one resource
router.get("/:id", auth, getResourceById);

module.exports = router;