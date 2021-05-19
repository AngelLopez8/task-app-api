import User from '../models/User.model.js';

import sharp from 'sharp';

// CREATE
// Creates a new User
export const createUser = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        
        const token = await user.generateAuthToken();
        
        res.status(201).json({user, token});
    } catch(err) {
        res.status(400).json(err)
    }
}

// Upload user Avatar
export const uploadAv = async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    
    await req.user.save();
    
    res.status(200).json({});
}

// Login with given email and password
export const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        
        // res.status(200).json({ user: user.getPublicProfile(), token });
        res.status(200).json({ user, token });
    } catch(err){
        res.status(400).json({ 'error': 'Unable to login'});
    }
}

// Logout User
export const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter( token => token.token !== req.token );
        await req.user.save();

        res.status(200).send();
    } catch (err) {
        res.status(404).json({ error: '' })
    }
}

// Logout All
export const logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (err) {
        res.status(500).send();
    }
}

// ======================================================

// READ
// return user info
export const getMyInfo = async (req, res) => {
    res.status(200).json(req.user);
};

// get user avatar
export const getMyAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (err) {
        res.status(404).send();
    }
}

// =======================================================

// UPDATE
// Update User
export const updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every( update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ message: 'Invalid updates!' });
    }

    try {
        updates.forEach( update =>  req.user[update] = req.body[update] );
        
        await req.user.save();

        res.status(200).json(req.user);
    } catch(err) {
        res.status(400).json(err);
    };
}

// =======================================================

// Delete
// Delete User
export const deleteUser = async (req, res) => {
    try {
        await req.user.remove();

        res.status(200).json(req.user);
    } catch ( err ) {
        res.status(500).send();
    }
}

// Delete User Avatar
export const deleteAvatar = async (req, res) => {
    try {
        req.user.avatar = undefined;

        await req.user.save();

        res.status(200).send();
    } catch (err) {
        res.status(500).send();
    }
}