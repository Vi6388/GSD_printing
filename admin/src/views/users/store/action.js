import * as api from './api';
import { fetchUserData, userDataId } from './reducer';
import { toast } from 'react-toastify';
export const userDataFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUserData();
    dispatch(fetchUserData(data?.data));
  } catch (error) {}
};
export const userByIdAction = (payload) => async (dispatch) => {
  // console.log("userByIdAction is running",payload);
  try {
    const { data } = await api.fetchUserId(payload);
    // console.log('data',data?.data);
    dispatch(userDataId(data?.data));
  } catch (error) {}
};
export const editUserTypeAction = (payload, refetch) => async (dispatch) => {
  try {
    const { data } = await api.editUserType(payload);
    if (data.success) {
      toast.success('Change User Type');
      refetch();
    }
  } catch (error) {}
};
