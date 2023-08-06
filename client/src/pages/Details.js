import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Footer from '../components/footer/Footer';
import { shippingInfo } from '../redux/actions/orderActions';

import './css/detail.css';
const Details = () => {
  // const {cart} = useSelector(state=>state.cart)
  // const {shipping} = useSelector(state=>state.shipping)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    const faddress = address + ',' + city;
    dispatch(shippingInfo(fullname, faddress, phone, note));
    navigate('/confirmOrder');
  };
  return (
    <div className="shippingfrom">
      <form className="form" onSubmit={submitHandler}>
        <div className="form-heading">
          <h1>Shipping Details Form</h1>
        </div>
        <div className="form-content">
          <label htmlFor="full name">Full Name</label>
          <input
            type="text"
            id="name"
            value={fullname}
            placeholder="Enter full name"
            onChange={(e) => setFullname(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-content">
          <label htmlFor="city">City Name</label>
          <input
            type="text"
            id="city"
            value={city}
            placeholder="Enter city name"
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-content">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            placeholder="Enter Your Address"
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-content">
          <label htmlFor="number">Phone Number</label>
          <input
            type="number"
            id="number"
            value={phone}
            placeholder="Enter Your Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-content">
          <label htmlFor="number">Notes: </label>
          <input
            type="text"
            id="note"
            value={note}
            placeholder="Like size, color, etc"
            onChange={(e) => setNote(e.target.value)}
            required
          ></input>
        </div>
        <div className="fbtn">
          <button type="submit">Continue...</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Details;
