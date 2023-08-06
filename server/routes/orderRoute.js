const Products = require('../models/productModel');
const Orders = require('../models/orderModel');
const { verifyAdmin, verifyToken } = require('../auth/verify');
const Users = require('../models/userModel');

const orderRoute = require('express').Router();

//posting order by user
orderRoute.post('/orders', verifyToken, async (req, res) => {
  try {
    const { _id } = req.user;
    const { shippingInfo, products, total } = req.body;
    if (!shippingInfo || !products || !total) {
      res.status(401).json({ message: 'Please fill the requires fields' });
    } else {
      const user = await Users.findById(_id);
      if (user) {
        const order = new Orders({
          shippingInfo,
          products,
          total,
          user: _id,
        });
        const createdorder = await order.save();
        products.forEach(async (element) => {
          const product = await Products.findById({ _id: element.id });
          if (product.stock > 0) {
            product.stock = product.stock - element.qty;
            await product.save();
          } else {
            res.status(400).json({ message: 'Product Out of Stock' });
          }
        });
        res.status(200).json({ createdorder });
      } else {
        res.status(400).json({ message: 'Please login' });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//admin view all orders
orderRoute.get('/admin/allorders', verifyAdmin, async (req, res) => {
  try {
    const adminorders = await Orders.find();
    res.status(200).json(adminorders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//deleting order by admin
orderRoute.delete('/admin/deleteorder/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findByIdAndDelete(id);
    if (order) {
      res.status(200).json({ message: 'Order deleted successsfully' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get order of individual user
orderRoute.get('/admin/induser/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const indorders = await Orders.find({ user: id });
    res.status(200).json({ orders: indorders });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get individual user all orders
orderRoute.get('/order/my', verifyToken, async (req, res) => {
  try {
    const { _id } = req.user;
    const indorders = await Orders.find({ user: _id });
    res.status(200).json({ orders: indorders });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//cancel order for user
orderRoute.put('/user/cancelorder/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findByIdAndUpdate(
      id,
      { status: 'canceled' },
      { new: true }
    );
    if (order) {
      res.status(200).json({ message: 'Order canceled successsfully' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//update order for admin
orderRoute.put('/admin/updateorder/:id', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const order = await Orders.findByIdAndUpdate(id, { status }, { new: true });
    if (order) {
      res.status(200).json({ message: 'Order updated successsfully' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = orderRoute;
