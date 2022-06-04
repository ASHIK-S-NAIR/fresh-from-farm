import { API } from "../../backend";
const axios = require("axios");

// getProduct
export const getProduct = async (productId) => {
  try {
    const result = await fetch(`${API}/product/${productId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).then((res) => res.json());
    return result;
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
