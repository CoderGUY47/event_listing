const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
} = require("../controllers/eventController");

// Get all events
router.get("/", getEvents);

// Get single event
router.get("/:id", getEventById);

// Create event
router.post("/", createEvent);

module.exports = router;
