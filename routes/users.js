import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';

import { createUser, login, getUsers, getUser, updateUser, deleteUser } from '../controllers/users.js';

// Create

router.post('/', createUser);

router.post('/login', login);

// Read

router.get('/', auth, getUsers);

router.get('/:id', getUser);

// Update

router.patch('/:id', updateUser);

// Delete

router.delete('/:id', deleteUser);


export default router;