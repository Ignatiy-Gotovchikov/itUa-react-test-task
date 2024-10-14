import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authStore } from "../store/authStore";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  if (!authStore.token || !authStore.refreshToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
