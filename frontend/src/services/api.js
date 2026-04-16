import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

API.interceptors.request.use((req) => {
  const data = JSON.parse(localStorage.getItem("user"));

  if (data?.token) {
    req.headers.Authorization = `Bearer ${data.token}`;
  }

  return req;
});

export default API;