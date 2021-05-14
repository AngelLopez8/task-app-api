import Task from '../models/Task.model.js';

// CREATE
// Creates a new Task
export const createTask = async (req, res) => {
    const newTask = new Task(req.body);

    await newTask.save()
        .then( () => {
            res.status(201).json(newTask);
        })
        .catch( err => {
            res.status(400).json(err)
        });
}

// ======================================================

// READ
// Read all tasks
export const getTasks = async (req, res) => {
    await Task.find()
        .then( tasks => {
            res.status(200).json(tasks);
        })
        .catch( err => {
            res.status(500).json(err);
        });
}

// Read task with given ID
export const getTask = async (req, res) => {
    const _id  = req.params.id;

    await Task.findById(_id)
        .then( task => {
            if (!task){
                return res.status(404).json({});
            }
            res.status(200).json(task);
        })
        .catch( err => {
            res.status(500).json(err);
        });
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
        const task = await Task.findById(req.params.id);
        
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
    await Task.findByIdAndDelete(req.params.id)
        .then( task => {
            if (!task) {
                return res.status(404).json({ message: "Task not found!" });
            }
            res.status(200).json(task);
        })
        .catch( err => {
            res.status(400).json(err);
        });
}