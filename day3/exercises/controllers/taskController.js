const Task = require('../models/taskModel');

async function getAllTasks(req, res, next) {
    try {
        const tasks = await Task.getAll();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
}

async function getTaskById(req, res, next) {
    try {
        const task = await Task.getById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        next(error);
    }
}

async function createTask(req, res, next) {
    try {
        const { title, description, completed = false } = req.body;
        
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        
        const newTask = await Task.create({ title, description, completed });
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
}

async function updateTask(req, res, next) {
    try {
        const { title, description, completed } = req.body;
        
        if (!title && !description && completed === undefined) {
            return res.status(400).json({ error: 'Provide at least one field to update' });
        }
        
        const updatedTask = await Task.update(req.params.id, { title, description, completed });
        
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
}

async function deleteTask(req, res, next) {
    try {
        const deletedTask = await Task.delete(req.params.id);
        
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};