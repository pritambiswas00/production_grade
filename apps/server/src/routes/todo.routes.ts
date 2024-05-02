/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: v1 endpoints for managing todo items
 *
 * components:
 *   schemas:
 *     ToDo:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the todo item.
 *         description:
 *           type: string
 *           description: The description of the todo item.
 *         completed:
 *           type: boolean
 *           description: Indicates whether the todo item is completed or not.
 *       example:
 *         title: Task 1
 *         description: This is task 1
 *         completed: false
 */

import { Router } from 'express';
import { toDoController } from '../controller/todo.controller';

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
 *       '201':
 *         description: Todo item created successfully.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 */
router.post('/create', toDoController.createToDo);

/**
 * @swagger
 * /v1/todo/{id}:
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
router.get('/:id', toDoController.getToDo);

/**
 * @swagger
 * /v1/todo/all:
 *   get:
 *     summary: Retrieve all todo items
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of items per page for pagination
 *     responses:
 *       '200':
 *         description: A list of all todo items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ToDo'
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 */
router.get('/all', toDoController.getAllToDo);

/**
 * @swagger
 * /v1/todo/update/{id}:
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
router.patch('/update/:id', toDoController.updateToDo);

/**
 * @swagger
 * /v1/todo/delete/{id}:
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
router.delete('/delete/:id', toDoController.deleteToDo);

export default router;
