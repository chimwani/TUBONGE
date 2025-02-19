const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Comment text is required"],
    },
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

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
