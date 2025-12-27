const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/event_listing";

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
