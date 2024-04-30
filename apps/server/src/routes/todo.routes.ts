/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API endpoints for managing todo items
 *
 * components:
 *   schemas:
 *     ToDo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the todo item.
 *         title:
 *           type: string
 *           description: The title of the todo item.
 *         description:
 *           type: string
 *           description: The description of the todo item.
 *         completed:
 *           type: boolean
 *           description: Indicates whether the todo item is completed or not.
 *         user_id:
 *           type: integer
 *           description: The ID of the user who created the todo item.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the todo item was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the todo item was last updated.
 *       example:
 *         id: 1
 *         title: Task 1
 *         description: This is task 1
 *         completed: false
 *         user_id: 1
 *         created_at: 2024-04-30T12:00:00Z
 *         updated_at: 2024-04-30T12:00:00Z
 */

import { Router } from 'express';
import DB from '../db/index';
import { IToDo } from '../validationSchema/types';

const router = Router();

/**
 * @swagger
 * /v1/todo/create:
 *   post:
 *     summary: Create a new todo item
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ToDo'
 *     responses:
 *       '200':
 *         description: Todo item created successfully.
 *       '500':
 *         description: Internal server error.
 */
router.post('/create', async (req, res) => {
  // Implementation to create a new todo item
});

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Retrieve a todo item by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the todo item to retrieve.
 *     responses:
 *       '200':
 *         description: Todo item retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ToDo'
 *       '404':
 *         description: Todo item not found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:id', async (req, res) => {
  // Implementation to retrieve a todo item by ID
});

/**
 * @swagger
 * /api/todos/all:
 *   get:
 *     summary: Retrieve all todo items
 *     tags: [Todos]
 *     responses:
 *       '200':
 *         description: A list of all todo items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ToDo'
 *       '500':
 *         description: Internal server error.
 */
router.get('/all', async (req, res) => {
  DB.select<IToDo>()
    .from('todos')
    .then((data) => {
      return res.send(data);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send('Internal server error');
    });
});

/**
 * @swagger
 * /api/todos/update/{id}:
 *   patch:
 *     summary: Update a todo item by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the todo item to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ToDo'
 *     responses:
 *       '200':
 *         description: Todo item updated successfully.
 *       '404':
 *         description: Todo item not found.
 *       '500':
 *         description: Internal server error.
 */
router.patch('/update/:id', async (req, res) => {
  // Implementation to update a todo item by ID
});

/**
 * @swagger
 * /api/todos/delete/{id}:
 *   delete:
 *     summary: Delete a todo item by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the todo item to delete.
 *     responses:
 *       '200':
 *         description: Todo item deleted successfully.
 *       '404':
 *         description: Todo item not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete('/delete/:id', async (req, res) => {
  // Implementation to delete a todo item by ID
});

export default router;
