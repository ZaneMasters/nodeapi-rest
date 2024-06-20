import { DataTypes } from 'sequelize';
import  sequelize  from '../config/db.js';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'client'),
    allowNull: false
  }
}, {
  timestamps: false
});

export default User;
