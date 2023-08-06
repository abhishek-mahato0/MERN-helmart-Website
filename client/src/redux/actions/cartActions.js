import axios from 'axios';
import {
  ADD_TO_CART_SUCCESS,
  DECREASE_QTY,
  INCREASE_QTY,
  REMOVE_FROM_CART_SUCCESS,
} from '../constants/cartConstsnts';

export const addtocart = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `https://mern-helmart-website.vercel.app/api/v1/product/${id}`
  );
  const amt = (data.disc * data.price) / 100;
  dispatch({
    type: ADD_TO_CART_SUCCESS,
    payload: {
      id: id,
      name: data.name,
      price: data.price - amt,
      img: data.img,
      brand: data.brand,
      qty: 1,
      total: data.price - amt,
    },
  });
  localStorage.setItem('cart', JSON.stringify(getState().cart.cart));
};
export const removeFromcart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART_SUCCESS,
    payload: id,
  });
};

export const decreaseQty = (id) => async (dispatch, getState) => {
  dispatch({
    type: DECREASE_QTY,
    payload: id,
  });
};

export const increaseQty = (id) => async (dispatch, getState) => {
  dispatch({
    type: INCREASE_QTY,
    payload: id,
  });
};
