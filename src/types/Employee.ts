import type { ColumnsType } from "antd/es/table";


export interface Department {
  id: number;
  title: string;
  isActive: boolean;
}

export interface Employee {
  id: number;
  name: string;
  lastName: string;
  position: string;
  email: string;
  departments: Department[];
  isActive: boolean;
}

export interface EmployeeResponse {
  "hydra:member": Employee[];
  "hydra:totalItems": number;
}

export const columns: ColumnsType<Employee> = [
	{
		title: "Ім'я",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Прізвище",
		dataIndex: "lastName",
		key: "surname",
	},
	{
		title: "Посада",
		dataIndex: "position",
		key: "position",
	},
	{
		title: "E-mail",
		dataIndex: "email",
		key: "email",
	},
];
