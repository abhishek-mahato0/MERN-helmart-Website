import axios from 'axios';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import toast from 'react-hot-toast';
import { confirmOrder } from '../redux/actions/orderActions';
import './css/confirm.css';
import { useState } from 'react';
import Loading from '../components/Loading';

const ConfirmOrder = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let subtotal = 0;
  const { shippingAdd } = useSelector((state) => state.shipping);
  const { cart } = useSelector((state) => state.cart);
  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        'https://mern-helmart-website.vercel.app/api/v1/orders',
        {
          shippingInfo: shippingAdd,
          products: cart,
          total: subtotal + (13 / 100) * subtotal + 100,
        }
      );
      if (data) {
        toast.success('Order placed successfully');
        navigate('/myorders');
        setLoading(false);
      } else {
        toast.success('Order failed');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Failed. Please try again');
    }
  };
  return (
    <>
      <div className={`placeorder ${loading ? 'blur' : ''}`}>
        <div className="placeorder-main">
          <div className="link">
            <Link to="/details">Go Back</Link>
          </div>
          <div className="all-details">
            <div className="shipping-details">
              <h2>Shipping Information</h2>
              <h3 className="con-flex">
                Name:<p className="con-p">{shippingAdd.fullname}</p>
              </h3>
              <h3 className="con-flex">
                Address: <p className="con-p">{shippingAdd.address}</p>
              </h3>
              <h3 className="con-flex">
                Phone Number: <p className="con-p">{shippingAdd.phone}</p>
              </h3>
              <h3 className="con-flex">
                Note: <p className="con-p">{shippingAdd.note}</p>
              </h3>
            </div>
            <div className="confirm-cart">
              <h2>Items</h2>
              <div className="carts-items">
                {cart.map((item) => {
                  subtotal = subtotal + item.total;
                  return (
                    <div className="pcontainer">
                      <div className="pimg">
                        <img src={item.img[0].url} alt={item.name}></img>
                      </div>
                      <div className="con-flex">{item.name}</div>
                      <div className="con-flex">
                        <h3>Qty:</h3>
                        {item.qty}
                      </div>
                      <div className="con-flex">
                        <h3>Rs. {item.qty * item.price}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="totals">
            <h2>Order Summary</h2>
            <div className="one">
              <div className="prod">
                <h3>No Of Products: {cart.length}</h3>
              </div>
              <div className="payment">
                <h3>Total Item Price: {subtotal}</h3>
              </div>
              <div className="ship">
                <h3>Shipping Charge: Rs.100</h3>
              </div>
              <div className="ship">
                <h3>Tax Charge (15%): {(13 / 100) * subtotal + 100}</h3>
              </div>
            </div>
            <div className="net">
              <h3>Total Payment: {subtotal + (13 / 100) * subtotal + 100}</h3>
            </div>
            <div className="fbtn">
              {loading ? (
                <Loading />
              ) : (
                <button onClick={placeOrderHandler}>Confirm Order</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmOrder;
