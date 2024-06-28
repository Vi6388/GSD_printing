import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';

const API = customInterIceptors();

async function getUserList() {
    const { data } = await API.get(ENDPOINTS.GET_USER_API);
    return data;
}
export function getUsersData() {
    return getUserList();
}

async function createUser(payload) {
  const { data } = await API.post(ENDPOINTS.GET_USER_API, payload);
    return data;
}

export function createUserData(payload) {
  return createUser(payload);
}

async function editUser(payload) {
  const { data } = await API.put(`${ENDPOINTS.GET_USER_API}/${payload.id}`, payload);
    return data;
}

export function editUserData(payload) {
  return editUser(payload);
}

async function deleteUser(id) {
  const { data } = await API.delete(`${ENDPOINTS.GET_USER_API}/${id}`);
  return data;
}

export function deleteUserData(id) {
  return deleteUser(id);
}

async function userResetPassword(payload) {
  const { data } = await API.post(ENDPOINTS.USER_CHANGE_PASSWORD, payload);
    return data;
}

export function userResetPasswordData(payload) {
  return userResetPassword(payload);
}