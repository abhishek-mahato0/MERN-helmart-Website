import {
  CONFIRM_ORDER_FAIL,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  GET_IND_USER_ORDER_FAIL,
  GET_IND_USER_ORDER_SUCCESS,
  SHIPPING_INFO,
} from '../constants/orderConstant';

export const shippingaddress = (state = { shippingAdd: [] }, action) => {
  switch (action.type) {
    case SHIPPING_INFO:
      return {
        loading: false,
        shippingAdd: action.payload,
      };
    default:
      return state;
  }
};

export const orderreducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_IND_USER_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case GET_IND_USER_ORDER_FAIL:
      return {
        loading: true,
      };
    default:
      return state;
  }
};
