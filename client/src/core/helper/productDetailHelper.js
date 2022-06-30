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
export const updateProduct = async (userId, token, productId, values) => {
  try {
    const result = await fetch(`${API}/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// updateProductWithImage
export const updateProductWithImage = async (
  userId,
  token,
  productId,
  formData
) => {
  console.log("formData type", typeof formData);
  try {
    const result = await fetch(
      `${API}/product/updateproductwithimage/${productId}/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    ).then((res) => res.json());

    return result;
  } catch (error) {
    console.log("error", error.message);
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
