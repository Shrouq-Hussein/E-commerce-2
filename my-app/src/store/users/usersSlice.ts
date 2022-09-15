import { createAsyncThunk, createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { userLoginService } from './users.services';
import { Product } from '../typesIndex';
import { User, CartItem } from "../typesIndex"
import{store} from "../store"

const users: Array<User> = [
  {
    "id": 1,
    "email": "john@gmail.com",
    "username": "johnd",
    "password": "m38rmF$",
    "name": { "firstname": "john", "lastname": "doe" },
    "phone": "1-570-236-7033",
    "address": {
      "geolocation":
      {
        "lat": "-37.3159",
        "long": "81.1496"
      },
      "city": "kilcoole",
      "street": "new road",
      "number": 7682,
      "zipcode": "12926-3874"
    },
    "cart": []
  }

]
export interface UserState {
  isLoading: boolean,
  currentUser: User,
  errorMessage: string,
  token: string,
  cart: Array<CartItem>,
  AllUsers: Array<User>,
}
// { "address": { "geolocation": { "lat": "-37.3159", "long": "81.1496" }, "city": "kilcoole", "street": "new road", "number": 7682, "zipcode": "12926-3874" }, "id": 1, "email": "john@gmail.com", "username": "johnd", "password": "m38rmF$", "name": { "firstname": "john", "lastname": "doe" }, "phone": "1-570-236-7033", "cart": [] }
const initialState: UserState = {
  isLoading: false,
  currentUser: {},
  errorMessage: "",
  token: "",
  cart: [],
  AllUsers: users,
};

export const userLoginAsync = createAsyncThunk(
  'users/userLogin',
  async (body: { userName: string, password: string }) => {
    console.log("userLoginAsync")
    const response = await userLoginService(body);
    console.log(response.data)
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);




export const UsersSlice = createSlice({
  name: 'Users',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    userLogin: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = action.payload;
    },
    addtoCart: (state, action: PayloadAction<CartItem>) => {
      console.log("addtoCart", action.payload)
      if (action.payload.quantity && action.payload.quantity === 1) {
        if (state.currentUser.cart) {
          state.cart = state.cart.concat(action.payload);
          state.currentUser.cart = state.currentUser.cart.concat(action.payload);
        }

      }
      else if (action.payload.quantity && action.payload.quantity > 1) {

        if (state.currentUser.cart) {
          const incItem = state.currentUser.cart.filter((item) => (item.id === action.payload.id))
          incItem[0].quantity = action.payload.quantity
          const restItems = state.currentUser.cart.filter((item) => (item.id !== action.payload.id))
          state.cart = restItems.concat(incItem[0]);
          state.currentUser.cart = restItems.concat(incItem[0]);
        }

      }
    },
    updateCart: (state, action: PayloadAction<Array<CartItem>>) => {
      if (state.currentUser.cart) {
        state.currentUser.cart = action.payload
      }
      state.cart = action.payload

    }
    ,
    logUserIn: (state, action: PayloadAction<User>) => {
      console.log(state.currentUser)
      state.currentUser = action.payload
      console.log(state.currentUser)
    },
    getCartItems: (state) => {
      state = state
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(userLoginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        console.log("action.payload", action.payload)
      })
      .addCase(userLoginAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { userLogin, addtoCart, updateCart, getCartItems, logUserIn } = UsersSlice.actions;

export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export const selectCurrentUserCart = (state: RootState) => state.users.cart;
export const selectAllUsers = (state: RootState) => state.users.AllUsers

export const addtoUserCart =
  (product: Product): AppThunk =>
    (dispatch, getState) => {
      const currentUser = selectCurrentUser(getState())
      const currentCart = currentUser.cart && currentUser.cart
      if (currentCart) {
        const numOfSameProduct = currentCart.filter((item) => (item.id === product.id))
        console.log("numOfSameProduct", numOfSameProduct)
        let quantity = numOfSameProduct.length >= 1 && numOfSameProduct[0].quantity ? numOfSameProduct[0].quantity + 1 : 1
        console.log("currentCart ", currentCart, " quantity ", quantity)
        dispatch(addtoCart({ ...product, quantity: quantity }));
      }
      else {
        updateCart([])
      }
      console.log(selectCurrentUserCart(getState()))
    };

export const removefromUserCart = (product: Product): AppThunk =>
  (dispatch, getState) => {
    const currentUser = selectCurrentUser(getState())
    const currentCart = currentUser.cart && currentUser.cart
    if (currentCart) {
      const restProducts = currentCart.filter((item) => (item.id !== product.id))
      console.log("restProducts", restProducts)
      dispatch(updateCart(restProducts));
    }
    console.log(selectCurrentUserCart(getState()))
  }


export const userlogin =
  (email: string, password: string): AppThunk =>
    (dispatch, getState) => {
      const allUsers = selectAllUsers(getState())
      const matchedUser = allUsers.filter((user) => (user.email === email))
      if (matchedUser.length === 1) {
        if (matchedUser[0].password === password) {
          console.log("mawgoood", matchedUser[0])
          dispatch(logUserIn(matchedUser[0]))
        }

      }
    };

export default UsersSlice.reducer;
