const mongoose = require("mongoose");
const Event = require("./models/Event");
const mockEvents = require("./data/mockEvents");
require("dotenv").config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/event_listing";

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    await Event.deleteMany({});
    console.log("Cleared existing events.");

    await Event.insertMany(mockEvents);
    console.log("Database seeded successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();
