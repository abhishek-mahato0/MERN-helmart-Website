const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
  },
  rating: {
    type: Number,
    default: 5,
    enum: [1, 2, 3, 4, 5],
  },
  price: {
    type: Number,
    required: true,
  },
  disc: {
    type: Number,
    default: 0,
  },
  size: [],
  color: [],
  desc: {
    type: String,
    required: true,
    min: 10,
  },
  brand: {
    type: String,
    default: 'None',
  },
  category: [
    {
      type: String,
      default: 'helmet',
    },
  ],
  stock: {
    type: Number,
    default: 1,
  },
  img: [
    {
      id: { type: String, required: true },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  feature: {
    type: String,
    enum: ['trending', 'top', 'newarrival'],
    default: 'newarrival',
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  reviews: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        requires: true,
      },
      star: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Products = mongoose.model('Products', productSchema);
module.exports = Products;
