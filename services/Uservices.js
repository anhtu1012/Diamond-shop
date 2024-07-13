import api from "../src/config/axios";
export const loginApi = (email, password, recaptchaResponse) => {
  const payload = {
    email,
    password,
    recaptchaResponse,
  };

  console.log("API Request Payload:", payload);

  return api.post("public/login", payload);
};
export const registerApi = (email, password) => {
  const payload = {
    email,
    password,
  };

  console.log("API Request Payload:", payload);

  return api.post("public/register", payload);
};
export const logoutApi = () => {
  return api.post("public/logout");
};
export const loginGG = () => {
  return api.get("oauth2/authorization/google");
};
export const loginFB = () => {
  return api.post("oauth2/authorization/facebook");
};
export const forgetPassword = (emailOrPhone) => {
  return api.post("public/forget_password", emailOrPhone);
};

export const createProduct = (productData) => {
  return api.post("swp391/api/products/create_product", productData);
};
export const createDiamond = (finalData) => {
  return api.post("swp391/api/diamonds/create_diamond", finalData);
};
export const createUser = (finalData) => {
  return api.post("swp391/api/admin/register", finalData);
};
export const getProducts = () => {
  return api.get("swp391/api/products/all_products");
};
export const getDiamonds = () => {
  return api.get("swp391/api/diamonds/all_diamonds");
};
export const deleteDiamond = (id) => {
  return api.post(`swp391/api/diamonds/delete_diamond/${id}`);
};
export const deleteProduct = (product_id) => {
  return api.delete(`swp391/api/products/delete/${product_id}`);
};

export const updateDiamond = (id, diamond) => {
  return api.put(`swp391/api/diamonds/update_diamond/${id}`, diamond);
};
export const updateProduct = (product_id, product) => {
  return api.put(`swp391/api/products/update/${product_id}`, product);
};
export const fetchDiamondById = (diamond_id) => {
  return api.get(`swp391/api/diamonds/diamond_id/${diamond_id}`);
};
export const fetchProductById = (product_id) => {
  return api.get(`swp391/api/products/product/${product_id}`);
};
export const addToCart = (data) => {
  return api.post(`swp391/api/carts/add_cart`, data);
};
export const paymentRefund = (data) => {
  return api.post(`payment/refund`, data);
};

export const getCart = (user_id) => {
  return api.get(`swp391/api/carts/cartUser/${user_id}`);
};
export const getQuantityCart = (user_id) => {
  return api.get(`swp391/api/carts/${user_id}`);
};
export const getOrderWaitPay = (user_id) => {
  return api.get(`swp391/api/orders/orderWaitPay/${user_id}`);
};
export const getWarrantyAllCard = () => {
  return api.get(`swp391/api/warrantycards/all_warranty_card`);
};
// export const getWarrantyCardById = (warrantyCard_id) => {
//   return api.get(
//     `swp391/api/warrantycards/warrantyCard_id/${warrantyCard_id}`
//   );
// };
export const getWarrantyCard = (user_id) => {
  return api.get(`swp391/api/warrantycards/user/${user_id}`);
};
export const getOrderPending = () => {
  return api.get(`swp391/api/orders/orderpending`);
};
export const getOrderDelivery = () => {
  return api.get(`swp391/api/delivery/pending_delivery_count`);
};
export const getWarrantyById = (warrantyCard_id) => {
  return api.get(`swp391/api/warrantycards/warrantyCard_id/${warrantyCard_id}`);
};
export const addToCartCustomize = (userID, customizeRequest) => {
  return api.post(
    `swp391/api/productcustomes/create_customizeProduct/${userID}`,
    customizeRequest
  );
};
export const getAllUser = () => {
  return api.get(`swp391/api/admin/all_users`);
};
export const fetchUserById = (id) => {
  return api.get(`swp391/api/user/get/${id}`);
};
export const fetchOrderFeedback = (order_id) => {
  return api.get(`swp391/api/feedback/get_model_detail/${order_id}`);
};
export const updateUser = (id, userr) => {
  return api.post(`swp391/api/user/update/${id}`, userr);
};

export const deleteCart = (cart_item_id) => {
  return api.delete(`swp391/api/carts/delete/${cart_item_id}`);
};
export const submitOrder = (info) => {
  return api.post(`swp391/api/orders/submit_order`, info);
};

export const getAllUserStaff = () => {
  return api.get(`swp391/api/staff/all_users`);
};
export const getAllOrder = () => {
  return api.get(`swp391/api/orders/all_orders`);
};
export const getOrderById = (id) => {
  return api.get(`swp391/api/orders/orders_by_user/${id}`);
};
export const getOrderDetail = (order_id) => {
  return api.get(`swp391/api/orders/${order_id}`);
};
export const createOrder = (order_id, status) => {
  return api.put(`swp391/api/orders/update_status/${order_id}`, status);
};
export const searchDiamond = (key) => {
  return api.get(`public/search_advanced`, key);
};
export const seachWrrantyCard = (warrantyCard_id) => {
  return api.get(`swp391/api/warrantycards/warrantyCard_id/${warrantyCard_id}`);
};
export const getNewOrder = () => {
  return api.get(`swp391/api/orders/newest_order`);
};
export const getNewOrderDelivery = () => {
  return api.get(`swp391/api/delivery/newest_order`);
};
export const checkOut = (info) => {
  return api.post(`payment/checkout`, info);
};
export const getTotalRevenve = () => {
  return api.get(`swp391/api/dashboards/total_revenue`);
};
export const getCompareMonth = () => {
  return api.get(`swp391/api/dashboards/compare_month`);
};
export const getCompareDay = () => {
  return api.get(`swp391/api/dashboards/compare_total_date`);
};
export const getRevenveDiamond = () => {
  return api.get(`swp391/api/dashboards/total_revenue_diamond`);
};
export const getRevenveCustomize = () => {
  return api.get(`swp391/api/dashboards/total_revenue_productcustomize`);
};
export const getTotalRevenueDate = () => {
  return api.get(`swp391/api/dashboards/total_revenue_date`);
};
export const changePass = (user_id, info) => {
  return api.post(`swp391/api/user/change_password/${user_id}`, info);
};
export const feedBack = (info) => {
  return api.post(`swp391/api/feedback/submit_feedback`, info);
};
export const searchResultss = (query) => {
  return api.get(`swp391/api/search?query=${query}`);
};
export const searchWarranty = (query) => {
  return api.get(`swp391/api/warrantycards/search?query=${query}`);
};
