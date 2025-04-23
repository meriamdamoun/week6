const User = require('../models/user');

// Define the controller methods
const userController = {
  // Register a new user
  async register(req, res) {
    try {
      const { firstName, lastName, email, username, password } = req.body;
      
      // Validate input
      if (!firstName || !lastName || !email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // Create user
      const user = await User.create({
        firstName,
        lastName,
        email,
        username,
        password
      });
      
      res.status(201).json({
        message: `User ${username} registered successfully!`,
        user
      });
    } catch (error) {
      if (error.message === 'Username already exists' || error.message === 'Email already exists') {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error registering user' });
    }
  },

  // Login a user
  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      // Validate input
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      
      // Verify credentials
      const user = await User.verifyCredentials(username, password);
      
      res.status(200).json({
        message: `Welcome back, ${user.firstName}!`,
        user
      });
    } catch (error) {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  },

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.getAll();
      // Remove passwords from response
      const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.status(200).json(usersWithoutPasswords);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users' });
    }
  },

  // Get user by ID
  async getUserById(req, res) {
    try {
      const user = await User.getById(req.params.id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user' });
    }
  },

  // Update user
  async updateUser(req, res) {
    try {
      const { firstName, lastName, email } = req.body;
      const updatedUser = await User.update(req.params.id, {
        firstName,
        lastName,
        email
      });
      
      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser
      });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error updating user' });
    }
  }
};

module.exports = userController;