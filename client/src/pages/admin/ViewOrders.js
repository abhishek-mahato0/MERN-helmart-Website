import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { viewadminorders } from '../../redux/actions/adminActions';
import './css/vieworder.css';
const ViewOrders = () => {
  const { loading, adminorders } = useSelector((state) => state.adminOrders);
  let count = 0;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewadminorders());
  }, []);
  // total completed orders
  const sold =
    adminorders &&
    adminorders.reduce(
      (prev, curr) => curr.status === 'completed' && prev + curr.total,
      0
    );

  //total orders places
  const Total =
    adminorders && adminorders.reduce((prev, curr) => prev + curr.total, 0);

  const procTotal = Total - sold;

  //total prodessing orders
  adminorders &&
    adminorders.map((ele) =>
      ele.status === 'processing' ? (count = count + 1) : ''
    );
  const deleteOrder = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/admin/deleteorder/${id}`,
        {
          withCredentials: true,
        }
      );
      if (data) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/admin/updateorder/${id}`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );
      if (data) {
        toast.success('Order updated successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="order-container">
      {loading ? (
        <div className="loading">
          <Loading />
        </div>
      ) : (
        <div className="adminOrders">
          {adminorders && adminorders.length > 0 ? (
            <>
              <Link to="/adminpanel" className="link">
                <h3 className="red">Go Back</h3>
              </Link>
              <div className="adminorder-info">
                <h2>
                  Total sold:
                  {'sold'}
                </h2>
                <h2>Total Orders: {adminorders.length}</h2>
                <h2>Processing Orders: {count}</h2>
                <h2>Processing total: Rs {procTotal}</h2>
              </div>
              <div className="allorders">
                <h1 className="red">Processing Orders</h1>
                {adminorders &&
                  adminorders.map((ele) => {
                    return (
                      <>
                        {ele.status === 'processing' && (
                          <div className="processing">
                            {
                              <div className="userInfo">
                                <h3>Shipping Info</h3>
                                <div className="info">
                                  <h4>OrderId:{ele._id}</h4>
                                  <h4>Name: {ele.shippingInfo.fullname}</h4>
                                  <h4>Address: {ele.shippingInfo.address}</h4>
                                  <h4>Phone: {ele.shippingInfo.phone}</h4>
                                  <h4>Note: {ele.shippingInfo.note}</h4>
                                </div>
                              </div>
                            }
                            <div className="grid">
                              {ele.products.map((item) => {
                                return (
                                  <div className="order-cart">
                                    <div className="img">
                                      <img
                                        src={item.img[0].url}
                                        alt="img"
                                      ></img>
                                    </div>
                                    <div className="name">
                                      <h4>Product Name: {item.name}</h4>
                                      <h4>Price: {item.price}</h4>
                                      <h4>Qty: {item.qty}</h4>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="order-status">
                              <h3>Total: {ele.total}</h3>
                              <h3>Status: {ele.status}</h3>
                              <div className="com-btn">
                                <button
                                  className="mt-10"
                                  onClick={() =>
                                    updateStatus(ele._id, 'completed')
                                  }
                                >
                                  Click to complete order
                                </button>
                                <button onClick={() => deleteOrder(ele._id)}>
                                  Delete order
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}

                <div className="completed">
                  <h1 className="green">Completed Orders</h1>

                  {adminorders &&
                    adminorders.map((ele) => {
                      return (
                        <>
                          {ele.status !== 'processing' && (
                            <div className="processing">
                              {
                                <div className="userInfo">
                                  <h3>Shipping Info</h3>
                                  <div className="info">
                                    <h4>Name: {ele.shippingInfo.fullname}</h4>
                                    <h4>City: {ele.shippingInfo.city}</h4>
                                    <h4>Address: {ele.shippingInfo.address}</h4>
                                    <h4>Phone: {ele.shippingInfo.phone}</h4>
                                    <h4>Note: {ele.shippingInfo.note}</h4>
                                  </div>
                                </div>
                              }
                              <div className="grid">
                                {ele.products.map((item) => {
                                  return (
                                    <div className="order-cart">
                                      <div className="img">
                                        <img
                                          src={item.img[0].url}
                                          alt="img"
                                        ></img>
                                      </div>
                                      <div className="name">
                                        <h4>Product Name: {item.name}</h4>
                                        <h4>Price: {item.price}</h4>
                                        <h4>Qty: {item.qty}</h4>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="order-status">
                                <h3>Total: {ele.total}</h3>
                                <h3>Status: {ele.status}</h3>
                                <div className="com-btn">
                                  <button
                                    className="green"
                                    onClick={() =>
                                      updateStatus(ele._id, 'processing')
                                    }
                                  >
                                    Click to process order
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })}
                </div>
              </div>
            </>
          ) : (
            <h1>No Orders Yet</h1>
          )}
          <Toaster />
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
