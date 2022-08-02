const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://media.istockphoto.com/vectors/headset-icon-music-templates-vector-id1187826963?k=20&m=1187826963&s=612x612&w=0&h=RwruPmaxyRiNzwxHtllG_Omzwa8ky07EOqR95ZRwWbU=',
  },
  shortDescription: {
    type: Sequelize.STRING,
    defaultValue: 'TBD',
  },
  longDescription: {
    type: Sequelize.STRING,
    defaultValue: 'TBD',
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  category: {
    type: Sequelize.ENUM('uncategorized', 'in-ear', 'over-ear'),
    defaultValue: 'uncategorized',
  },
  noiseCancelling: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Product;
