import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './search.css';

const Search = ({ prod, setItems }) => {
  const navigate = useNavigate();
  const [x, setX] = useState(prod);
  const setLoc = () => {
    navigate(`/single/${x._id}`);
    setItems('');
  };
  return (
    <div className="search-container">
      <div className="s-child" onClick={() => setLoc()}>
        <div className="s-img">
          <img src={x.img[0].url} alt="img"></img>
        </div>
        <div className="col">
          <div className="s-name">
            <h1>{x.name}</h1>
          </div>
          <div className="s-price">
            <h1>Price: Rs. {x.price}</h1>
          </div>
          <div className="s-desc">
            <h1>Brand: {x.brand.toUpperCase()}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
