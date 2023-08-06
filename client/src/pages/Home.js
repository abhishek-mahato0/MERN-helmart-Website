import React from 'react';
import Card from '../components/card/Card';
import Crousel from '../components/crousel/Crousel';
import Footer from '../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  loadAllProduct,
  newProduct,
  topProduct,
  trendingProduct,
} from '../redux/actions/productaction';
import { useState } from 'react';
const Home = () => {
  const dispatch = useDispatch();
  const top = useSelector((state) => state.top);
  const trending = useSelector((state) => state.trending);
  const newprod = useSelector((state) => state.new);

  useEffect(() => {
    dispatch(topProduct());
    dispatch(trendingProduct());
    dispatch(newProduct());
  }, [dispatch]);
  return (
    <div className="home-page">
      <Crousel />
      <div className="trending">
        <h1 className="title">Trending Items</h1>
        <div className="card-div">
          {trending.prod ? (
            trending.prod.map((x) => {
              return <Card x={x} />;
            })
          ) : (
            <>
              <h1>"No Products"</h1>
            </>
          )}
        </div>
      </div>
      <div className="top">
        <h1 className="title">Top Selling</h1>
        <div className="card-div">
          {top.prod ? (
            top.prod.map((x) => {
              return <Card x={x} />;
            })
          ) : (
            <>
              <h1>"No Products Added"</h1>
            </>
          )}
        </div>
      </div>
      <div className="new-arrival">
        <h1 className="title">New Arrival</h1>
        <div className="card-div">
          {newprod.prod ? (
            newprod.prod.map((x) => {
              return <Card x={x} />;
            })
          ) : (
            <>
              <h1>"No Products"</h1>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
