import { Slider } from '@mui/material';
import React from 'react';
import './css/allprod.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadAllProduct } from '../../redux/actions/productaction';
import AllprodCard from '../../components/card/AllprodCard';
import { useState } from 'react';
import Footer from '../../components/footer/Footer';
import axios from 'axios';

const Allproducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [category, setCategory] = useState('all');
  const [price, setPrice] = useState(500000);
  const [brand, setBrand] = useState('all');
  const [cat, setCat] = useState([]);
  async function getbrand() {
    const { data } = await axios.get(
      `https://mern-helmart-website.vercel.app/api/v1/getbrand`
    );
    if (data) {
      setCat(data);
    }
  }
  useEffect(() => {
    dispatch(loadAllProduct(category, price, brand));
    cat.length === 0 && getbrand();
  }, [dispatch, category, price, brand, cat]);
  return (
    <>
      <div className="all-prod">
        <div className="all-title">
          <h2>Our Products</h2>
        </div>
        <div className="filters">
          <div className="all-cat">
            <h2>Category: </h2>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All</option>
              <option value="MEN">MEN</option>
              <option value="WOMEN">WOMEN</option>
              <option value="MOUNTAIN">DIRT</option>
              <option value="HALF">HALF</option>
              <option value="FULL">FULL</option>
              <option value="BIKE">BIKE</option>
              <option value="SPORTS">SPORTS</option>
              <option value="SCOTY">SCOTY</option>
            </select>
          </div>
          <div className="all-price">
            <h2>Price Range: </h2>
            <select onChange={(e) => setPrice(e.target.value)}>
              <option value="500000">--</option>
              <option value="10000">Below 10000</option>
              <option value="15000">Below 15000</option>
              <option value="20000">Below 20000</option>
              <option value="40000">Below 40000</option>
              <option value="100000">Below 100000</option>
            </select>
          </div>
          <div className="all-brand">
            <h2>Brands: </h2>
            <select onChange={(e) => setBrand(e.target.value)}>
              <option value="all">All</option>
              {cat &&
                cat.map((ele) => {
                  return (
                    <option value={ele} key={ele}>
                      {ele}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="all-prodcard">
          {products.prod && products.prod.length > 0 ? (
            products.prod.map((x) => {
              return <AllprodCard x={x} />;
            })
          ) : (
            <h1>No Products Found</h1>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Allproducts;
