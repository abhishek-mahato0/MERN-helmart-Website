import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CartCard from '../../components/card/CartCard';
import Footer from '../../components/footer/Footer';
import './css/cartpage.css';

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  let sub = 0;
  return (
    <div className="cart-page-container">
      <div className="cart-page-heading">
        <h1 className="cart-page-title">Your Cart</h1>
      </div>
      <div className="cart-page-main">
        <h1>Products</h1>
        <h1>Name</h1>
        <h1>Quantity</h1>
        <h1>Brand</h1>
        <h1>Total</h1>
        <h1> </h1>
      </div>
      {cart.cart.length == 0 ? (
        <div className="empty-message">
          <h1>Your Cart is Empty</h1>
          <NavLink to="/products" className="navlink">
            Continue Shopping
          </NavLink>
        </div>
      ) : (
        <>
          <div className="cart-page-items">
            {cart.cart.map((prod) => {
              sub = sub + prod.total;
              return <CartCard x={prod ? prod : []} />;
            })}
          </div>
          <div className="cart-total">
            <div className="total-price">
              <h2>Subtotal: Rs. {sub}</h2>
              <h2>Delivery Charge: Rs. 100</h2>
              <h2>Total: Rs. {sub + 100}</h2>
            </div>
          </div>
          <div className="proceed-btn">
            <NavLink to="/details" className="proceed">
              Proceed To Checkout
            </NavLink>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default CartPage;
