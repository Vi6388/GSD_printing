import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';

const API = customInterIceptors();

async function getInvoiceList() {
    const { data } = await API.get(ENDPOINTS.GET_INVOICE_API);
    return data;
}
export function getInvoicesData() {
    return getInvoiceList();
}

async function createInvoice(payload) {
  const { data } = await API.post(ENDPOINTS.GET_INVOICE_API, payload);
    return data;
}

export function createInvoiceData(payload) {
  return createInvoice(payload);
}

async function editInvoice(payload) {
  const { data } = await API.put(`${ENDPOINTS.GET_INVOICE_API}/${payload.id}`, payload);
    return data;
}

export function editInvoiceData(payload) {
  return editInvoice(payload);
}

async function deleteInvoice(id) {
  const { data } = await API.delete(`${ENDPOINTS.GET_INVOICE_API}/${payload.id}`);
  return data;
}

export function deleteInvoice(id) {
  return deletePaper(id);
}