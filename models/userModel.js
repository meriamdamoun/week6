const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const bcrypt = require('bcrypt');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const HashPwd = sequelize.define('hashpwd', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Set up association
User.hasOne(HashPwd, { foreignKey: 'username', sourceKey: 'username' });
HashPwd.belongsTo(User, { foreignKey: 'username', targetKey: 'username' });

// Hash password before saving
HashPwd.beforeCreate(async (hashpwd) => {
  const salt = await bcrypt.genSalt(10);
  hashpwd.password = await bcrypt.hash(hashpwd.password, salt);
});

module.exports = { User, HashPwd };