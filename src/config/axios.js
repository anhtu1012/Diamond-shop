import axios from "axios";
const baseUrl = "https://diamondshopproject.azurewebsites.net/";
const config = {
  baseUrl,
  timeout: 3000000,
};
const api = axios.create(config);
api.defaults.baseURL = baseUrl;
const handleBefore = (config) => {
  const token = localStorage.getItem("token")?.replaceAll('"', "");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};
const handleError = (error) => {
  console.error("API request error:", error);
  return Promise.reject(error);
};
api.interceptors.request.use(handleBefore, handleError);
// api.interceptors.response.use(null, handleError);

export default api;
