import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addtocart, removeFromcart } from '../../redux/actions/cartActions';
const AllprodCard = ({ x }) => {
  const dispatch = useDispatch();
  const [showatcb, setShowatcb] = useState(true);
  const cart = useSelector((state) => state.cart);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checking = () => {
    const found = cart.cart.find((ele) => ele.id === x._id);
    found ? setShowatcb(false) : setShowatcb(true);
  };
  const addToCart = (id) => {
    dispatch(addtocart(id));
  };
  const removeFromCart = (id) => {
    dispatch(removeFromcart(id));
  };
  useEffect(() => {
    x && cart.cart.length > 0 ? checking() : setShowatcb(true);
  }, [cart, x, checking]);
  return (
    <div className="prod-card">
      <Link to={`/single/${x._id}`} className="prod-link">
        <div className="prod-img">
          <img src={x.img[0].url} alt="images"></img>
        </div>
      </Link>
      <div className="prod-name">
        <p className="prod-title">{x.name}</p>
      </div>
      <div className="rating">
        {Array(x.rating)
          .fill(0)
          .map((x) => {
            return (
              <p className="stars">
                <AiFillStar />
              </p>
            );
          })}
        ({x.reviews.length} reviews)
      </div>
      <div className="prod-price">
        {x.disc > 0 ? (
          <p className="prod-title">
            Rs.
            <span className="underline">{x.price}</span>
            <span>{x.price - (x.disc * x.price) / 100}</span>
          </p>
        ) : (
          <p className="prod-title">Rs. {x.price}</p>
        )}
      </div>
      <div className="prod-price">
        <p className="prod-title">Brand: {x.brand}</p>
      </div>

      {showatcb ? (
        x.stock > 0 ? (
          <div className="cart-btn">
            <button onClick={() => addToCart(x._id)}>Add To cart</button>
          </div>
        ) : (
          <div className="cart-btn">
            <button>Out of Stock</button>
          </div>
        )
      ) : (
        <div className="cart-btn">
          <button onClick={() => removeFromCart(x._id)}>
            Remove From Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default AllprodCard;
