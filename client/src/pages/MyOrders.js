import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import './css/order.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
const Myorder = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const orders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          'https://mern-helmart-website.vercel.app/api/v1/order/my',
          {
            withCredentials: true, // Include cookies and other credentials with the request
          }
        );
        if (data) {
          setOrder(data.orders);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    };
    orders();
  }, []);

  const cancelOrder = async (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message:
        'Are you sure to cancle the order. The process cannot be changed later.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const { data } = await axios.put(
                `https://mern-helmart-website.vercel.app/api/v1/user/cancelorder/${id}`,
                {
                  withCredentials: true,
                }
              );
              if (data) {
                toast.success('Order cancelled successfully');
              }
            } catch (error) {
              toast.error(error.response.data.mesage);
            }
          },
        },
        {
          label: 'No',
          onClick: () => {
            toast.success('Order not canceled.');
          },
        },
      ],
    });
  };
  return (
    <div className={`myorderpage ${loading ? 'blur' : ''}`}>
      {loading && <div className="or-loading"></div>}
      {order && (
        <>
          {order.length === 0 ? (
            <h1>No Orders Place till now</h1>
          ) : (
            order?.map((item) => {
              return (
                <div className="order-main" key={item._id}>
                  <div className="order-first">
                    {item.products.map((it) => {
                      return (
                        <div className="order-single">
                          <div className="order-container">
                            <div className="order-image">
                              <img src={it.img[0].url} alt={it.name}></img>
                            </div>
                            <div className="order-desc">
                              <div className="o-name">
                                <h3>{it.name}</h3>
                              </div>
                              <div className="order-price">
                                <h3>Price: Rs.{it.price}</h3>
                              </div>
                              <div className="order-cat centerv">
                                <h3>
                                  Quantity:
                                  {it.qty}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="order-info">
                    <h3 className="red">Order Info And Status</h3>
                    <h4>Name: {item.shippingInfo.fullname}</h4>
                    <h4>
                      Address: {item.shippingInfo.address},
                      {item.shippingInfo.city}
                    </h4>
                    <h4>Phone: {item.shippingInfo.phone}</h4>
                    <h4>Date: {item.createdAt.split('GMT+0545')}</h4>
                    <h4>Status: "{item.status}"</h4>
                    <h4>Total: Rs.{item.total}</h4>
                    {item.status !== 'canceled' && (
                      <button
                        className="cancel-order"
                        onClick={() => cancelOrder(item._id)}
                      >
                        Cancle Order
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </>
      )}
    </div>
  );
};

export default Myorder;
