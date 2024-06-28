import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';

const API = customInterIceptors();

async function getTransactionList() {
    const { data } = await API.get(ENDPOINTS.GET_TRANSACTION_API);
    return data;
}
export function getTransactionsData() {
    return getTransactionList();
}

async function createTransaction(payload) {
  const { data } = await API.post(ENDPOINTS.GET_TRANSACTION_API, payload);
    return data;
}

export function createTransactionData(payload) {
  return createTransaction(payload);
}

async function editTransaction(payload) {
  const { data } = await API.put(`${ENDPOINTS.GET_TRANSACTION_API}/${payload.id}`, payload);
    return data;
}

export function editTransactionData(payload) {
  return editTransaction(payload);
}

async function deleteTransaction(id) {
  const { data } = await API.delete(`${ENDPOINTS.GET_TRANSACTION_API}/${payload.id}`);
  return data;
}

export function deleteTransactionData(id) {
  return deleteTransaction(id);
}