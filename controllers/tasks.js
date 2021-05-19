import Task from '../models/Task.model.js';

// CREATE
// Creates a new Task
export const createTask = async (req, res) => {
    const task = new Task({ ...req.body, author: req.user._id });

    try {
        await task.save();

        res.status(201).json(task);
    } catch (err) {
        res.status(400).json(err);
    }
}

// ======================================================

// READ
// Read all tasks
export const getTasks = async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('_');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();

        res.status(200).json(req.user.tasks);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Read task with given ID
export const getTask = async (req, res) => {
    const _id  = req.params.id;

    try {
        const task = await Task.findOne({ _id, author: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.status(200).json(task);
    } catch (err) {
        res.status(500).send();
    }
}

// =======================================================

// UPDATE
// Update task with given id and updated data
export const updateTask = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every( update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ message: 'Invalid updates!' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, author: req.user._id })
        
        if (!task) {
            return res.status(404).json({});
        }
        
        updates.forEach( update => task[update] = req.body[update] );
        await task.save();

        res.status(200).json(task);
    } catch(err) {
        res.status(400).json(err);
    }
}

// =======================================================

// Delete
// Delete task with given id
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, author: req.user._id });

        if (!task) {
            res.status(404).send();
        }

        res.status(200).json(task);
    }  catch (err) {
        res.status(500).json(err);
    }
}