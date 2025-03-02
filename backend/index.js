// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const swaggerConfig = require("./swagger");
const errorHandler = require("./middlewares/errorMiddleware");
const logger = require("./middlewares/loggerMiddleware");
const forumRoutes = require("./routes/forumRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(logger); // Use logger middleware

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://tubonge:tubonge@cluster0.qznn3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/forums", forumRoutes);

// Swagger Documentation
swaggerConfig(app);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));