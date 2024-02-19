import axios from "axios";

const BASE_URL = "http://localhost:3001";

const axiosInstance = axios.create({ baseURL: BASE_URL });

axios.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong "
    )
);
export default axiosInstance;
