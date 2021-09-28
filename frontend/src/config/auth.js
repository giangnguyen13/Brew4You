const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const staffInfo = JSON.parse(localStorage.getItem("staffInfo"));

// If the request requires user authentication,
// use this config as header for server to authenticate the request
export const user_config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `_user ${userInfo?.token}`,
  },
};

export const staff_config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `_staff ${staffInfo?.token}`,
  },
};
