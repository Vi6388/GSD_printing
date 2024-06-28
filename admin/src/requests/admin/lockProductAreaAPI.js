import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';

const API = customInterIceptors();

async function getLockProductAreaList() {
    const { data } = await API.get(ENDPOINTS.GET_LOCK_PRODUCT_AREA_API);
    return data;
}
export function getLockProductAreasData() {
    return getLockProductAreaList();
}

async function createLockProductArea(payload) {
  const { data } = await API.post(ENDPOINTS.GET_LOCK_PRODUCT_AREA_API, payload);
    return data;
}

export function createLockProductAreaData(payload) {
  return createLockProductArea(payload);
}

async function editLockProductArea(payload) {
  const { data } = await API.put(`${ENDPOINTS.GET_LOCK_PRODUCT_AREA_API}/${payload.id}`, payload);
    return data;
}

export function editLockProductAreaData(payload) {
  return editLockProductArea(payload);
}

async function deleteLockProductArea(id) {
  const { data } = await API.delete(`${ENDPOINTS.GET_LOCK_PRODUCT_AREA_API}/${id}`);
  return data;
}

export function deleteLockProductAreaData(id) {
  return deleteLockProductArea(id);
}