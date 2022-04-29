import { API } from "../backend";

export const login = async ({ email, password }) => {
  try {
    const result = await fetch(`${API}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result.json();
  } catch (error) {
    console.log(error);
    // return error;
  }
};

export const logout = async (next) => {
  console.log("reached here");
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
    }
    next();

    const result = await fetch(`${API}/logout`, {
      method: "GET",
    });

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
