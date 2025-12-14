import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(ROUTES.LOGIN);
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-blue-600">PrimeTrade</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <span className="text-gray-700">Hi, {user?.name} ({user?.role})</span>
                                <Link to={ROUTES.DASHBOARD} className="text-gray-600 hover:text-blue-600">Dashboard</Link>
                                <Link to={ROUTES.PRODUCTS} className="text-gray-600 hover:text-blue-600">Products</Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-600 hover:text-red-800 font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to={ROUTES.LOGIN} className="text-gray-600 hover:text-blue-600">Login</Link>
                                <Link to={ROUTES.REGISTER} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;