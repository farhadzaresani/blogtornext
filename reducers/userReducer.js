import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "users",
  initialState: { currentUser: {} },
  reducers: {
    setUser: (state, action) => {
      if (action.payload._id) {
        state.currentUser = action.payload;
      }
    },
    removeUserData: (state, action) => {
      state.currentUser = {};
    },
  },
});

export const { setUser, removeUserData } = userReducer.actions;
export const selectUser = (state) => state.users.currentUser;
export const thisUser = userReducer.actions.currentUser;
export default userReducer.reducer;
