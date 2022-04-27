import { API } from "../../backend";
const axios = require("axios");

// getProduct
export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${API}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategoryProducts = async (productId) => {
  try {
    const response = await axios.get(`${API}/categoryproducts/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
