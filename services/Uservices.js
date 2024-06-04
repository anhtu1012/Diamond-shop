import api from "../src/config/axios";
export const loginApi = (email, password, recaptchaResponse) => {
  const payload = {
    email,
    password,
    recaptchaResponse,
  };

  console.log("API Request Payload:", payload);

  return api.post(
    "https://diamondshopgroup6.azurewebsites.net/public/login",
    payload
  );
};
export const registerApi = (email, password) => {
  const payload = {
    email,
    password,
  };

  console.log("API Request Payload:", payload);

  return api.post(
    "https://diamondshopgroup6.azurewebsites.net/public/register",
    payload
  );
};
export const logoutApi = () => {
  return api.post("https://diamondshopgroup6.azurewebsites.net/public/logout");
};
export const loginGG = () => {
  return api.post(
    "https://diamondshopgroup6.azurewebsites.net/oauth2/authorization/google"
  );
};
export const loginFB = () => {
  return api.post(
    "https://diamondshopgroup6.azurewebsites.net/oauth2/authorization/facebook"
  );
};
export const getDiamond = () => {
  return api.get("https://662a755267df268010a405bf.mockapi.io/Diamond");
};
export const getProduct = () => {
  return api.get("https://662b9b55de35f91de158d8ba.mockapi.io/us");
};
export const getProducts = () => {
  return api.get(
    "https://diamondshopgroup6.azurewebsites.net/swp391/api/products/all_products"
  );
};
