const Issue = require("../models/Issue");

// @desc    Create a new issue
// @route   POST /api/issues
// @access  Private
exports.createIssue = async (req, res) => {
  try {
    const { title, description, priority, tags } = req.body;

    const issue = new Issue({
      title,
      description,
      
      priority,
      tags,
    });

    await issue.save();

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all issues
// @route   GET /api/issues
// @access  Public
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("author", "name email");
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get a single issue by ID
// @ro  ute   GET /api/issues/:id
// @access  Public
exports.getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update an issue
// @route   PUT /api/issues/:id
// @access  Private (only author or admin can update)
exports.updateIssue = async (req, res) => {
  try {
    const { title, description, status, priority, tags } = req.body;

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Check if the user is the author or an admin
    if (
      issue.author.toString() !== req.user.id &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({ message: "Not authorized to update this issue" });
    }

    issue.title = title || issue.title;
    issue.description = description || issue.description;
    issue.status = status || issue.status;
    issue.priority = priority || issue.priority;
    issue.tags = tags || issue.tags;

    await issue.save();

    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete an issue
// @route   DELETE /api/issues/:id
// @access  Private (only author or admin can delete)
exports.deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Check if the user is the author or an admin
    if (
      issue.author.toString() !== req.user.id &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({ message: "Not authorized to delete this issue" });
    }

    await issue.remove();

    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Add a comment to an issue
// @route   POST /api/issues/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const comment = {
      user: req.user.id,
      content,
    };

    issue.comments.push(comment);
    await issue.save();

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Upvote an issue
// @route   POST /api/issues/:id/upvote
// @access  Private
exports.upvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Check if the user has already upvoted
    if (issue.votes.upvotes.includes(req.user.id)) {
      return res.status(400).json({ message: "You have already upvoted this issue" });
    }

    // Remove user from downvotes (if they downvoted previously)
    issue.votes.downvotes = issue.votes.downvotes.filter(
      (userId) => userId.toString() !== req.user.id
    );

    // Add user to upvotes
    issue.votes.upvotes.push(req.user.id);
    await issue.save();

    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Downvote an issue
// @route   POST /api/issues/:id/downvote
// @access  Private
exports.downvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Check if the user has already downvoted
    if (issue.votes.downvotes.includes(req.user.id)) {
      return res.status(400).json({ message: "You have already downvoted this issue" });
    }

    // Remove user from upvotes (if they upvoted previously)
    issue.votes.upvotes = issue.votes.upvotes.filter(
      (userId) => userId.toString() !== req.user.id
    );

    // Add user to downvotes
    issue.votes.downvotes.push(req.user.id);
    await issue.save();

    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};