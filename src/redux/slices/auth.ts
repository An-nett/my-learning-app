import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const authSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const actions = authSlice.actions;
export default authSlice;
