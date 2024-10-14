import axiosInstance from "./axiosInstance";
import { DepartmentResponse } from "../types/Department";

const API_URL = "/company";

export const fetchDepartments = async (): Promise<DepartmentResponse> => {
  const response = await axiosInstance.get<DepartmentResponse>(`${API_URL}/departments`);
  return response.data;
};
