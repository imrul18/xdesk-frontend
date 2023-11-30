import { baseUrl } from "@src/config";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

let Api = axios.create({
  baseURL: baseUrl,

  headers: {
    // "Content-type": "application/json",
    "Content-Type": "multipart/form-data",
    accept: "application/json",
  },
  transformResponse: (data) => {
    let response = JSON.parse(data);
    if (response?.status == 201) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        position: "top-end",
        icon: "success",
        title: response?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (response?.status == 203) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        position: "top-end",
        icon: "error",
        title: response?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    return response;
  },

  validateStatus: function (status) {
    if (status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }

    if (status === 422) {
      return status;
    }

    return status >= 200 && status < 300; // default
  },
});

Api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${
    localStorage.getItem("accessToken") &&
    JSON.parse(localStorage.getItem("accessToken"))
  }`;
  return config;
});

export default Api;
