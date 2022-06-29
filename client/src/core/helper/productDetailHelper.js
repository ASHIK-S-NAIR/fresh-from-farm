import { API } from "../../backend";

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

// getAllProducts
export const getAllProducts = async (category) => {
  try {
    const result = await fetch(`${API}/products/${category}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).then((res) => res.json());

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// updateProduct
export const updateProduct = async (userId, token, productId) => {
  try {
    const result = await fetch(`${API}/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }).then((res) => res.json());

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// deleteProduct
export const deleteProduct = async (userId, token, productId) => {
  try {
    const result = await fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
