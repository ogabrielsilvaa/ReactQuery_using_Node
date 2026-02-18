import axios from "axios";

const baseURL = import.meta.env.PRIVATE_API || 'http://localhost:3000';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
});

export default api;
