import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';

const API = customInterIceptors();

async function getPaperTypeList() {
    const { data } = await API.get(ENDPOINTS.GET_PAPER_TYPE_LIST);
    return data;
}
export function getPaperTypesData() {
    return getPaperTypeList();
}

async function createPaperType(payload) {
  const { data } = await API.post(ENDPOINTS.CREATE_PAPER_TYPE, payload);
    return data;
}

export function createPaperTypeData(payload) {
  return createPaperType(payload);
}

async function editPaperType(payload) {
  const { data } = await API.put(`${ENDPOINTS.CREATE_PAPER_TYPE}/${payload.id}`, payload);
    return data;
}

export function editPaperTypeData(payload) {
  return editPaperType(payload);
}

async function deletePaper(id) {
  const { data } = await API.delete(`${ENDPOINTS.CREATE_PAPER_TYPE}/${id}`);
  return data;
}

export function deletePaperType(id) {
  return deletePaper(id);
}