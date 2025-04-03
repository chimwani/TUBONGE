const express = require("express");
const router = express.Router();
const petitionController = require("../controllers/petitionController");

/**
 * @swagger
 * tags:
 *   name: Petitions
 *   description: Petition management
 */

/**
 * @swagger
 * /api/petitions:
 *   post:
 *     summary: Create a new petition
 *     tags: [Petitions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - goal
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               goal:
 *                 type: number
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Petition created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Petition'
 *       500:
 *         description: Server error
 */
router.post("/", petitionController.createPetition);

/**
 * @swagger
 * /api/petitions:
 *   get:
 *     summary: Get all petitions
 *     tags: [Petitions]
 *     responses:
 *       200:
 *         description: List of petitions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Petition'
 *       500:
 *         description: Server error
 */
router.get("/", petitionController.getAllPetitions);

/**
 * @swagger
 * /api/petitions/{id}:
 *   get:
 *     summary: Get a single petition by ID
 *     tags: [Petitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Petition ID
 *     responses:
 *       200:
 *         description: Petition retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Petition'
 *       404:
 *         description: Petition not found
 *       500:
 *         description: Server error
 */
router.get("/:id", petitionController.getPetitionById);

/**
 * @swagger
 * /api/petitions/{id}/sign:
 *   post:
 *     summary: Sign a petition
 *     tags: [Petitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Petition ID
 *     responses:
 *       200:
 *         description: Petition signed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Petition'
 *       400:
 *         description: You have already signed this petition
 *       404:
 *         description: Petition not found
 *       500:
 *         description: Server error
 */
router.post("/:id/sign", petitionController.signPetition);

/**
 * @swagger
 * /api/petitions/{id}:
 *   put:
 *     summary: Update a petition
 *     tags: [Petitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Petition ID
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
 *               goal:
 *                 type: number
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Petition updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Petition'
 *       404:
 *         description: Petition not found
 *       500:
 *         description: Server error
 */
router.put("/:id", petitionController.updatePetition);

/**
 * @swagger
 * /api/petitions/{id}:
 *   delete:
 *     summary: Delete a petition
 *     tags: [Petitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Petition ID
 *     responses:
 *       200:
 *         description: Petition deleted successfully
 *       404:
 *         description: Petition not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", petitionController.deletePetition);

module.exports = router;