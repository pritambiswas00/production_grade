/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 *
 * components:
 *   schemas:
 *     SignIn:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *       example:
 *         email: john_doe@example.com
 *         password: password123
 *     SignUp:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the User.
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the User.
 *         password:
 *           type: string
 *           description: Password of the User.
 */

import { Response, Request, Router } from 'express';
import { authController } from '../controller/auth.conroller';
const router = Router();

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignIn'
 *     responses:
 *       '200':
 *         description: User signed in successfully.
 *       '401':
 *         description: Unauthorized. Invalid credentials.
 *       '500':
 *         description: Internal server error.
 */
router.post('/signin', authController.signIn);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       '201':
 *         description: User signed up successfully.
 *       '409':
 *         description: Conflict. User already exists.
 *       '500':
 *         description: Internal server error.
 */
router.post('/signup', authController.signUp);

/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     summary: Sign out
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: User signed out successfully.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '500':
 *         description: Internal server error.
 */
router.post('/signout', authController.signOut);

export default router;
