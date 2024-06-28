// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

// ** Fetch Workspace - api
export const fetchWorkspaceApi = createAsyncThunk('appWorkspace/fetchWorkspace', async () => {
  const response = await API.get('/workspace/get-all');
  return response.data;
});

export const getSelectedWorkspaceData = createAsyncThunk(
  'appSelectWorkspace/selectWorkspace',
  async (id) => {
    const response = await API.get(`/workspace/get/${id}`);
    return response.data;
  }
);

export const addWorkspace = createAsyncThunk(
  'appWorkspace/addWorkspace',
  async (data, { dispatch }) => {
    const response = await API.post('/workspace/add', data);
    await dispatch(fetchWorkspaceApi());
    return response.data;
  }
);

export const updateWorkspaceTitle = createAsyncThunk(
  'appWorkspace/updateWorkspaceTitle',
  async (data, { dispatch }) => {
    const response = await API.post('/workspace/update', data);
    await dispatch(fetchWorkspaceApi());
    return response.data;
  }
);

export const deleteWorkspace = createAsyncThunk(
  'appWorkspace/deleteWorkspace',
  async (id, { dispatch }) => {
    const response = await API.delete(`/workspace/delete/${id}`);
    await dispatch(fetchWorkspaceApi());
    return response;
  }
);

export const appWorkspaceSlice = createSlice({
  name: 'appWorkspace',
  initialState: {
    workspace: [],
    selectedWorkspace: {},
    boards: [],
    tasks: []
  },
  reducers: {
    handleSelectWorkspace: (state, action) => {
      state.selectedWorkspace = action.payload;
    },
    handleSelectTask: (state, action) => {
      state.selectedTask = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaceApi.fulfilled, (state, action) => {
        state.workspace = action.payload;
        state.selectedWorkspace = action.payload[0];
      })
      .addCase(getSelectedWorkspaceData.fulfilled, (state, action) => {
        state.boards = action.payload.boards;
        state.tasks = action.payload.tasks;
      });
  }
});

export const { handleSelectWorkspace, handleSelectTask } = appWorkspaceSlice.actions;

export default appWorkspaceSlice.reducer;
