import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./alerts";
import { userSlice } from "./user";

const rootReducer = combineReducers({
  alert: alertSlice.reducer,
  user: userSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
