const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["New Incident", "Comment", "Status Update", "Like"],
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    relatedIncident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
