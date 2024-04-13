import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    Setuser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { Setuser } = userSlice.actions;
