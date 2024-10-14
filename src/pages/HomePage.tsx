import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import styles from "../styles/HomePage.module.scss";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <h2 className={styles.navigationTitle}>Навігація</h2>
      <Button type="primary" className={styles.navButton}>
        <Link to="/employees">Employee List</Link>
      </Button>
      <Button type="primary">
        <Link to="/departments">Departments</Link>
      </Button>
    </div>
  );
};

export default HomePage;
