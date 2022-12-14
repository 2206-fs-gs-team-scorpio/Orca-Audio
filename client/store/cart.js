import axios from "axios";

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const RESET_CART = "RESET_CART";
const INCLUDE_ORDERID = "INCLUDE_ORDERID";
const SET_CART = "SET_CART";

export function addToCart(product, decrement = false) {
  return { type: ADD_TO_CART, product, decrement };
}
export function removeFromCart(product) {
  return { type: REMOVE_FROM_CART, product };
}
export function resetCart() {
  return { type: RESET_CART };
}
export function includeOrderId(orderId) {
  return { type: INCLUDE_ORDERID, orderId };
}
export function setCart(cart) {
  return { type: SET_CART, cart };
}

const initialState = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

export const resetCartThunk = (product, orderId) => async (dispatch) => {
  try {
    // const res =
    //   await axios.delete(`/api/orders/delete/${orderId}/product-delete/${product.productId}
    // `);
    // dispatch(removeFromCart(product));
  } catch (error) {
    console.log(error);
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = { ...action.product, quantity: 1 };

      const sameProductInCart = state.some(
        (product) => product.id === addedProduct.id
      );

      const updatedCart = sameProductInCart
        ? state.map((product) => {
            return product.id === addedProduct.id
              ? action.decrement
                ? { ...product, quantity: product.quantity - 1 }
                : { ...product, quantity: product.quantity + 1 }
              : product;
          })
        : [...state, addedProduct];

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      return updatedCart;

    case REMOVE_FROM_CART:
      const itemToBeRemoved = action.product;

      console.log(itemToBeRemoved);

      let removedCart = state.filter(
        (product) => product.id !== itemToBeRemoved.id
      );

      localStorage.setItem("cartItems", JSON.stringify(removedCart));

      return removedCart;

    case RESET_CART:
      localStorage.setItem("cartItems", JSON.stringify([]));
      return [];

    case SET_CART:
      return action.cart;

    case INCLUDE_ORDERID:
      const orderIdAddedState = action.orderId
        ? state.map((product) => {
            return { ...product, orderId: action.orderId };
          })
        : state;

      return orderIdAddedState;

    default:
      return state;
  }
}
