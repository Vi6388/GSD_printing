import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ENDPOINTS } from '../../lib/endpoints';
import { customInterIceptors } from '../../lib/AxiosProvider';
import axios from 'axios';
export const BASE_PATH="http://localhost:8080/"

const API = customInterIceptors();

async function getProductTemplateList() {
    const { data } = await API.get(ENDPOINTS.GET_PRODUCT_TEMPLATE_API);
    return data;
}
export function getProductTemplatesData() {
    return getProductTemplateList();
}

async function createProductTemplate(payload) {
  const { data } = await API.post(ENDPOINTS.GET_PRODUCT_TEMPLATE_API, payload);
    return data;
}


export function createProductTemplateData(payload) {
  return createProductTemplate(payload);
}
async function getProductTemplateByID(payload) {
  const { data } = await API.get(`${ENDPOINTS.GET_PRODUCT_TEMPLATE_By_ID_API}` + payload);
    return data;
}

export function getProductTemplateByIDData(templateID) {
  return getProductTemplateByID(templateID);
}


async function editProductTemplate(payload) {
  const { data } = await API.put(`${ENDPOINTS.GET_PRODUCT_TEMPLATE_API}/${payload.id}`, payload);
    return data;
}

export function editProductTemplateData(payload) {
  return editProductTemplate(payload);
}

async function deleteProductTemplate(id) {
  const { data } = await API.delete(`${ENDPOINTS.GET_PRODUCT_TEMPLATE_API}/${id}`);
  return data;
}

export function deleteProductTemplateData(id) {
  return deleteProductTemplate(id);
}


async function uploadEditedImage(dataURL, objects, productID) {
  // const { data } = await API.delete(`${ENDPOINTS.GET_PRODUCT_TEMPLATE_API}/${id}`);
  // return data;

  try {
    // Send FormData object to the server
    const response = await fetch(BASE_PATH + 'api/image/uploadImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ imageData: dataURL }, {productID, productID}, {objects, objects}]),
    });
    if (response.status == 200) {
      console.log('Image uploaded successfully');
      console.log(response);
      return true;
    } else {
      console.error('Failed to upload image');
      return false;
    }
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

export function uploadEditedImageData(dataURL, objects, productID) {
  return uploadEditedImage(dataURL, objects, productID);
}

async function uploadEditedTemplate(dataURL, objects, templateID, productID) {
  // const { data } = await API.delete(`${ENDPOINTS.GET_PRODUCT_TEMPLATE_API}/${id}`);
  // return data;

  try {
    // Send FormData object to the server
    const response = await fetch(BASE_PATH + 'api/image/uploadTemplate/' + templateID, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ imageData: dataURL }, {templateID, templateID}, {objects, objects}]),
    });
    if (response.status == 200) {
      console.log('Image uploaded successfully');
      console.log(response);
      return true;
    } else {
      console.error('Failed to upload image');
      return false;
    }
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

export function uploadEditedTemplateData(dataURL, objects, templateID, productID) {
  return uploadEditedTemplate(dataURL, objects, templateID, productID);
}


