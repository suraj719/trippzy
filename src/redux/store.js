import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./alerts";

const rootReducer = combineReducers({
  alert: alertSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
