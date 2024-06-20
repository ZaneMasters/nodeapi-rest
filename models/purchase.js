import { DataTypes } from 'sequelize';
import sequelize  from '../config/db.js';
import User from './user.js';
import Product from './product.js';

const Purchase = sequelize.define('Purchase', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false
});

const PurchaseItem = sequelize.define('PurchaseItem', {
  purchaseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Purchase,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false
});

Purchase.hasMany(PurchaseItem, { foreignKey: 'purchaseId' });
PurchaseItem.belongsTo(Purchase, { foreignKey: 'purchaseId' });

export { Purchase, PurchaseItem };
