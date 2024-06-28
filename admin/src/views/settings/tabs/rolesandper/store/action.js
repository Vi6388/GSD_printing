import * as api from './api';
import { toast } from 'react-toastify';
import {
  getAllLinksSuccess,
  // ** User Permission
  getUserPermissionStart,
  getUserPermissionSuccess,
  getUserPermissionError,
  // ** Operator Permission
  getOperatorPermissionStart,
  getOperatorPermissionSuccess,
  getOperatorPermissionError
} from './reducer';
//parent progression
export const getUserPermissionAction = () => async (dispatch) => {
  try {
    dispatch(getUserPermissionStart());
    const { data } = await api.fetchUserPermission();
    dispatch(getUserPermissionSuccess(data));
  } catch (error) {}
};

export const getOperatorPermissionAction = () => async (dispatch) => {
  try {
    dispatch(getOperatorPermissionStart());
    const { data } = await api.fetchOperatorPermission();
    dispatch(getOperatorPermissionSuccess(data));
  } catch (error) {}
};

export const getAllLinksAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllLinks();
    dispatch(getAllLinksSuccess(data));
  } catch (error) {}
};

export const savePermissionAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.savePermission(payload);
    let userType = payload.userType.charAt(0).toUpperCase() + payload.userType.slice(1);
    toast.success(`${userType} permission updated successfully`);
  } catch (error) {}
};

export const saveModuleAction = (payload) => async (dispatch) => {
  try {
    await api.saveModule(payload);
    toast.success('Module is created successfully');
  } catch (error) {}
};
