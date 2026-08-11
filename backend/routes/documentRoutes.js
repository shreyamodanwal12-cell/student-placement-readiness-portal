const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const documentUpload = require("../middleware/documentUpload");

const {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} = require("../controllers/documentController");


// GET documents
router.get("/", auth, getDocuments);


// POST document with PDF upload
router.post(
  "/",
  auth,
  documentUpload.single("document"),
  createDocument
);


// PUT document
router.put(
  "/:id",
  auth,
  updateDocument
);


// DELETE document
router.delete(
  "/:id",
  auth,
  deleteDocument
);


module.exports = router;