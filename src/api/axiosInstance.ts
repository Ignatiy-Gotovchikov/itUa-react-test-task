import axios from "axios";
import { authStore } from "../store/authStore";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use((config) => {
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        authStore.logout();
        window.location.href = '/login';
      } catch (error) {
        console.error('login redirect error: ', error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
