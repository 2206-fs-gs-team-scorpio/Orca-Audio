import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import singleProduct from "./singleProduct";
import products from "./products";
import cart from "./cart";
import cartDB from "./cartDB";
import users from "./users";
import shipping from "./shipping";

const reducer = combineReducers({
  auth,
  singleProduct,
  products,
  cart,
  cartDB,
  users,
  shipping,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
