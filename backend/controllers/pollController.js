const Poll = require('../models/Poll');

/**
 * @swagger
 * tags:
 *   name: Polls
 *   description: Poll management
 */

exports.createPoll = async (req, res) => {
  try {
    const { title, type, options } = req.body;

    if (!title || !type || !options || options.length < 2) {
      return res.status(400).json({ message: 'Title, type and at least 2 options are required' });
    }

    const poll = new Poll({ title, type, options });
    await poll.save();

    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @swagger
 * /api/polls:
 *   get:
 *     summary: Get all polls
 *     tags: [Polls]
 *     responses:
 *       200:
 *         description: List of all polls
 */
exports.getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @swagger
 * /api/polls/{id}:
 *   get:
 *     summary: Get a poll by ID
 *     tags: [Polls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Poll data
 *       404:
 *         description: Poll not found
 */
exports.getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    res.status(200).json(poll);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @swagger
 * /api/polls/{id}:
 *   put:
 *     summary: Update a poll
 *     tags: [Polls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [forum, petition, issue]
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Poll updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Poll not found
 */
exports.updatePoll = async (req, res) => {
  try {
    const { title, type, options } = req.body;

    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    if (title) poll.title = title;
    if (type) poll.type = type;
    if (options && options.length >= 2) poll.options = options;

    await poll.save();
    res.status(200).json(poll);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @swagger
 * /api/polls/{id}:
 *   delete:
 *     summary: Delete a poll
 *     tags: [Polls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Poll deleted successfully
 *       404:
 *         description: Poll not found
 */
exports.deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findByIdAndDelete(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    res.status(200).json({ message: 'Poll deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};