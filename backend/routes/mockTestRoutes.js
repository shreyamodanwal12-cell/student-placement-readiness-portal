const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  createMockTest,
  getAllMockTests,
  getMockTestById,
  addQuestion,
  submitMockTest,
  getAllMockResults,
} = require("../controllers/mockTestController");

// Admin creates mock test
router.post("/", auth, admin, createMockTest);

// Admin adds question to a mock test
router.post("/:id/questions", auth, admin, addQuestion);

// Students/Admin can see available tests
router.get("/", auth, getAllMockTests);

// Admin can see all student mock results
router.get("/results", auth, admin, getAllMockResults);

// Get one test with its questions
router.get("/:id", auth, getMockTestById);


// Submit a mock test
router.post(
  "/:mock_test_id/submit",
  auth,
  submitMockTest
);

module.exports = router;