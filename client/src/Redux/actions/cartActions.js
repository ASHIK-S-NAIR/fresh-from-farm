import { isAuthenticated } from "../../auth";
import { ActionTypes } from "../constants/action-types";
import { API } from "../../backend";
const { user, token } = isAuthenticated();
console.log("user", user);

export const fetchCart = () => async (dispatch) => {
  const response = await fetch(`${API}/user/cart/${user._id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

  console.log("cartAction", response.cart);

  dispatch({ type: ActionTypes.FETCH_CART, payload: response.cart });
};

export const deleteFromCart = (id) => async (dispatch) => {
  try {
    const result = fetch(`${API}/user/deletecart/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    }).then((res) => res.json());

    // return result;
    fetchCart(dispatch());
  } catch (error) {
    return error;
  }
};
