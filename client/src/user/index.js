import { API } from "../backend";

export const getUser = async (userId, token) => {
  try {
    const result = await fetch(`${API}/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (body, userId, token) => {
  try {
    const result = await fetch(`${API}/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

export const changePassword = async (userId, token, body) => {
  // console.log("index oldPassword : " ,oldPassword);
  // console.log("index newPassword : " ,newPassword);
  try {
    const result = await fetch(`${API}/user/password/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

export const getUserCart = async (userId, token) => {
  try {
    const result = await fetch(`${API}/user/cart/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
    // console.log("result: ", result);

    return result;
  } catch (error) {
    return error;
  }
};

// export const updateQuantity = async(userId, token, productId, quantity) => {
//   try {
//       const result = await fetch(`${API}/user/cart/${userId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({productId, quantity})
//       })
//   } catch (error) {
//     console.log(error);
//   }
// }

export const addToUserCart = (userId, token, { productId, quantity }) => {
  try {
    const result = fetch(`${API}/user/addtocart/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return error;
  }
};

export const updateFromUserCart = (userId, token, { productId, quantity }) => {
  try {
    const result = fetch(`${API}/user/updatecart/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    }).then((res) => res.json());

    return result;
  } catch (error) {
      return error;
  }
};

export const deleteFromCart = (userId, token, productId) => {
  try {
    const result = fetch(`${API}/user/deletecart/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId}),
    }).then((res) => res.json());

    return result;
  } catch (error) {
      return error;
  }
};
