// controllers/forumController.js
const Forum = require("../models/Forum");

// @desc    Create a new forum post
// @route   POST /api/forums
// @access  Private
exports.createForumPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const forumPost = new Forum({
      title,
      content,
      author: req.user.id,
      tags,
    });

    await forumPost.save();

    res.status(201).json(forumPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all forum posts
// @route   GET /api/forums
// @access  Public
exports.getAllForumPosts = async (req, res) => {
  try {
    const forumPosts = await Forum.find().populate("author", "name email");
    res.status(200).json(forumPosts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get a single forum post by ID
// @route   GET /api/forums/:id
// @access  Public
exports.getForumPostById = async (req, res) => {
  try {
    const forumPost = await Forum.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    res.status(200).json(forumPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a forum post
// @route   PUT /api/forums/:id
// @access  Private (only author can update)
exports.updateForumPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const forumPost = await Forum.findById(req.params.id);

    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    // Check if the user is the author
    if (forumPost.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this post" });
    }

    forumPost.title = title || forumPost.title;
    forumPost.content = content || forumPost.content;
    forumPost.tags = tags || forumPost.tags;

    await forumPost.save();

    res.status(200).json(forumPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a forum post
// @route   DELETE /api/forums/:id
// @access  Private (only author or admin can delete)
exports.deleteForumPost = async (req, res) => {
  try {
    const forumPost = await Forum.findById(req.params.id);

    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    // Check if the user is the author or an admin
    if (
      forumPost.author.toString() !== req.user.id &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await forumPost.remove();

    res.status(200).json({ message: "Forum post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Add a comment to a forum post
// @route   POST /api/forums/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;

    const forumPost = await Forum.findById(req.params.id);

    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    const comment = {
      user: req.user.id,
      content,
    };

    forumPost.comments.push(comment);
    await forumPost.save();

    res.status(201).json(forumPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Like a forum post
// @route   POST /api/forums/:id/like
// @access  Private
exports.likeForumPost = async (req, res) => {
  try {
    const forumPost = await Forum.findById(req.params.id);

    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    // Check if the user already liked the post
    if (forumPost.likes.includes(req.user.id)) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    forumPost.likes.push(req.user.id);
    await forumPost.save();

    res.status(200).json(forumPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};