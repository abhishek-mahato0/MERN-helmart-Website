const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      fullname: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: true,
      },
    },
    products: [],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'processing',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model('Order', orderSchema);
module.exports = Orders;
