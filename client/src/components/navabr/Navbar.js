import React from 'react';
import './navbar.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
import Search from './Search';
import { FaUserCircle } from 'react-icons/fa';
import Profile from '../Profile';
import debounce from 'lodash.debounce';
import toast from 'react-hot-toast';
const Navbar = () => {
  const [showser, setShowser] = useState(false);
  const [profile, setProfile] = useState(false);
  const { user } = useSelector((state) => state.userInfo);
  const [items, setItems] = useState('');
  const [produc, setProduc] = useState([]);
  const cart = useSelector((state) => state.cart);
  const [copied, setCopied] = useState(false);
  const loadProd = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/searchproducts?name=${items}`
    );
    if (data) {
      setProduc(data);
    } else {
      setProduc([]);
    }
  };
  const copyemail = () => {
    navigator.clipboard.writeText('abhishek.mahato98258@gmail.com').then(() => {
      setCopied(true);
      toast.success('Email copied to clipboard');
      setTimeout(() => setCopied(false), 1500); // Reset the "copied" state after a brief delay
    });
  };

  useEffect(() => {
    items.length > 4 && loadProd();
    !items && setProduc([]);
  }, [items, axios]);

  const closeSearch = () => {
    setShowser((prev) => !prev);
    setProduc([]);
    setItems('');
  };
  useEffect(() => {
    setProfile(false);
  }, [user]);
  return (
    <div className="nav-container">
      <div className="nav-top-container">
        <div className="left-flex">
          <p>Call Us- 9825878517</p>
          <p className="border-l-r" onClick={() => copyemail()}>
            Email: abhishek.mahato98258@gmail.com
          </p>
        </div>
        {Object.keys(user).length != 0 ? (
          <div
            className="flex user-profile"
            onClick={() => setProfile((prev) => !prev)}
          >
            <FaUserCircle />
          </div>
        ) : (
          <div className="right-flex">
            <NavLink to="/login" exact className="text-white decoration-none">
              SignIn
            </NavLink>
            <NavLink
              to="/register"
              exact
              className="text-white decoration-none"
            >
              SignUp
            </NavLink>
          </div>
        )}
        {Object.keys(user).length != 0 && profile && (
          <Profile setProfile={setProfile} />
        )}
      </div>
      <div className={!showser ? 'middle-container' : 'middle-container-small'}>
        <div className="nav-logo">
          <NavLink to="/" className="logo-img">
            <img src="/images/logo.png" alt="logo"></img>
          </NavLink>
        </div>
        <div className="middle-middle flex-end">
          <NavLink to="/" exact className="decoration-none text-black border-b">
            Home
          </NavLink>
          <NavLink
            to="/products?prod=all"
            exact
            className="decoration-none text-black border-b"
          >
            ALL Products
          </NavLink>
          <NavLink
            to="/about"
            exact
            className="decoration-none text-black border-b"
          >
            About
          </NavLink>
        </div>
        <div className="middle-right flex-center">
          {!showser ? (
            <p className="s-icon" onClick={() => setShowser((prev) => !prev)}>
              <BsSearch />
            </p>
          ) : (
            <div className="search-text flex-center">
              <input
                type="text"
                onChange={(e) => setItems(e.target.value)}
                value={items}
              ></input>
              <h3 className="cross" onClick={() => closeSearch()}>
                <AiFillCloseCircle />
              </h3>
              {produc.length > 0 && (
                <div className="search-class">
                  {produc.map((x) => {
                    return <Search prod={x} setItems={setItems} />;
                  })}
                </div>
              )}
            </div>
          )}
          <div className="cart-icon flex-center">
            <h3 className="cart">
              <NavLink to="/cart" exact className="decoration-none text-black">
                <FaShoppingCart />
              </NavLink>
            </h3>
            <p className="c-len">{cart.cart.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
