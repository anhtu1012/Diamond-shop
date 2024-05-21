import axios from "axios";
export const loginApi = (email, password) => {
  return axios.post(
    "https://diplomatic-energy-production.up.railway.app/swp391/api/user/login",
    {
      email,
      password,
    }
  );
};
