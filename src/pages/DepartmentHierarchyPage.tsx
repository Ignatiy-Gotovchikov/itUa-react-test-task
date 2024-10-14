import { useEffect, useState } from "react";
import { Button, Collapse, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { fetchDepartments } from "../api/department";
import { Department } from "../types/Department";
import styles from "../styles/DepartmentHierarchyPage.module.scss";

const DepartmentHierarchyPage= () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDepartments = async () => {
    setLoading(true);
    try {
      const response = await fetchDepartments();
      const hierarchy = buildDepartmentHierarchy(response["hydra:member"]);
      setDepartments(hierarchy);
    } catch (error) {
      console.error("Error loading employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const buildDepartmentHierarchy = (departments: Department[]): Department[] => {
    const departmentMap: { [key: number]: Department } = {};

    departments.forEach((department) => {
      departmentMap[department.id] = { ...department, subDepartments: [] };
    });

    const rootDepartments: Department[] = [];

    departments.forEach((department) => {
      if (department.parent && department.parent.id) {
        const parent = departmentMap[department.parent.id];
        if (parent) {
          parent.subDepartments?.push(departmentMap[department.id]);
        }
      } else {
        rootDepartments.push(departmentMap[department.id]);
      }
    });

    return rootDepartments;
  };

  const renderDepartment = (department: Department) => {
    return (
      <div className={styles.departmentItem}>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          className={styles.primaryButton}
        />
        <span style={{ flex: 1 }}>{department.title}</span>
        <span>
          {department.chief?.fullName || "Без керівника"}
        </span>
      </div>
    );
  };

  const buildDepartmentItems = (departments: Department[]) => {
    return departments.map((department) => {
      return {
        key: department.id.toString(),
        label: renderDepartment(department),
        showArrow: false,
        children: department.subDepartments ? (
          <Collapse
            items={buildDepartmentItems(department.subDepartments)}
          />
        ) : null,
        className: styles.collapsePanel,
      };
    });
  };

  return (
    <div className={styles.pageContainer}>
      <div>
        <h2 className={styles.pageHeader}>Структура компанії</h2>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Collapse className={styles.collapseContainer} items={buildDepartmentItems(departments)} />
        )}
      </div>
    </div>
  );
};

export default DepartmentHierarchyPage;
