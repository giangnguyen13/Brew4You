import { user_config } from "../config/auth";
import { api } from "../services/api/config";

export const login = async (email, password) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await api.post(
      "/api/users/login",
      {
        email,
        password,
      },
      config
    );
    localStorage.setItem("userInfo", JSON.stringify(data));

    // Redirect back to the page user in before login
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectUrl");

    window.location.href = redirectUrl ?? "/";
  } catch (error) {
    console.log(error);
  }
};

export const register = async (user) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await api.post("/users", user, config);

    localStorage.setItem("userInfo", JSON.stringify(data));

    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};

export const getLoggedUserProfile = async () => {
  try {
    const { data } = await api.get(`/user/profile`, user_config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  localStorage.removeItem("userInfo");
  window.location.href = "/";
};

/**
 * Check user authentication
 *
 * @returns bool
 */
export const isAuthenticated = () => {
  const now = new Date().getTime();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo) {
    const expiredToken = userInfo.expired;
    return expiredToken && now < expiredToken ? true : false;
  }
  return false;
};
