const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  addCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");
router.post("/", auth, admin, addCompany);

router.get("/", auth, getAllCompanies);

router.get("/:id", auth, getCompanyById);

router.put("/:id", auth, admin, updateCompany);

router.delete("/:id", auth, admin, deleteCompany);

module.exports = router;