import axios from 'axios';
import {
  LOAD_ADMIN_PRODUCTS_FAILED,
  LOAD_ADMIN_PRODUCTS_REQUEST,
  LOAD_ADMIN_PRODUCTS_SUCCESS,
  VIEW_ADMIN_ORDERS_FAILED,
  VIEW_ADMIN_ORDERS_REQUEST,
  VIEW_ADMIN_ORDERS_SUCCESS,
} from '../constants/adminConstants';

export const loadadminproduct =
  (category, price, brand) => async (dispatch) => {
    dispatch({
      type: LOAD_ADMIN_PRODUCTS_REQUEST,
    });
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/admin/products?category=${category}&price=${price}&brand=${brand}`
      );
      dispatch({
        type: LOAD_ADMIN_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_ADMIN_PRODUCTS_FAILED,
        payload: error.message,
      });
    }
  };

export const viewadminorders = () => async (dispatch) => {
  dispatch({
    type: VIEW_ADMIN_ORDERS_REQUEST,
  });
  try {
    const res = await axios.get(`http://localhost:4000/api/v1/admin/allorders`);
    dispatch({
      type: VIEW_ADMIN_ORDERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: VIEW_ADMIN_ORDERS_FAILED,
      payload: error.message,
    });
  }
};
