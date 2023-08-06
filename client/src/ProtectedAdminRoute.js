import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Navigate, Route } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userInfo);
  let location = useLocation();

  if (user.role !== 'admin') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedAdminRoute;
