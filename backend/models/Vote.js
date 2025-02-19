const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true,
    },
    voteType: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
  },
  {
    timestamps: true,
    uniqueConstraints: [{ user: 1, incident: 1 }], // Ensures one vote per user per incident
  }
);

const Vote = mongoose.model("Vote", VoteSchema);
module.exports = Vote;
