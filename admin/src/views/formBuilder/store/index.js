// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';
import { ENDPOINTS } from '../../../lib/endpoints';
import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

export const createForm = createAsyncThunk(
  'formBuilder/createForm',
  async (payload, { dispatch }) => {
    console.log('payload:', payload);
    const response = await API.post(ENDPOINTS.CREATE_FORM, payload);
    return {
      data: response.data
    };
  }
);

export const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState: {
    selectedForms: []
  },
  reducers: {
    selectForm: (state, action) => {
      const selectedForms = state.selectedForms;
      if (!selectedForms.includes(action.payload)) {
        selectedForms.push(action.payload);
      } else {
        selectedForms.splice(selectedForms.indexOf(action.payload), 1);
      }
      state.selectedForms = selectedForms;
    }
  },
  extraReducers: (builder) => {}
});

export const { selectForm } = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
