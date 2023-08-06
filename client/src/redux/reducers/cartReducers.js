import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_SUCCESS,
  DECREASE_QTY,
  INCREASE_QTY,
  REMOVE_FROM_CART_SUCCESS,
} from '../constants/cartConstsnts';

export const CartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      const item = action.payload;
      return {
        ...state,
        cart: [...state.cart, item],
      };
    case DECREASE_QTY:
      const id = action.payload;
      const exist = state.cart.find((x) => x.id === id);
      if (exist) {
        if (exist.qty > 1) {
          return {
            ...state,
            cart: [
              ...state.cart.map((x) =>
                x.id === id
                  ? {
                      ...exist,
                      qty: exist.qty - 1,
                      total: exist.total - exist.price,
                    }
                  : x
              ),
            ],
          };
        } else {
          return {
            ...state,
            cart: [...state.cart.filter((x) => x.id !== id)],
          };
        }
      }
    // eslint-disable-next-line no-fallthrough
    case INCREASE_QTY:
      const id1 = action.payload;
      const exist1 = state.cart.find((x) => x.id === id1);
      if (exist1) {
        return {
          ...state,
          cart: [
            ...state.cart.map((x) =>
              x.id === id1
                ? { ...x, qty: x.qty + 1, total: x.total + x.price }
                : x
            ),
          ],
        };
      }

    // eslint-disable-next-line no-fallthrough
    case REMOVE_FROM_CART_SUCCESS:
      const id2 = action.payload;
      return {
        ...state,
        cart: [...state.cart.filter((x) => x.id !== id2)],
      };
    case ADD_TO_CART_FAIL:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
