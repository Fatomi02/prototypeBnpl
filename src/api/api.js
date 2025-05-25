import axios from "axios";

const api = axios.create({
  baseURL: "https://bnpl-service-try-7ewi.onrender.com/",
  // withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    let accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized request");
    }
    return Promise.reject(error);
  }
);

export default api;
