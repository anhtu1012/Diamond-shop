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
export const forgetPassword = (emailOrPhone) => {
  return api.post(
    "https://diamondshopgroup6.azurewebsites.net/public/forget_password",
    emailOrPhone
  );
};

export const createProduct = (productData) => {
  return api.post(
    "https://diamondshopgroup6.azurewebsites.net/swp391/api/products/create_product",
    productData
  );
};
export const createDiamond = (finalData) => {
  return api.post(
    "https://diamondshopgroup6.azurewebsites.net/swp391/api/diamonds/create_diamond",
    finalData
  );
};
export const getProducts = () => {
  return api.get(
    "https://diamondshopgroup6.azurewebsites.net/swp391/api/products/all_products"
  );
};
export const getDiamonds = () => {
  return api.get(
    "https://diamondshopgroup6.azurewebsites.net/swp391/api/diamonds/all_diamonds"
  );
};
export const deleteDiamond = (id) => {
  return api.post(
    `https://diamondshopgroup6.azurewebsites.net/swp391/api/diamonds/delete_diamond/${id}`
  );
};

export const updateDiamond = (id, diamond) => {
  return api.put(
    `https://diamondshopgroup6.azurewebsites.net/swp391/api/diamonds/update_diamond/${id}`,
    diamond
  );
};
export const updateProduct = (product_id, product) => {
  return api.put(
    `https://diamondshopgroup6.azurewebsites.net/swp391/api/products/update/${product_id}`,
    product
  );
};
export const fetchDiamondById = (diamond_id) => {
  return api.get(
    `https://diamondshopgroup6.azurewebsites.net/swp391/api/diamonds/diamond_id/${diamond_id}`
  );
};
export const fetchProductById = (product_id) => {
  return api.get(
    `https://diamondshopgroup6.azurewebsites.net/swp391/api/products/product/${product_id}`
  );
};
export const addToCart = (data) => {
  return api.post(
    `https://diamondshopgroup6.azurewebsites.net/swp391/api/carts/add_cart`,
    data
  );
};
export const getCart = (user_id) => {
  return api.get(
    `https://diamondshopgroup6.azurewebsites.net/swp391/api/carts/cartUser/${user_id}`
  );
};
export const addToCartCustomize = (userID, customizeRequest) => {
  return api.post(
    `https://diamondshopgroup6.azurewebsites.net/swp391/api/productcustomes/create_customizeProduct/${userID}`,
    customizeRequest
  );
};
export const getAllUser = () => {
  return api.get(
    `https://diamondshopgroup6.azurewebsites.net/swp391/api/admin/all_users`
  );
};
export const fetchUserById = () => {
  return api.get(
    `https://diamondshopgroup6.azurewebsites.net/swp391/api/admin/all_users`
  );
};

export const deleteCart = (cart_item_id) => {
  return api.delete(
    `https://diamondshopgroup6.azurewebsites.net/swp391/api/carts/delete/${cart_item_id}`
  );
};
export const submitOrder = (info) => {
  return api.post(
    `https://diamondshopgroup6.azurewebsites.net/swp391/api/orders/submit_order`,
    info
  );
};

export const getAllUserStaff = () => {
  return api.get(
    `https://diamondshopgroup6.azurewebsites.net/swp391/api/staff/all_users`
  );
};
