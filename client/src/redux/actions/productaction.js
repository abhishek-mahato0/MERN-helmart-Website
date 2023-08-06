import axios from 'axios';
import {
  LOAD_NEW_FAIL,
  LOAD_NEW_REQUEST,
  LOAD_NEW_SUCCESS,
  LOAD_PRO_FAIL,
  LOAD_PRO_REQUEST,
  LOAD_PRO_SUCCESS,
  LOAD_RELATED_FAIL,
  LOAD_RELATED_REQUEST,
  LOAD_RELATED_SUCCESS,
  LOAD_SINGLE_FAIL,
  LOAD_SINGLE_REQUEST,
  LOAD_SINGLE_SUCCESS,
  LOAD_TOP_FAIL,
  LOAD_TOP_REQUEST,
  LOAD_TOP_SUCCESS,
  LOAD_TRENDING_FAIL,
  LOAD_TRENDING_REQUEST,
  LOAD_TRENDING_SUCCESS,
} from '../constants/productConstants';

export const loadAllProduct = (category, price, brand) => async (dispatch) => {
  dispatch({
    type: LOAD_PRO_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/products?category=${category}&price=${price}&brand=${brand}`
    );
    dispatch({
      type: LOAD_PRO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_PRO_FAIL,
      payload: error,
    });
  }
};

export const loadsingleProduct = (id) => async (dispatch) => {
  dispatch({
    type: LOAD_SINGLE_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/product/${id}`
    );

    dispatch({
      type: LOAD_SINGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_SINGLE_FAIL,
      payload: error,
    });
  }
};

export const loadrelatedProduct = (id) => async (dispatch) => {
  dispatch({
    type: LOAD_RELATED_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/relatedproduct/${id}`
    );

    dispatch({
      type: LOAD_RELATED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_RELATED_FAIL,
      payload: error,
    });
  }
};

export const topProduct = () => async (dispatch) => {
  dispatch({
    type: LOAD_TOP_REQUEST,
  });
  try {
    const { data } = await axios.get(
      'http://localhost:4000/api/v1/topproducts'
    );
    dispatch({
      type: LOAD_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_TOP_FAIL,
      payload: error,
    });
  }
};
export const trendingProduct = () => async (dispatch) => {
  dispatch({
    type: LOAD_TRENDING_REQUEST,
  });
  try {
    const { data } = await axios.get(
      'http://localhost:4000/api/v1/trendingproducts'
    );
    dispatch({
      type: LOAD_TRENDING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_TRENDING_FAIL,
      payload: error,
    });
  }
};

export const newProduct = () => async (dispatch) => {
  dispatch({
    type: LOAD_NEW_REQUEST,
  });
  try {
    const { data } = await axios.get(
      'http://localhost:4000/api/v1/newproducts'
    );
    dispatch({
      type: LOAD_NEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_NEW_FAIL,
      payload: error,
    });
  }
};

export const searchParameter = () => (dispatch) => {};
