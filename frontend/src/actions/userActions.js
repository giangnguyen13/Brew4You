import axios from "axios";

export const login = async (email, password) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
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

    const { data } = await axios.post("/api/users", user, config);

    localStorage.setItem("userInfo", JSON.stringify(data));

    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  localStorage.removeItem("userInfo");
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
