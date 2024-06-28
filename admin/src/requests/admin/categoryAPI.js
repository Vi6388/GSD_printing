import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { deleteProductData } from './productAPI';

const API = customInterIceptors();

async function getCategoryList() {
    const { data } = await API.get(ENDPOINTS.GET_CATEGORIES);
    return data;
}
export function getCategoriesData() {
    return getCategoryList();
}

async function getSubCategoryList(id) {
  const { data } = await API.get(`${ENDPOINTS.GET_CATEGORIES}/${id}/${ENDPOINTS.GET_SUB_CATEGORIES}`);
  return data;
}
export function getSubCategoriesData(id) {
  return getSubCategoryList(id);
}

async function createCategory(payload) {
  const { data } = await API.post(ENDPOINTS.CREATE_CATEGORY, payload);
    return data;
}

export function createCategoryData(payload) {
  return createCategory(payload);
}

async function editCategory(payload) {
  const { data } = await API.put(`${ENDPOINTS.CREATE_CATEGORY}/${payload.id}`, payload);
    return data;
}

export function editCategoryData(payload) {
  return editCategory(payload);
}

async function deleteCategory(id) {
  const { data } = await API.delete(`${ENDPOINTS.CREATE_CATEGORY}/${id}`);
  return data;
}

export function deleteCategoryData(id) {
  return deleteCategory(id);
}