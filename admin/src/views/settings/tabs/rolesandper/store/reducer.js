import { createSlice } from '@reduxjs/toolkit';

export const permission = createSlice({
  name: 'permission',
  initialState: {
    links: [],
    operatorPermission: {
      loading: false,
      success: false,
      error: null,
      data: null
    },
    userPermission: {
      loading: false,
      success: false,
      error: null,
      data: null
    }
  },
  reducers: {
    getAllLinksSuccess: (state, action) => {
      state.links = action.payload;
    },
    getUserPermissionStart: (state) => {
      state.userPermission.loading = true;
    },
    getUserPermissionSuccess: (state, action) => {
      state.userPermission.loading = false;
      state.userPermission.success = true;
      state.userPermission.data = action?.payload;
    },
    getUserPermissionError: (state, action) => {
      state.userPermission.loading = false;
      state.userPermission.success = false;
      state.userPermission.error = action.payload;
    },
    getOperatorPermissionStart: (state) => {
      state.operatorPermission.loading = true;
    },
    getOperatorPermissionSuccess: (state, action) => {
      state.operatorPermission.loading = false;
      state.operatorPermission.success = true;
      state.operatorPermission.data = action?.payload;
    },
    getOperatorPermissionError: (state, action) => {
      state.operatorPermission.loading = false;
      state.operatorPermission.success = false;
      state.operatorPermission.error = action.payload;
    }
  }
});

export const {
  getAllLinksSuccess,
  // ** User Permission
  getUserPermissionStart,
  getUserPermissionSuccess,
  getUserPermissionError,
  // ** Operator Permission
  getOperatorPermissionStart,
  getOperatorPermissionSuccess,
  getOperatorPermissionError
} = permission.actions;

export default permission.reducer;
