const mongoose = require("mongoose");

const PublicNoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the user/admin who issued the notice
      required: true,
    },
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident", // Links to an incident if applicable
    },
    category: {
      type: String,
      enum: ["alert", "warning", "update", "general"],
      default: "general",
    },
    isActive: {
      type: Boolean,
      default: true, // Determines if the notice is still valid
    },
  },
  {
    timestamps: true,
  }
);

const PublicNotice = mongoose.model("PublicNotice", PublicNoticeSchema);
module.exports = PublicNotice;
