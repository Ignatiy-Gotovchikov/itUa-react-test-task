import React, { useEffect, useState } from "react";
import { Input, Button, Table, Form } from "antd";
import { fetchEmployees } from "../api/employee";
import { Employee } from "../types/Employee";
import { observer } from "mobx-react-lite";
import styles from "../styles/EmployeeListPage.module.scss";
import { columns } from "../types/Employee";

const EmployeeListPage: React.FC = observer(() => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    surname: "",
    position: "",
    email: "",
  });

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetchEmployees();
      setEmployees(response["hydra:member"]);
      setFilteredEmployees(response["hydra:member"]);
    } catch (error) {
      console.error("Error loading employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    setFilteredEmployees(
      employees.filter((employee) => {
        const nameMatch = !filters.name || employee?.name?.toLowerCase().includes(filters?.name?.toLowerCase());
        const surnameMatch = !filters.surname || employee?.lastName?.toLowerCase().includes(filters?.surname?.toLowerCase());
        const positionMatch = !filters.position || employee?.position?.toLowerCase().includes(filters?.position?.toLowerCase());
        const emailMatch = !filters.email || employee?.email?.toLowerCase().includes(filters?.email?.toLowerCase());

        return nameMatch && surnameMatch && positionMatch && emailMatch;
      })
    );
  };

  const handleClearFilters = () => {
    setFilters({ name: "", surname: "", position: "", email: "" });
    setFilteredEmployees(employees);
  };

  return (
    <div className={styles.employeeListContainer}>
      <h3 className={styles.filterTitle}>Співробітники</h3>

      <div className={styles.filterAndTableContainer}>
        <div className={styles.filterContainer}>
          <h3 className={styles.filterTitle}>Фільтр</h3>
          <Form layout="vertical">
            <Form.Item label="Ім'я">
              <Input name="name" value={filters.name} onChange={handleFilterChange} placeholder="Ім'я" />
            </Form.Item>
            <Form.Item label="Прізвище">
              <Input name="surname" value={filters.surname} onChange={handleFilterChange} placeholder="Прізвище" />
            </Form.Item>
            <Form.Item label="Посада">
              <Input name="position" value={filters.position} onChange={handleFilterChange} placeholder="Посада" />
            </Form.Item>
            <Form.Item label="E-mail">
              <Input name="email" value={filters.email} onChange={handleFilterChange} placeholder="E-mail" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleFilter} block className={styles.filterButton}>
                Фільтрувати
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={handleClearFilters} block className={styles.filterButton}>
                Очистити
              </Button>
            </Form.Item>
          </Form>
        </div>

        <Table
          className={styles.tableContainer}
          columns={columns}
          dataSource={filteredEmployees}
          loading={loading}
          pagination={false}
          rowKey="id"
        />
      </div>
    </div>
  );
});

export default EmployeeListPage;
