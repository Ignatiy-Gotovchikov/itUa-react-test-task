import axiosInstance from "./axiosInstance";
import { EmployeeResponse } from "../types/Employee";

const API_URL = "/company";

export const fetchEmployees = async (): Promise<EmployeeResponse> => {
  const response = await axiosInstance.get<EmployeeResponse>(`${API_URL}/users`);
  return response.data;
};
