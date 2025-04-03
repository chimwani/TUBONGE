const Petition = require("../models/Petition");

// @desc    Create a new petition
// @route   POST /api/petitions
// @access  Public
exports.createPetition = async (req, res) => {
  try {
    const { title, description, goal, tags } = req.body;

    const petition = new Petition({
      title,
      description,
      author: "anonymous", // No user association
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
    const petitions = await Petition.find();
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
    const petition = await Petition.findById(req.params.id);

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
// @access  Public
exports.signPetition = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id);

    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }

    // No check for existing signatures since we don't track users
    petition.signatures.push({ user: "anonymous" });

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
// @access  Public
exports.updatePetition = async (req, res) => {
  try {
    const { title, description, goal, tags } = req.body;

    const petition = await Petition.findById(req.params.id);

    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
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
// @access  Public
exports.deletePetition = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id);

    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }

    await petition.remove();

    res.status(200).json({ message: "Petition deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};