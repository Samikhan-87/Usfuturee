import axios from "axios";

// Axios instance ready for when the backend is connected.
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

// Simulate a network call so UI shows realistic loading states (no backend yet).
export const mockRequest = (data, delay = 600) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export default api;
