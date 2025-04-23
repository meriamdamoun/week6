const fs = require('fs').promises;
const path = require('path');

async function initialize() {
  const dataDir = path.join(__dirname, 'data');
  const usersFile = path.join(dataDir, 'users.json');
  
  try {
    // Check if the data directory exists
    try {
      await fs.access(dataDir);
    } catch (err) {
      // Create the data directory if it doesn't exist
      await fs.mkdir(dataDir, { recursive: true });
      console.log('Created data directory');
    }
    
    // Check if users.json exists
    try {
      await fs.access(usersFile);
      console.log('users.json already exists');
    } catch (err) {
      // Create users.json with an empty array
      await fs.writeFile(usersFile, JSON.stringify([], null, 2));
      console.log('Created users.json with empty array');
    }
    
    console.log('Initialization complete');
  } catch (error) {
    console.error('Initialization failed:', error);
  }
}
