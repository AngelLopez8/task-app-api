import express from 'express';
const router = express.Router();

import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/tasks.js';

// Create

router.post('/', createTask);

// Read

router.get('/', getTasks);

router.get('/:id', getTask);

// Update

router.patch('/:id', updateTask);

// Delete

router.delete('/:id', deleteTask);


export default router;