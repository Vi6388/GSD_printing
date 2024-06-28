import { createSlice } from '@reduxjs/toolkit';

export const userData = createSlice({
  name: 'userData',
  initialState: {
    userList: [],
    userListSearchedId: []
  },
  reducers: {
    fetchUserData: (state, action) => {
      state.userList = action?.payload;
    },
    userDataId: (state, action) => {
      state.userListSearchedId = action?.payload;
    }
  }
});
export const { fetchUserData, userDataId } = userData.actions;

export default userData.reducer;
