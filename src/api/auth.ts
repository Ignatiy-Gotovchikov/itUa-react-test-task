import axiosInstance from "./axiosInstance";

const API_URL = "/auth";

export const login = async (login: string, password: string) => {
  const response = await axiosInstance.post(`${API_URL}/login`, { login, password });
  return response.data;
};

export const refreshToken = async (refresh_token: string) => {
  const response = await axiosInstance.post(`${API_URL}/refresh_token`, { refresh_token });
  return response.data;
};