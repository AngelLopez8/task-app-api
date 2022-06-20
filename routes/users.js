import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

import { createUser, uploadAv, login, logout, logoutAll, getMyInfo, getMyAvatar, updateUser, deleteUser, deleteAvatar } from '../controllers/users.js';

// Create

router.post('/', createUser);

// upload user avatar
router.post('/me/avatar', auth, upload.single('avatar'), uploadAv,
    (error, req, res, next) => {
        res.status(400).json({ error: error.message });
    });

router.post('/login', login);

router.post('/logout', auth, logout);

router.post('/logoutall', auth, logoutAll);

// Read

router.get('/me', auth, getMyInfo);

router.get('/me/avatar/:id', getMyAvatar);

// Update

router.patch('/me', auth, updateUser);

// Delete

router.delete('/me', auth, deleteUser);

router.delete('/me/avatar', auth, deleteAvatar);


export default router;