import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  login: (userData) => {},
  logout: () => {},
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = { ...action.payload };
    },
    logout(state) {
      state.user = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
const auth = authSlice.reducers;
export default auth;