import axios from "axios";

// Set up base URL and timeout
const baseUrl = "https://diamondshopproject.azurewebsites.net/";
// const baseUrl = "http://localhost:8080/";
const config = {
  baseURL: baseUrl,
  timeout: 3000000,
};

// Create an Axios instance
const api = axios.create(config);

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token")?.replaceAll('"', "");

    // Check if token exists
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No token found in localStorage");
    }

    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor for error handling
// api.interceptors.response.use(null, (error) => {
//   console.error("Error in response:", error);
//   return Promise.reject(error);
// });

export default api;
// import axios from "axios";
// const baseUrl = "https://diamondshopproject.azurewebsites.net/";
// const config = {
//   baseUrl,
//   timeout: 3000000,
// };
// const api = axios.create(config);
// api.defaults.baseURL = baseUrl;
// const handleBefore = (config) => {
//   const token = localStorage.getItem("token")?.replaceAll('"', "");
//   config.headers["Authorization"] = `Bearer ${token}`;
//   return config;
// };
// const handleError = (error) => {
//   console.error("API request error:", error);
//   return Promise.reject(error);
// };
// api.interceptors.request.use(handleBefore, handleError);
// // api.interceptors.response.use(null, handleError);

// export default api;
