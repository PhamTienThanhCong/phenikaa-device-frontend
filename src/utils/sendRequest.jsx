import axios from "axios";
import { trackPromise } from "react-promise-tracker";

const SendRequest = async (url, payload, thunkAPI, method = "post") => {
  const BASE_URL = import.meta.env.VITE_API_URL_API;
  // const BASE_URL = "https://reqres.in/api";
  const token = localStorage.getItem("token") || "";
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const makeRequest = async (retry = false) => {
    try {
      const dataPayload = { ...payload };
      const requestConfig = {
        method,
        url,
        [method.toLowerCase() === "get" ? "params" : "data"]: dataPayload
      };

      let response = await trackPromise(instance(requestConfig));
      if (response.data) {
        return response.data;
      } else {
        return response;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 500 && !retry) {
            // Gọi lại API một lần nữa
            return makeRequest(true);
          } else {
            // showAlert(error.response?.data?.message, 'danger');
            return thunkAPI.rejectWithValue(undefined, error);
          }
        }
      }
      return thunkAPI.rejectWithValue(undefined, error);
    }
  };

  return makeRequest();
};

export default SendRequest;
