import axios from "axios";

const api = axios.create({
  baseURL: "https://prepai-project-x5dz.onrender.com/api",
});

export default api;