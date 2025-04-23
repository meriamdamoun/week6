const express = require('express');
const router = express.Router();

// Sample in-memory database for storing to-do items
let todos = [];
let currentId = 1;

// Get all to-do items
router.get('/', (req, res) => {
    res.json(todos);
});

// Add a new to-do item
router.post('/', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }
    
    const newTodo = {
        id: currentId++,
        task,
        completed: false
    };
    
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a to-do item by ID
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { task, completed } = req.body;
    
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    if (task !== undefined) {
        todos[todoIndex].task = task;
    }
    
    if (completed !== undefined) {
        todos[todoIndex].completed = completed;
    }
    
    res.json(todos[todoIndex]);
});

// Delete a to-do item by ID
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).end();
});

module.exports = router;