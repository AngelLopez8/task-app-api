import User from '../models/User.model.js';

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

// Login with given email and password
export const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        
        res.status(200).json({ user, token });
    } catch(err){
        res.status(400).json({ 'error': 'Unable to login'});
    }
}

// ======================================================

// READ
// Get all Users
export const getUsers = async (req, res) => {
    await User.find()
        .then( users => {
            res.status(200).json(users);
        })
        .catch( err => {
            res.status(500).json(err);
        });
}

// Get User with given ID
export const getUser = async (req, res) => {
    const _id  = req.params.id;

    await User.findById(_id)
        .then( user => {
            if (!user){
                return res.status(404).json({});
            }
            res.status(200).json(user);
        })
        .catch( err => {
            res.status(500).json(err);
        });
}

// =======================================================

// UPDATE
// Update User with given id and updated data
export const updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every( update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ message: 'Invalid updates!' });
    }

    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({});
        }
        
        updates.forEach( update =>  user[update] = req.body[update] );
        await user.save();

        res.status(200).json(user);
    } catch(err) {
        res.status(400).json(err);
    };
}

// =======================================================

// Delete
// Delete User with given id
export const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
        .then( user => {
            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }
            res.status(200).json(user);
        })
        .catch( err => {
            res.status(400).json(err);
        });
}