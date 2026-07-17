import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { _id: null, username: null, firstname: null, token: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value._id = action.payload._id;
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
      state.value.token = action.payload.token;
    },
    logout: (state) => {
      state.value._id = null;
      state.value.username = null;
      state.value.firstname = null;
      state.value.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;