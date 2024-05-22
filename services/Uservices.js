import api from "../src/config/axios";
export const loginApi = (email, password) => {
  return api.post(
    "https://diplomatic-energy-production.up.railway.app/swp391/api/user/login",
    {
      email,
      password,
    }
  );
};
