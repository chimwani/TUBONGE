const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
    },
  },
  { timestamps: true }
);

const issueSchema = new mongoose.Schema(
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
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    comments: [commentSchema],
    votes: {
      upvotes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      downvotes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);