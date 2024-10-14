import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authStore } from "../store/authStore";
import { LoginForm } from "../components/LoginForm";
import styles from "../styles/LoginPage.module.scss";

const LoginPage = observer(() => {
  if (authStore.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.loginPageContainer}>
      <LoginForm />
    </div>
  );
});

export default LoginPage;
