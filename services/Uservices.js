import api from "../src/config/axios";
export const loginApi = (email, password) => {
  return api.post(
    "https://diplomatic-energy-production.up.railway.app/public/login",
    {
      email,
      password,
    }
  );
};
export const logoutApi = () => {
  return api.post(
    "https://diplomatic-energy-production.up.railway.app/public/logout"
  );
};
