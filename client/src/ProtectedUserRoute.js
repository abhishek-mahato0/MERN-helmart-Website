import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Navigate, Route } from 'react-router-dom';

const ProtectedUserRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userInfo);
  const { cart } = useSelector((state) => state.cart);
  let location = useLocation();

  if (!user._id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (cart.length == 0) {
    return <Navigate to="/cart" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedUserRoute;
