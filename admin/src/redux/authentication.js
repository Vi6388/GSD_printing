// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt';
import axios from 'axios';

const config = useJwt.jwtConfig;

const initialUser = () => {
  const item = window.localStorage.getItem('userData');
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {};
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser(),
    loading: false
  },
  reducers: {
    handleLogin: (state, action) => {
      // console.log('I am from Login', state)
      state.userData = action.payload;
      state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName];
      state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName];
      localStorage.setItem('userData', JSON.stringify(action.payload.userData));
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      // localStorage.setItem(config.storageTokenKeyName, JSON.stringify(action.payload.accessToken));
      // localStorage.setItem(
      //   config.storageRefreshTokenKeyName,
      //   JSON.stringify(action.payload.refreshToken)
      // );
    },
    handleLogout: (state) => {
      state.userData = {};
      state[config.storageTokenKeyName] = null;
      state[config.storageRefreshTokenKeyName] = null;
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData');
      localStorage.removeItem(config.storageTokenKeyName);
      localStorage.removeItem(config.storageRefreshTokenKeyName);
    },
    handleChangeLocation: (state, action) => {
      state.userData.ability = action.payload.ability;
      state.userData.userType = action.payload.userType;
      let userData = JSON.parse(localStorage.getItem('userData'));
      userData.ability = action.payload.ability;
      userData.ability = localStorage.setItem('userData', JSON.stringify(userData));
    },
    handleRoading: (state, action) => {
      state.loading = action.payload.loading;
    }
  }
});

export const { handleLogin, handleLogout, handleChangeLocation, handleRoading } = authSlice.actions;

export default authSlice.reducer;
