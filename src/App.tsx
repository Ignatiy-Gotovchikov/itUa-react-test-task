import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authStore } from "./store/authStore";
import RequireAuth from "./components/RequiredAuth";
import EmployeeListPage from "./pages/EmployeeListPage";
import LoginPage from "./pages/LoginPage";
import DepartmentHierarchyPage from "./pages/DepartmentHierarchyPage";
import HomePage from "./pages/HomePage";

const App = observer(() => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    authStore.initializeFromCookies();
    setIsInitializing(false);
  }, []);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
				<Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/departments"
          element={
            <RequireAuth>
              <DepartmentHierarchyPage />
            </RequireAuth>
          }
        />
        <Route
          path="/employees"
          element={
            <RequireAuth>
              <EmployeeListPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
});

export default App;
