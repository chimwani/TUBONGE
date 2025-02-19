const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      enum: ["Theft", "Accident", "Corruption", "Emergency", "Other"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    media: [
      {
        type: String, // URLs for images/videos
      },
    ],
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Dismissed"],
      default: "Pending",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Government official handling the case
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Incident = mongoose.model("Incident", IncidentSchema);
module.exports = Incident;
