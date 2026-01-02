import axios from "axios";

// In production, API is on same domain at /api, in dev it's on localhost:8000
const baseURL = process.env.REACT_APP_BACKEND_URL || (
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000'
);

export const api = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});
