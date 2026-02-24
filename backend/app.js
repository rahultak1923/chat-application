const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// static images
app.use("/uploads", express.static("uploads"));

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

module.exports = app;  