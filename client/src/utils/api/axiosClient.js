import axios from "axios";
import queryString from "query-string";
export const hostServer = "http://localhost:3000";

const axiosClient = axios.create({
  baseURL: `${hostServer}/api/`,
  paramsSerializer: (params) => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && "data" in response) return response.data;
    return response;
  },
  (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        localStorage.removeItem("token");
      }
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
