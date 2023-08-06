import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { getInduserOrder } from '../../redux/actions/orderActions';
const IndUserOrder = () => {
  const { id } = useParams();
  const [allorder, setAllorder] = useState([]);
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInduserOrder(id));
  }, [id]);

  return (
    <>
      {!loading ? (
        <div className="total-orders">
          <Link className="link red" to="/allusers">
            Go Back
          </Link>
          <div className="allorders">
            {orders.length > 0 ? (
              <>
                {orders.map((ele) => {
                  return (
                    <div className="orderflex">
                      <div className="userInfo">
                        <h3>Shipping Info</h3>
                        <div className="info">
                          <h4>OrderId:{ele._id}</h4>
                          <h4>Name: {ele.shippingInfo.fullname}</h4>
                          <h4>City: {ele.shippingInfo.city}</h4>
                          <h4>Address: {ele.shippingInfo.address}</h4>
                          <h4>Phone: {ele.shippingInfo.phone}</h4>
                        </div>
                      </div>
                      <div className="grid">
                        {ele.products.map((item) => {
                          return (
                            <div className="order-cart">
                              <div className="img">
                                <img src={item.img[0].url} alt="img"></img>
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
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <h1>No Orders Place yet</h1>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default IndUserOrder;
