const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, '../../tasks.json');

async function readTasks() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await writeTasks([]);
            return [];
        }
        throw error;
    }
}

async function writeTasks(tasks) {
    await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2), 'utf8');
}

module.exports = {
    readTasks,
    writeTasks
};