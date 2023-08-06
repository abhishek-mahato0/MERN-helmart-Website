import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  loadnewreducer,
  loadproductreducer,
  loadrelatedproductreducer,
  loadsingleproductreducer,
  loadtopreducer,
  loadtrendingreducer,
} from './redux/reducers/Productreducers';
import { loadrelatedProduct } from './redux/actions/productaction';
import { CartReducer } from './redux/reducers/cartReducers';
import { orderreducer, shippingaddress } from './redux/reducers/orderReducers';
import {
  loadadminordersreducer,
  loadadminproductreducer,
} from './redux/reducers/adminReducer';
import { loginreducer } from './redux/reducers/userReducers';
const reducers = combineReducers({
  products: loadproductreducer,
  singleprod: loadsingleproductreducer,
  related: loadrelatedproductreducer,
  cart: CartReducer,
  top: loadtopreducer,
  trending: loadtrendingreducer,
  new: loadnewreducer,
  shipping: shippingaddress,
  orders: orderreducer,
  adminProd: loadadminproductreducer,
  adminOrders: loadadminordersreducer,
  userInfo: loginreducer,
});

const middleware = [thunk];
let initialState = {
  userInfo: {
    user: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : {},
  },
  cart: {
    cart: localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [],
  },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
