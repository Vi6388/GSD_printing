import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';

const API = customInterIceptors();

async function getOrderStatusList() {
    const { data } = await API.get(ENDPOINTS.GET_ORDER_STATUS_API);
    return data;
}
export function getOrderStatusData() {
    return getOrderStatusList();
}

async function createOrderStatus(payload) {
  const { data } = await API.post(ENDPOINTS.GET_ORDER_STATUS_API, payload);
    return data;
}

export function createOrderStatusData(payload) {
  return createOrderStatus(payload);
}

async function editOrderStatus(payload) {
  const { data } = await API.put(`${ENDPOINTS.GET_ORDER_STATUS_API}/${payload.id}`, payload);
    return data;
}

export function editOrderStatusData(payload) {
  return editOrderStatus(payload);
}

async function deleteOrderStatus(id) {
  const { data } = await API.delete(`${ENDPOINTS.GET_ORDER_STATUS_API}/${payload.id}`);
  return data;
}

export function deleteOrderStatusData(id) {
  return deleteOrderStatus(id);
}