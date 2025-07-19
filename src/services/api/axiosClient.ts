import axios from "axios";
import queryString from "query-string";
import { RAPIDAPI_KEY, BASE_URL, RAPIDAPI_HOST } from "./config";

export const axiosClient = axios.create({
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
    "x-rapidapi-key": RAPIDAPI_KEY,
    // Authorization: `Bearer ${TOKEN}`,
  },
  paramsSerializer: (params: any) => queryString.stringify(params),
});
axiosClient.interceptors.request.use((request) => {
  return request;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (
      response.config.responseType === "document" ||
      (response.data && response.data.data !== undefined)
    ) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
