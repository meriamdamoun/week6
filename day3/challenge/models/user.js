const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const USERS_FILE = path.join(__dirname, '../data/users.json');
const SALT_ROUNDS = 10;

// Ensure the users.json file exists
async function ensureUsersFile() {
  try {
    await fs.access(USERS_FILE);
  } catch (error) {
    // Create the directory if it doesn't exist
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
    // Create the file with an empty array
    await fs.writeFile(USERS_FILE, JSON.stringify([]));
  }
}

// Read all users from the file
async function readUsers() {
  await ensureUsersFile();
  const data = await fs.readFile(USERS_FILE, 'utf8');
  return JSON.parse(data);
}

// Write users to the file
async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// Generate a unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// User model methods
const User = {
  // Get all users
  async getAll() {
    return await readUsers();
  },

  // Get user by ID
  async getById(id) {
    const users = await readUsers();
    return users.find(user => user.id === id) || null;
  },

  // Get user by username
  async getByUsername(username) {
    const users = await readUsers();
    return users.find(user => user.username === username) || null;
  },

  // Create a new user
  async create(userData) {
    const users = await readUsers();
    
    // Check if username already exists
    if (users.some(user => user.username === userData.username)) {
      throw new Error('Username already exists');
    }
    
    // Check if email already exists
    if (users.some(user => user.email === userData.email)) {
      throw new Error('Email already exists');
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
    
    // Create new user object
    const newUser = {
      id: generateId(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      username: userData.username,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    
    // Add to users array and save
    users.push(newUser);
    await writeUsers(users);
    
    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  // Update user
  async update(id, userData) {
    const users = await readUsers();
    const index = users.findIndex(user => user.id === id);
    
    if (index === -1) {
      throw new Error('User not found');
    }
    
    // Update user data
    const updatedUser = {
      ...users[index],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    // If password is being updated, hash it
    if (userData.password) {
      updatedUser.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
    }
    
    users[index] = updatedUser;
    await writeUsers(users);
    
    // Return user without password
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  },

  // Delete user
  async delete(id) {
    const users = await readUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    
    if (filteredUsers.length === users.length) {
      throw new Error('User not found');
    }
    
    await writeUsers(filteredUsers);
    return true;
  },

  // Verify user credentials
  async verifyCredentials(username, password) {
    const user = await this.getByUsername(username);
    
    if (!user) {
      throw new Error('Invalid username or password');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
};

module.exports = User;