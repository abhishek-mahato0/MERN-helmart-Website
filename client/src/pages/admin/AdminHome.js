import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { loadadminproduct } from '../../redux/actions/adminActions';
import Prodcard from './components/Prodcard';
import './css/home.css';
const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, adminProd, message } = useSelector(
    (state) => state.adminProd
  );
  useEffect(() => {
    try {
      dispatch(loadadminproduct('all', 500000, 'all'));
    } catch (error) {
      toast.error('Not authorized');
      navigate('/login');
    }
    if (message === 'failed') {
      toast.error('Not authorized');
      navigate('/login');
    }
  }, []);
  return (
    <div className="admin-home">
      <h1>Admin Panel</h1>
      <div className="admin-container">
        <div className="admin-top">
          <div className="create-btn">
            <button onClick={() => navigate('/createprod')}>Add Product</button>
          </div>
          <div className="admin-orders">
            <button onClick={() => navigate('/allorders')}>View Orders</button>
          </div>
          <div className="create-btn">
            <button onClick={() => navigate('/allusers')}>View Users</button>
          </div>
        </div>
        <div className="admin-prod">
          {adminProd &&
            adminProd.map((x) => {
              return <Prodcard x={x} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
