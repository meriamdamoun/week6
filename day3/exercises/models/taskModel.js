const { readTasks, writeTasks } = require('../config/db');

class Task {
    static async getAll() {
        return await readTasks();
    }

    static async getById(id) {
        const tasks = await readTasks();
        return tasks.find(task => task.id === id);
    }

    static async create(taskData) {
        const tasks = await readTasks();
        const newTask = {
            id: Date.now().toString(),
            ...taskData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        tasks.push(newTask);
        await writeTasks(tasks);
        return newTask;
    }

    static async update(id, updateData) {
        const tasks = await readTasks();
        const taskIndex = tasks.findIndex(task => task.id === id);
        
        if (taskIndex === -1) return null;
        
        const updatedTask = {
            ...tasks[taskIndex],
            ...updateData,
            updatedAt: new Date().toISOString()
        };
        
        tasks[taskIndex] = updatedTask;
        await writeTasks(tasks);
        return updatedTask;
    }

    static async delete(id) {
        const tasks = await readTasks();
        const taskIndex = tasks.findIndex(task => task.id === id);
        
        if (taskIndex === -1) return null;
        
        const deletedTask = tasks.splice(taskIndex, 1);
        await writeTasks(tasks);
        return deletedTask[0];
    }
}

module.exports = Task;