import { DataTypes } from 'sequelize';
import  sequelize  from '../config/db.js';

const Product = sequelize.define('Product', {
  batchNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  availableQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  entryDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Product;
