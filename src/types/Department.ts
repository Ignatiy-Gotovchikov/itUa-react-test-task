export interface User {
  id: number;
  name: string;
  lastName: string;
  patronymic: string;
  fullName: string;
  fullNameEnglish: string;
  email: string;
  phones: string[];
  position: string;
}

export interface Chief extends User {
  image?: {
    contentUrl: string;
  };
}

export interface Department {
  id: number;
  title: string;
  sorting: number;
  isActive: boolean;
  isMain: boolean;
  chief: Chief;
  users: User[];
	parent: Department;
  subDepartments?: Department[];
}

export interface DepartmentResponse {
  "hydra:member": Department[];
  "hydra:totalItems": number;
}
