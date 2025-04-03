const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Poll:
 *       type: object
 *       required:
 *         - title
 *         - type
 *         - options
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the poll
 *           example: "Should we adopt a new policy?"
 *         type:
 *           type: string
 *           enum: [forum, petition, issue]
 *           description: The type of poll
 *           example: "forum"
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           minItems: 2
 *           description: List of poll options (minimum 2 required)
 *           example: ["Yes", "No"]
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId of the poll (auto-generated)
 *           example: "507f1f77bcf86cd799439011"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of poll creation (auto-generated)
 *           example: "2025-04-03T12:00:00Z"
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *           example: "Invalid input"
 *         error:
 *           type: string
 *           description: Detailed error information (optional)
 *           example: "Validation failed"
 */

/**
 * @swagger
 * /api/polls:
 *   post:
 *     summary: Create a new poll (No auth required)
 *     tags: [Polls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - options
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the poll
 *                 example: "Should we adopt a new policy?"
 *               type:
 *                 type: string
 *                 enum: [forum, petition, issue]
 *                 description: The type of poll
 *                 example: "forum"
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: A single poll option
 *                 minItems: 2
 *                 description: List of poll options (minimum 2 required)
 *                 example: ["Yes", "No"]
 *     responses:
 *       201:
 *         description: The created poll
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', pollController.createPoll);

/**
 * @swagger
 * /api/polls:
 *   get:
 *     summary: Retrieve all polls (No auth required)
 *     tags: [Polls]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [forum, petition, issue]
 *         description: Filter by poll type
 *         example: "forum"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Limit number of polls returned
 *     responses:
 *       200:
 *         description: A list of polls
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poll'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', pollController.getAllPolls);

/**
 * @swagger
 * /api/polls/{id}:
 *   get:
 *     summary: Get a poll by ID (No auth required)
 *     tags: [Polls]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the poll
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Poll data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *       404:
 *         description: Poll not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', pollController.getPollById);

/**
 * @swagger
 * /api/polls/{id}:
 *   put:
 *     summary: Update a poll (No auth required)
 *     tags: [Polls]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the poll
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the poll (optional)
 *                 example: "Updated: Should we adopt a new policy?"
 *               type:
 *                 type: string
 *                 enum: [forum, petition, issue]
 *                 description: The updated type of poll (optional)
 *                 example: "petition"
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: A single poll option
 *                 minItems: 2
 *                 description: Updated list of poll options (optional, must have at least 2 if provided)
 *                 example: ["Yes", "Maybe", "No"]
 *     responses:
 *       200:
 *         description: Updated poll
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Poll not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', pollController.updatePoll);

/**
 * @swagger
 * /api/polls/{id}:
 *   delete:
 *     summary: Delete a poll (No auth required)
 *     tags: [Polls]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the poll
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Poll deleted successfully"
 *       404:
 *         description: Poll not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', pollController.deletePoll);

module.exports = router;