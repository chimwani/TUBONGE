const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issueController");
const { protect } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Issues
 *   description: Issue management
 */

/**
 * @swagger
 * /api/issues:
 *   post:
 *     summary: Create a new issue
 *     tags: [Issues]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: ["Low", "Medium", "High", "Urgent"]
 *                 default: "Medium"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Issue created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.post("/", protect, issueController.createIssue);

/**
 * @swagger
 * /api/issues:
 *   get:
 *     summary: Get all issues
 *     tags: [Issues]
 *     responses:
 *       200:
 *         description: List of issues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Issue'
 *       500:
 *         description: Server error
 */
router.get("/", issueController.getAllIssues);

/**
 * @swagger
 * /api/issues/{id}:
 *   get:
 *     summary: Get a single issue by ID
 *     tags: [Issues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Issue ID
 *     responses:
 *       200:
 *         description: Issue retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       404:
 *         description: Issue not found
 *       500:
 *         description: Server error
 */
router.get("/:id", issueController.getIssueById);

/**
 * @swagger
 * /api/issues/{id}:
 *   put:
 *     summary: Update an issue
 *     tags: [Issues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Issue ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: ["Open", "In Progress", "Resolved", "Closed"]
 *               priority:
 *                 type: string
 *                 enum: ["Low", "Medium", "High", "Urgent"]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Issue updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden (not the author or admin)
 *       404:
 *         description: Issue not found
 *       500:
 *         description: Server error
 */
router.put("/:id", protect, issueController.updateIssue);

/**
 * @swagger
 * /api/issues/{id}:
 *   delete:
 *     summary: Delete an issue
 *     tags: [Issues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Issue ID
 *     responses:
 *       200:
 *         description: Issue deleted successfully
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden (not the author or admin)
 *       404:
 *         description: Issue not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect, issueController.deleteIssue);

/**
 * @swagger
 * /api/issues/{id}/comments:
 *   post:
 *     summary: Add a comment to an issue
 *     tags: [Issues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Issue ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Issue not found
 *       500:
 *         description: Server error
 */
router.post("/:id/comments", protect, issueController.addComment);

/**
 * @swagger
 * /api/issues/{id}/upvote:
 *   post:
 *     summary: Upvote an issue
 *     tags: [Issues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Issue ID
 *     responses:
 *       200:
 *         description: Issue upvoted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       400:
 *         description: You have already upvoted this issue
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Issue not found
 *       500:
 *         description: Server error
 */
router.post("/:id/upvote", protect, issueController.upvoteIssue);

/**
 * @swagger
 * /api/issues/{id}/downvote:
 *   post:
 *     summary: Downvote an issue
 *     tags: [Issues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Issue ID
 *     responses:
 *       200:
 *         description: Issue downvoted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       400:
 *         description: You have already downvoted this issue
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Issue not found
 *       500:
 *         description: Server error
 */
router.post("/:id/downvote", protect, issueController.downvoteIssue);

module.exports = router;