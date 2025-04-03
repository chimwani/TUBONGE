const mongoose = require("mongoose");

const petitionSchema = new mongoose.Schema(
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
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false , //author optional
    },
    signatures: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        signedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    goal: {
      type: Number,
      required: [true, "Goal is required"],
      min: [1, "Goal must be at least 1"],
    },
    status: {
      type: String,
      enum: ["Active", "Closed", "Achieved"],
      default: "Active",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Petition", petitionSchema);