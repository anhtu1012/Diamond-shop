import api from "../src/config/axios";
export const loginApi = (email, password, recaptchaResponse) => {
  const payload = {
    email,
    password,
    recaptchaResponse,
  };

  console.log("API Request Payload:", payload);

  return api.post(
    "https://diplomatic-energy-production.up.railway.app/public/login",
    payload
  );
};
export const logoutApi = () => {
  return api.post(
    "https://diplomatic-energy-production.up.railway.app/public/logout"
  );
};
