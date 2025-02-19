const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;
