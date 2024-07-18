import axios from "axios";
const baseUrl = "https://diamondshopproject.azurewebsites.net/";
const config = {
  baseUrl,
  timeout: 3000000,
};
const api = axios.create(config);
const handleBefore = (config) => {
  const token = localStorage.getItem("token")?.replaceAll('"', "");
  if (token) {
    console.log("Token found in localStorage:", token);
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    console.log("No token found in localStorage");
  }
  return config;
};
const handleError = (error) => {
  console.error("API request error:", error);
  return Promise.reject(error);
};

api.interceptors.request.use(handleBefore, handleError);

// Uncomment and configure if you want to handle response errors globally
// api.interceptors.response.use(null, handleError);

export default api;
