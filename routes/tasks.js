import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';

import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/tasks.js';

// Create

router.post('/', auth, createTask);

// Read

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt-asc
router.get('/', auth, getTasks);

router.get('/:id', auth, getTask);

// Update

router.patch('/:id', auth, updateTask);

// Delete

router.delete('/:id', auth, deleteTask);


export default router;