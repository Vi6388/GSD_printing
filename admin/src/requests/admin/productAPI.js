import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';

export const BASE_PATH="http://localhost:8080/"
const API = customInterIceptors();

async function getProductList() {
    const { data } = await API.get(ENDPOINTS.GET_PRODUCT_LIST);
    return data;
}
export function getProductsData() {
    return getProductList();
}

async function getProductById(id) {
    const { data } = await API.get(ENDPOINTS.GET_PRODUCT_BY_ID + id);
    return data;
}

export function getProduct(id) {
    return getProductById(id);
}

async function getImagesDataByProductID(productID) {
    const { data } = await API.get(BASE_PATH + 'api/image/getImagesByProductID/'+ productID);
    return data;
}

export function getImagesByProductID(id) {
    return getImagesDataByProductID(id);
}

async function getProductDataByID(productID) {
    const { data } = await API.get(BASE_PATH + 'api/products/getProductByID/'+ productID);
    return data;
}

export function getProductByID(id) {
    return getProductDataByID(id);
}

async function getRelatedProduct(id) {
    const { data } = await API.get(ENDPOINTS.SIMLIAR_PRODUCTS + id);
    return data;
}
export function getRelatedProductData(id) {
    return getRelatedProduct(id);
}

async function createProduct(payload) {
    const { data } = await API.post(ENDPOINTS.CREATE_PRODUCT, payload);
    return data;
}
  
export function createProductData(payload) {
    return createProduct(payload);
}

async function updateProduct(payload) {
    const { data } = await API.put(ENDPOINTS.CREATE_PRODUCT + payload.id, payload);
    return data;
}
export function updateProductData(payload) {
    return updateProduct(payload);
}

async function deleteProduct(id) {
    const { data } = await API.delete(ENDPOINTS.CREATE_PRODUCT + id);
    return data;
}
export function deleteProductData(id) {
    return deleteProduct(id);
}