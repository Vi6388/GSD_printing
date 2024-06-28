import axios from 'axios';
export const BASE_PATH="http://localhost:8080/"


export async function getCategoryData() {
  try {
    const response = await axios.get(BASE_PATH + 'api/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getProductByCategoryData() {
    try {
      const response = await axios.get(BASE_PATH + 'api/shop/getProductsByCategory');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

export async function getProductTemplateData() {
  try {
    const response = await axios.get(BASE_PATH + 'api/productTemplate');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getProductTemplateByID(templateID) {
  try {
    const response = await axios.get(BASE_PATH + 'api/productTemplate/' + templateID);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


export async function getProductsByShapeCategory(category_id) {
    try {
      const response = await axios.get(BASE_PATH + 'api/shop/getProductsByShapeCategory/'+ category_id);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
}


export async function getProductByID(productID) {
  try {
    const response = await axios.get(BASE_PATH + 'api/products/getProductByID/'+ productID);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getImagesByProductID(productID) {
  try {
    const response = await axios.get(BASE_PATH + 'api/image/getImagesByProductID/'+ productID);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getRelatedProduct(categoryID) {
  try {
    const response = await axios.get(BASE_PATH + 'api/products/similar/'+ categoryID);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


export async function uploadEditedImage(dataURL, objects, productID) {
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