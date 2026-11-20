import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
// import DashboardPage from "../pages/DashboardPage";
// import AccountsPage from "../pages/AccountsPage";
// import AccountDetailsPage from "../pages/AccountDetailsPage";
// import BudgetPage from "../pages/BudgetPage";
// import GoalsPage from "../pages/GoalsPage";
// import SettingsPage from "../pages/SettingsPage";
// import NotFoundPage from "../pages/NotFoundPage";

// import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            {/* <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            /> */}

            {/* <Route
                path="/accounts"
                element={
                    <ProtectedRoute>
                        <AccountsPage />
                    </ProtectedRoute>
                }
            /> */}

            {/* <Route
                path="/accounts/:accountId"
                element={
                    <ProtectedRoute>
                        <AccountDetailsPage />
                    </ProtectedRoute>
                }
            /> */}
{/* 
            <Route
                path="/budgets"
                element={
                    <ProtectedRoute>
                        <BudgetPage />
                    </ProtectedRoute>
                }
            /> */}

            {/* <Route
                path="/goals"
                element={
                    <ProtectedRoute>
                        <GoalsPage />
                    </ProtectedRoute>
                }
            /> */}

            {/* <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <SettingsPage />
                    </ProtectedRoute>
                }
            /> */}

            {/* Default route */}
            {/* <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
            /> */}
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />
            {/* Unknown routes */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}

        </Routes>
    );
};

export default AppRoutes;