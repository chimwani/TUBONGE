const Forum = require("../models/Forum");

// @desc    Create a new forum post
// @route   POST /api/forums
// @access  Public (no authentication)
exports.createForumPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const forumPost = new Forum({
      title,
      content,
      tags: tags || [],
      // No author field since authentication is removed
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
    const forumPosts = await Forum.find(); // Removed .populate("author") since no author
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
    const forumPost = await Forum.findById(req.params.id); // Removed .populate("author")

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
// @access  Public (no author check)
exports.updateForumPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const forumPost = await Forum.findById(req.params.id);

    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    // Removed author check since no authentication
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
// @access  Public (no author or admin check)
exports.deleteForumPost = async (req, res) => {
  try {
    const forumPost = await Forum.findById(req.params.id);

    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    // Removed author and admin check since no authentication
    await forumPost.deleteOne();

    res.status(200).json({ message: "Forum post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Add a comment to a forum post
// @route   POST /api/forums/:id/comments
// @access  Public (no user association)
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const forumPost = await Forum.findById(req.params.id);

    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    const comment = {
      content, // No user field since authentication is removed
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
// @access  Public (simple counter instead of user tracking)
exports.likeForumPost = async (req, res) => {
  try {
    const forumPost = await Forum.findById(req.params.id);

    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    // Changed from tracking user IDs to a simple counter
    forumPost.likes = (forumPost.likes || 0) + 1;
    await forumPost.save();

    res.status(200).json(forumPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = exports;