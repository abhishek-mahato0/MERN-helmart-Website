import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import axios from 'axios';
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router';
import '../css/productcard.css';
const Prodcard = ({ x }) => {
  const navigate = useNavigate();
  const deleteProd = async () => {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/delete/${x._id}`
    );
    alert(data.message);
    navigate('/adminpanel');
  };

  return (
    <div className="ad-prod-card">
      <Link to={`/update/${x._id}`} className="prod-link">
        <div className="ad-prod-img">
          <img src={x.img[0].url} alt="prodimg"></img>
        </div>
      </Link>
      <div className="ad-prod-name">
        <p className="ad-prod-title">{x.name}</p>
      </div>
      <div className="ad-rating">
        {Array(x.rating)
          .fill(0)
          .map((x) => {
            return (
              <p key="x">
                <AiFillStar />
              </p>
            );
          })}
        ({x.reviews.length})
      </div>
      <div className="ad-prod-price">
        <p className="ad-prod-title">
          Sizes:
          {x.size.map((ele) => {
            return <>{ele.toUpperCase()}</>;
          })}
        </p>
      </div>
      <div className="ad-prod-price">
        <p className="ad-prod-title">
          Colors:
          {x.color.map((ele) => {
            return <>{ele.toUpperCase()}</>;
          })}
        </p>
      </div>
      <div className="ad-prod-price">
        <p className="ad-prod-title">Discount: {x.disc}%</p>
      </div>
      <div className="ad-prod-price">
        <p className="ad-prod-title">Price: Rs. {x.price}</p>
      </div>
      <div className="ad-prod-price">
        <p className="ad-prod-title">Brand: {x.brand}</p>
      </div>
      <div className="ad-prod-price">
        <p className="ad-prod-title">Stocks: {x.stock}</p>
      </div>
      <div className="ad-prod-price">
        <p className="ad-prod-title">Description: {x.desc}</p>
      </div>
      <div className="ad-prod-price">
        <p className="ad-prod-title">Feature: {x.feature}</p>
      </div>
      <div className="ad-cart-btn">
        <button onClick={deleteProd}>Delete Product</button>
      </div>
    </div>
  );
};

export default Prodcard;
