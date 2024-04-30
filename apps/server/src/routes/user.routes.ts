/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for user managing profile purposes
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID of the user.
 *         name:
 *           type: string
 *           description: Name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the user.
 */

import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /v1/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to retrieve.
 *     responses:
 *       '200':
 *         description: User retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:id', async (req, res) => {
  // Implementation to retrieve user by ID
});

/**
 * @swagger
 * /v1/user/update:
 *   patch:
 *     summary: Update user
 *     tags: [User]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User updated successfully.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.patch('/update', async (req, res) => {
  // Implementation to update user
});

/**
 * @swagger
 * /api/user/delete:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete('/delete', async (req, res) => {
  // Implementation to delete user
});

export default router;
