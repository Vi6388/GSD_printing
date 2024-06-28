import * as api from './api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  // ** files upload reducers
  filesUploadBannerStart,
  filesUploadBannerSuccess,
  filesUploadBannerError,
  filesUploadBannerReset
} from './reducer';

// ** files upload Action
export const uploadBannerFilesAction = (form) => async (dispatch) => {
  try {
    dispatch(filesUploadBannerStart());
    await api.uploadBannerFileRequest(form);
    dispatch(filesUploadBannerSuccess());
  } catch (error) {
    dispatch(filesUploadBannerError(error));
  }
};
