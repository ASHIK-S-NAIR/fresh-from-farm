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
    console.log(body);
  try {
    const result = await fetch(`${API}/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    }).then((res) => res.json());

    return result;
  } catch (error) {}
};
