const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  getNotifications,
  createNotification,
  markNotificationRead,
  deleteNotification,
} = require("../controllers/notificationController");


// Get logged-in user's notifications
router.get("/", auth, getNotifications);


// Create notification
router.post("/", auth, createNotification);


// Mark notification as read
router.put("/:id/read", auth, markNotificationRead);


// Delete notification
router.delete("/:id", auth, deleteNotification);


module.exports = router;