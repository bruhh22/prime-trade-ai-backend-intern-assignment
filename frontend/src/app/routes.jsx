import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import { ROUTES } from '../utils/constants';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />

            {/* Protected Routes */}
            <Route path={ROUTES.DASHBOARD} element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />

            <Route path={ROUTES.PRODUCTS} element={
                <ProtectedRoute>
                    <Products />
                </ProtectedRoute>
            } />

            {/* Redirect Root to Dashboard (which will redirect to Login if not auth) */}
            <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
            <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Routes>
    );
};

export default AppRoutes;