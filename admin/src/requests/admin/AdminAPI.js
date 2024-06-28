import { useQuery } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';
import axios from 'axios';

const API = customInterIceptors();

async function fetchAdmin() {
  const { data } = await API.get(ENDPOINTS.GET_ADMIN_TABLE_DATA);
  return data?.data;
}
export function fetchAdmindata() {
  return useQuery('get-admin', fetchAdmin);
}

async function getAdminInfo(id) {
  const { data } = await API.get(ENDPOINTS.GET_ADMIN_INFO_API + id);
  return data;
}

export function getAdminInfoData(id) {
  return getAdminInfo(id);
}

async function saveAdminInfo(payload) {
  const { data } = await API.get(ENDPOINTS.SAVE_ADMIN_INFO_API, payload);
  return data;
}

export function saveAdminInfoData(payload) {
  return saveAdminInfo(payload);
}

async function changePasswordAdminInfo(payload) {
  const { data } = await API.get(ENDPOINTS.CHANGE_ADMIN_PASSWORD_API, payload);
  return data;
}

export function changePasswordAdminInfoData(payload) {
  return changePasswordAdminInfo(payload);
}

export async function uploadFile(payload) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios.post(process.env.REACT_APP_API + ENDPOINTS.UPLOAD_IMAGE_API, payload, config).then((res) => {
    console.log("--res-", res); 
    return res;
  });
}

export function uploadFileData(payload) {
  return uploadFile(payload);
}

async function getImage(id) {
  const { data } = await API.get(ENDPOINTS.IMAGE_API + id);
  return data;
}

export function getImageData(id) {
  return getImage(id);
}