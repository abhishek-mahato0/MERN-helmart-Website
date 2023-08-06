import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  addtocart,
  decreaseQty,
  increaseQty,
  removeFromcart,
} from '../../redux/actions/cartActions';
import './cartcard.css';
const CartCard = ({ x }) => {
  const dispatch = useDispatch();
  const increaseqty = (id) => {
    dispatch(increaseQty(id));
  };
  const decreaseqty = (id) => {
    dispatch(decreaseQty(id));
  };
  const remove = (id) => {
    dispatch(removeFromcart(id));
  };
  return (
    <div className="cart-prod-container">
      <div className="cart-prod">
        <img src={x.img[0].url} alt="prod"></img>
      </div>
      <div className="cart-prod">
        <h2 className="cart-prod-title">{x.name}</h2>
      </div>
      <div className="cart-prod">
        <div className="cart-prod-qty">
          <button onClick={() => increaseqty(x.id)}>
            <h3>+</h3>
          </button>
          <h3 className="cart-prod-num">{x.qty}</h3>
          <button onClick={() => decreaseqty(x.id)}>
            <h3>-</h3>
          </button>
        </div>
      </div>
      <div className="cart-prod">
        <h3 className="cart-prod-brand">{x.brand}</h3>
      </div>
      <div className="cart-prod">
        <h3 className="cart-prod-rup">Rs. {x.price * x.qty}</h3>
      </div>
      <div className="cart-prod">
        <div className="cart-prod-remove" onClick={() => remove(x.id)}>
          <MdDeleteForever />
        </div>
      </div>
    </div>
  );
};

export default CartCard;
