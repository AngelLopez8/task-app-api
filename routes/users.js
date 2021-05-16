import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';

import { createUser, login, logout, logoutAll, getMyInfo, updateUser, deleteUser } from '../controllers/users.js';

// Create

router.post('/', createUser);

router.post('/login', login);

router.post('/logout', auth, logout);

router.post('/logoutAll', auth, logoutAll);

// Read

router.get('/me', auth, getMyInfo);

// Update

router.patch('/me', auth, updateUser);

// Delete

router.delete('/me', auth, deleteUser);


export default router;