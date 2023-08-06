import {
  CONFIRM_ORDER_FAIL,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  GET_IND_USER_ORDER_FAIL,
  GET_IND_USER_ORDER_SUCCESS,
  SHIPPING_INFO,
} from '../constants/orderConstant';
import axios from 'axios';
export const shippingInfo = (fullname, address, phone, note) => (dispatch) => {
  dispatch({
    type: SHIPPING_INFO,
    payload: {
      fullname,
      address,
      phone,
      note,
    },
  });
};

export const confirmOrder = (shipping, cart, total) => async (dispatch) => {
  dispatch({
    type: CONFIRM_ORDER_REQUEST,
  });
  try {
    const { data } = await axios.post(
      'https://mern-helmart-website.vercel.app/api/v1/orders',
      {
        shippingInfo: shipping,
        products: cart,
        total: total,
      }
    );
    dispatch({
      type: CONFIRM_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONFIRM_ORDER_FAIL,
      payload: error,
    });
  }
};

export const getInduserOrder = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://mern-helmart-website.vercel.app/api/v1/admin/induser/${id}`
    );
    if (data) {
      dispatch({
        type: GET_IND_USER_ORDER_SUCCESS,
        payload: data.orders,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_IND_USER_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
