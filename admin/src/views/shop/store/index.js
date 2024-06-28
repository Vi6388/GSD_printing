// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";
import { customInterIceptors } from "../../../lib/AxiosProvider";
const API = customInterIceptors();

export const getProducts = createAsyncThunk(
  "appEcommerce/getProducts",
  async (params) => {
    const response = await axios.get("/apps/ecommerce/products", { params });
    return { params, data: response.data };
  }
);
export const addToCart = createAsyncThunk(
  "appEcommerce/addToCart",
  async (id, { dispatch, getState }) => {
    const response = await axios.post("/apps/ecommerce/cart", {
      productId: id,
    });
    await dispatch(getProducts(getState().ecommerce.params));
    return response.data;
  }
);

export const getWishlistItems = createAsyncThunk(
  "appEcommerce/getWishlistItems",
  async () => {
    const response = await axios.get("/apps/ecommerce/wishlist");
    return response.data;
  }
);

export const deleteWishlistItem = createAsyncThunk(
  "appEcommerce/deleteWishlistItem",
  async (id, { dispatch }) => {
    const response = await axios.delete(`/apps/ecommerce/wishlist/${id}`);
    dispatch(getWishlistItems());
    return response.data;
  }
);

export const getCartItems = createAsyncThunk(
  "appEcommerce/getCartItems",
  async () => {
    const response = await axios.get("/apps/ecommerce/cart");
    return response.data;
  }
);

export const getProduct = createAsyncThunk(
  "appEcommerce/getProduct",
  async (slug) => {
    const response = await axios.get(`/apps/ecommerce/products/${slug}`);
    return response.data;
  }
);

export const addToWishlist = createAsyncThunk(
  "appEcommerce/addToWishlist",
  async (id) => {
    await axios.post("/apps/ecommerce/wishlist", { productId: id });
    return id;
  }
);

export const deleteCartItem = createAsyncThunk(
  "appEcommerce/deleteCartItem",
  async (id, { dispatch }) => {
    await axios.delete(`/apps/ecommerce/cart/${id}`);
    dispatch(getCartItems());
    return id;
  }
);

export const getCategories = createAsyncThunk(
  "appEcommerce/getCategories",
  async (params) => {
    const response = await API.get(`/categories`, { params });
    return response.data;
  }
);
export const getMainCategories = createAsyncThunk(
  "appEcommerce/getMainCategories",
  async (params) => {
    // const response = await API.get(`/product/getMainCategories`, { params });
    // return response.data.result;
  }
);

export const getproductsById = createAsyncThunk(
  "appEcommerce/getProductsByID",
  async (params) => {
    // const response = await API.get(`/product/getProducts`, { params });
    console.log(response, "hyyyyyy");

    // return response.data.data;
  }
);

export const appEcommerceSlice = createSlice({
  name: "appEcommerce",
  initialState: {
    m_categories: [],
    cart: [],
    params: {},
    products: [],
    items: [],
    wishlist: [],
    totalProducts: 0,
    productDetail: {},
    categories: [],
  },
  reducers: {
    handleCategory: (state, action) => {
      console.log(state, "----", action);
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.params = action.payload.params;
        state.products = action.payload.data.products;
        state.totalProducts = action.payload.data.total;
      })
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.wishlist = action.payload.products;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cart = action.payload.products;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetail = action.payload.product;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getMainCategories.fulfilled, (state, action) => {
        state.m_categories = action.payload;
      })
      .addCase(getproductsById.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(getproductsById.pending, (state, action) => {
        console.log("pending ho gyaaa");
        state.categories = action.payload;
      })
      .addCase(getproductsById.rejected, (state, action) => {
        console.log("rejected ho gyaaa");
        state.categories = action.payload;
      });
  },
});
export const { handleCategory } = appEcommerceSlice.actions;
export default appEcommerceSlice.reducer;
