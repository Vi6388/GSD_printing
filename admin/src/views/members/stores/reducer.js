import { createSlice } from '@reduxjs/toolkit';

export const memberContact = createSlice({
  name: 'memberContact',
  initialState: {
    // Add new Client Contact
    ismemberContactLoading: false,
    ismemberErrors: false,

    members: {
      isLoading: false,
      isSuccess: false,
      data: [],
      error: null
    }
  },
  reducers: {
    // Add new client Contact
    memberContactFetchStart: (state) => {
      state.ismemberContactLoading = true;
      state.members.isSuccess = false;
    },
    memberContactFetchSuccess: (state, action) => {
      state.ismemberContactLoading = false;
      state.members.data = action.payload;
      state.members.isSuccess = true;
    },
    memberContactFetchError: (state, action) => {
      state.ismemberContactLoading = false;
      state.members.isSuccess = false;
    }
  }
});

//
// updateBillingInfo

export const { memberContactFetchStart, memberContactFetchSuccess, memberContactFetchError } =
  memberContact.actions;

export default memberContact.reducer;
