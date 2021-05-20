import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();

// Import custom Routes
import TaskRoutes from './routes/tasks.js';
import UserRoutes from './routes/users.js';

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Use custom Routes
app.use('/tasks', TaskRoutes);
app.use('/users', UserRoutes);

mongoose.connect(process.env.MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then( () => {
        app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));
    })
    .catch( error => console.error(`Failed to connect to MongoDB Atlas.`));