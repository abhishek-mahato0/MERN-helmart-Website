const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      res.status(400).json({ message: 'Log in again' });
    } else {
      const verify = jwt.verify(token, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      req.user = await Users.findById(verify.id);
      next();
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const verifyAdmin = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      res.status(400).json({ message: 'Log in again' });
    } else {
      const verify = jwt.verify(token, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      req.user = await Users.findById(verify.id);
      if (req.user.role === 'admin') {
        next();
      } else {
        res.status(400).json({ message: 'You are not authenticated' });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports = { verifyToken, verifyAdmin };
