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
 *         name:
 *           type: string
 *           description: Name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the user.
 *         password:
 *           type: string
 *           description: Password of the user.
 *     GetUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the user.
 *     UpdateUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the user.
 *         password:
 *           type: string
 *           description: Password of the user.
 */

import { Router } from 'express';
import { userController } from '../controller/user.controller';
const router = Router();

/**
 * @swagger
 * /v1/user:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: User retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUser'
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/', userController.getUser);

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
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       '200':
 *         description: User updated successfully.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.patch('/update', userController.updateUser);

/**
 * @swagger
 * /v1/user/delete:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: Successfully deleted the user.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete('/delete', userController.deleteUser);

export default router;
