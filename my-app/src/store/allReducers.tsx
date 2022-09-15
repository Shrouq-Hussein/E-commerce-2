import { type } from "@testing-library/user-event/dist/type";
import { combineReducers } from "redux";
import users from "./users/usersSlice";
import products from "./products/products.reducer"
import productsReducer from "./products/productSlice"

const rootReducer = combineReducers({
    users:users,
    products:productsReducer,
});

export default rootReducer;

