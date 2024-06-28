import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';
export const BASE_PATH = "http://localhost:8080/";

const API = customInterIceptors();

async function getProductsByShape() {
    const { data } = await API.get(ENDPOINTS.GET_PRODUCTS_BY_SHAPE_API);
    return data;
}
export function getProductsByShapeData() {
    return getProductsByShape();
}


async function getProductsByCategory() {
  const { data } = await API.get(ENDPOINTS.GET_PRODUCTS_BY_CATEGORY_API);
  return data;
}
export function getProductsByCategoryData() {
  return getProductsByCategory();
}

async function getProductDetail(id) {
  const { data } = await API.get(ENDPOINTS.GET_PRODUCT_DETAIL_API + id);
  return data;
}
export function getProductDetailData(id) {
  return getProductDetail(id);
}

export async function getCategories() {  
  const { data } = await API.get(ENDPOINTS.GET_CATEGORIES);
  return data;
}
