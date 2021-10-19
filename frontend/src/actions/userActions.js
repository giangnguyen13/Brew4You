import { user_config } from "../config/auth";
import { api } from "../services/api/config";
import { END_POINTS } from "../services/api/endpoints";

export const login = async (email, password) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await api.post(
      END_POINTS.POST_USER_LOGIN,
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


    const { data } = await api.post(END_POINTS.POST_USER_SIGNUP, user, config);

    localStorage.setItem("userInfo", JSON.stringify(data));

    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};

export const getLoggedUserProfile = async () => {
  try {
    const { data } = await api.get(END_POINTS.GET_USER_PROFILE, user_config);
    if(data) {
    return data
    }
    return null
  } catch (error) {
    console.log(error);
    return null
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

export const getToken = () => {
  if (isAuthenticated()) {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    return user.token;
  }
  return null;
};
