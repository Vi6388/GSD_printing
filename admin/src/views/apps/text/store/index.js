// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

let baseUrl = 'http://localhost:5001/api';

import { customInterIceptors } from '../../../../lib/AxiosProvider';
const API = customInterIceptors();

export const getTextContacts = createAsyncThunk(
  'appText/getTextContacts',
  async (params, { getState }) => {
    const response = await API.get(`/client-contact/`, params);

    return {
      data: response.data
    };
  }
);
export const getMessageContacts = createAsyncThunk(
  'appText/getMessageContacts',
  async (params, { getState }) => {
    const response = await API.get(`/text/get-messages/${params}/${params}`);

    let data = response.data?.data;

    return data;
  }
);
export const filterTextContacts = createAsyncThunk(
  'appText/filterTextContacts',
  async (data, { getState }) => {
    return {
      data: data
    };
  }
);
export const activeTextContacts = createAsyncThunk(
  'appText/activeTextContacts',
  async (data, { getState }) => {
    return {
      data: data
    };
  }
);
export const getText = createAsyncThunk('appText/getText', async (params, { getState }) => {
  const response = await API.post(`/text/addcontact/123`, {
    params
  });

  return {
    params,
    data: response.data
  };
});

export const addText = createAsyncThunk('appText/addTask', async (task, { dispatch, getState }) => {
  const response = await API.post(`/text/send-message/${task?.id}`, {
    task
  });
  // console.log('response', response?.data);
  if (response?.data?.success) {
    await dispatch(getMessageContacts(task?.uid));
  } else {
    toast.error(response?.data?.error);
  }

  // await dispatch(getTasks(getState().todo.params))
  // return response.data
});

// export const updateText = createAsyncThunk(
//     'appText/updateTask',
//     async (task, { dispatch, getState }) => {
//         const response = await axios.post('/apps/todo/update-task', { task })
//         await dispatch(getTasks(getState().todo.params))
//         return response.data
//     }
// )

// export const deleteText = createAsyncThunk(
//     'appText/deleteTask',
//     async (taskId, { dispatch, getState }) => {
//         const response = await axios.delete('/apps/todo/delete-task', {
//             taskId
//         })
//         await dispatch(getTasks(getState().todo.params))
//         return response.data
//     }
// )

export const appTextSlice = createSlice({
  name: 'appText',
  initialState: {
    Text: [],
    selectedTEXT: {},
    msg: '',
    contacts: [],
    ActiveContact: {},
    messages: []
  },
  // reducers: {
  //     addTextReducer: (state, action) => {
  //         state.Text = action.payload
  //     }
  // },

  extraReducers: (builder) => {
    builder
      .addCase(getText.fulfilled, (state, action) => {
        state.Text = action.payload;
        state.params = action.payload;
      })
      .addCase(getTextContacts.fulfilled, (state, action) => {
        state.contacts = action.payload?.data?.list;
      })
      .addCase(filterTextContacts.fulfilled, (state, action) => {
        state.contacts = action.payload?.data;
      })
      .addCase(activeTextContacts.fulfilled, (state, action) => {
        state.ActiveContact = action.payload?.data;
      })
      .addCase(getMessageContacts.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  }
});

export const { addTextReducer } = appTextSlice.actions;

export default appTextSlice.reducer;
