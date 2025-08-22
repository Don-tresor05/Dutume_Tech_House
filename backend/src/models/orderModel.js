const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./userModel');
const Product = require('./productModel');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  status: { 
    type: DataTypes.ENUM('pending', 'shipped', 'delivered'), 
    defaultValue: 'pending' 
  }
});

// Associations
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });
User.hasMany(Order, { foreignKey: 'userId' });
Product.hasMany(Order, { foreignKey: 'productId' });

module.exports = Order;