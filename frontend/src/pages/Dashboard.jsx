import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROUTES, ROLES } from '../utils/constants';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-blue-600 p-6 text-white">
                    <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
                    <p className="mt-2 opacity-90">You are logged in as: <span className="font-bold uppercase bg-white/20 px-2 py-1 rounded text-sm">{user?.role}</span></p>
                </div>

                <div className="p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link to={ROUTES.PRODUCTS} className="block p-6 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                            <h3 className="text-lg font-bold text-blue-600">View Products</h3>
                            <p className="text-gray-600 mt-2">Browse the product catalog.</p>
                        </Link>

                        {user?.role === ROLES.ADMIN && (
                            <Link to={ROUTES.PRODUCTS} className="block p-6 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                                <h3 className="text-lg font-bold text-green-600">Manage Inventory</h3>
                                <p className="text-gray-600 mt-2">Add, edit, or delete products.</p>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;