import allReducers from "./allReducers";
// import { legacy_createStore as createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";


// const store = createStore(
//    allReducers ,
//   applyMiddleware(thunk)
// )
// export default store

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

export const store = configureStore(
    { reducer: allReducers}
    )

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
