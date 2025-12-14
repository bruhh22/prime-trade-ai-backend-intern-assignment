import React from 'react';
import Button from '../common/Button';
import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

const ProductCard = ({ product, onEdit, onDelete }) => {
    const { user } = useAuth();
    const isAdmin = user?.role === ROLES.ADMIN;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full border border-gray-100 hover:shadow-lg transition-shadow">
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Stock: {product.stock}</span>
                    <span className="text-xs">By: {product.createdBy?.name || 'Unknown'}</span>
                </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>

                {isAdmin && (
                    <div className="flex space-x-2">
                        <Button variant="secondary" onClick={() => onEdit(product)} className="text-sm px-3 py-1">
                            Edit
                        </Button>
                        <Button variant="danger" onClick={() => onDelete(product._id)} className="text-sm px-3 py-1">
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;