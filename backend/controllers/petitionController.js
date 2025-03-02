const Petition = require("../models/Petition");

// @desc    Create a new petition
// @route   POST /api/petitions
// @access  Private
exports.createPetition = async (req, res) => {
  try {
    const { title, description, goal, tags } = req.body;

    const petition = new Petition({
      title,
      description,
      author: req.user.id,
      goal,
      tags,
    });

    await petition.save();

    res.status(201).json(petition);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all petitions
// @route   GET /api/petitions
// @access  Public
exports.getAllPetitions = async (req, res) => {
  try {
    const petitions = await Petition.find().populate("author", "name email");
    res.status(200).json(petitions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get a single petition by ID
// @route   GET /api/petitions/:id
// @access  Public
exports.getPetitionById = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }

    res.status(200).json(petition);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Sign a petition
// @route   POST /api/petitions/:id/sign
// @access  Private
exports.signPetition = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id);

    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }

    // Check if the user has already signed the petition
    const hasSigned = petition.signatures.some(
      (signature) => signature.user.toString() === req.user.id
    );

    if (hasSigned) {
      return res.status(400).json({ message: "You have already signed this petition" });
    }

    // Add the user's signature
    petition.signatures.push({ user: req.user.id });

    // Check if the goal has been achieved
    if (petition.signatures.length >= petition.goal) {
      petition.status = "Achieved";
    }

    await petition.save();

    res.status(200).json(petition);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a petition
// @route   PUT /api/petitions/:id
// @access  Private (only author can update)
exports.updatePetition = async (req, res) => {
  try {
    const { title, description, goal, tags } = req.body;

    const petition = await Petition.findById(req.params.id);

    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }

    // Check if the user is the author
    if (petition.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this petition" });
    }

    petition.title = title || petition.title;
    petition.description = description || petition.description;
    petition.goal = goal || petition.goal;
    petition.tags = tags || petition.tags;

    await petition.save();

    res.status(200).json(petition);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a petition
// @route   DELETE /api/petitions/:id
// @access  Private (only author or admin can delete)
exports.deletePetition = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id);

    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }

    // Check if the user is the author or an admin
    if (
      petition.author.toString() !== req.user.id &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({ message: "Not authorized to delete this petition" });
    }

    await petition.remove();

    res.status(200).json({ message: "Petition deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};