// routes/forumRoutes.js
const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");
const { protect } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Forums
 *   description: Forum management
 */

/**
 * @swagger
 * /api/forums:
 *   post:
 *     summary: Create a new forum post
 *     tags: [Forums]
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
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Forum post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forum'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.post("/", protect, forumController.createForumPost);

/**
 * @swagger
 * /api/forums:
 *   get:
 *     summary: Get all forum posts
 *     tags: [Forums]
 *     responses:
 *       200:
 *         description: List of all forum posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Forum'
 *       500:
 *         description: Server error
 */
router.get("/", forumController.getAllForumPosts);

/**
 * @swagger
 * /api/forums/{id}:
 *   get:
 *     summary: Get a forum post by ID
 *     tags: [Forums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Forum post ID
 *     responses:
 *       200:
 *         description: Forum post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forum'
 *       404:
 *         description: Forum post not found
 *       500:
 *         description: Server error
 */
router.get("/:id", forumController.getForumPostById);

/**
 * @swagger
 * /api/forums/{id}:
 *   put:
 *     summary: Update a forum post
 *     tags: [Forums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Forum post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Forum post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forum'
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden (not the author)
 *       404:
 *         description: Forum post not found
 *       500:
 *         description: Server error
 */
router.put("/:id", protect, forumController.updateForumPost);

/**
 * @swagger
 * /api/forums/{id}:
 *   delete:
 *     summary: Delete a forum post
 *     tags: [Forums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Forum post ID
 *     responses:
 *       200:
 *         description: Forum post deleted successfully
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden (not the author or admin)
 *       404:
 *         description: Forum post not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect, forumController.deleteForumPost);

/**
 * @swagger
 * /api/forums/{id}/comments:
 *   post:
 *     summary: Add a comment to a forum post
 *     tags: [Forums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Forum post ID
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
 *               $ref: '#/components/schemas/Forum'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Forum post not found
 *       500:
 *         description: Server error
 */
router.post("/:id/comments", protect, forumController.addComment);

/**
 * @swagger
 * /api/forums/{id}/like:
 *   post:
 *     summary: Like a forum post
 *     tags: [Forums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Forum post ID
 *     responses:
 *       200:
 *         description: Forum post liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forum'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Forum post not found
 *       500:
 *         description: Server error
 */
router.post("/:id/like", protect, forumController.likeForumPost);

module.exports = router;