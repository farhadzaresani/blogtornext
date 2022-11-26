import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: { currentUser: {} },
  reducers: {
    setUser: (state, action) => {
      if (action.payload._id) state.currentUser = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.users.currentUser;
export const thisUser = userSlice.actions.currentUser;
export default userSlice.reducer;
