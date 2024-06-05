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
  return api.get(
    "https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&include_granted_scopes=true&response_type=code&state=TAv2NoUQjQEP7TXXquZlYZYoqDV7lRO4kXbB8_vc_hM%3D&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F&client_id=478830836024-e2fa5s2erqeal7bupi7tim4ap64d0cha.apps.googleusercontent.com"
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
export const createProduct = (productData) => {
  return api.post(
    "https://diamondshopgroup6.azurewebsites.net/swp391/api/products/create_product",
    productData
  );
};
export const getDiamonds = () => {
  return api.get(
    "https://diamondshopgroup6.azurewebsites.net/swp391/api/diamonds/all_diamonds"
  );
};
