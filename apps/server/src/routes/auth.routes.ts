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

import { Router } from 'express';
import { authController } from '../controller/auth.conroller';
import passport from 'passport';
const router = Router();

/**
 * @swagger
 * /auth/signin:
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
router.post('/signin', passport.authorize('local'), authController.signIn);

/**
 * @swagger
 * /auth/signup:
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
 * /auth/signout:
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
router.post('/signout', passport.authenticate('jwt'), authController.signOut);

export default router;
