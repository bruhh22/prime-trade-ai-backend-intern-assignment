import React, { useEffect, useState } from 'react';
import useProducts from '../hooks/useProducts';
import useAuth from '../hooks/useAuth';
import ProductCard from '../components/products/ProductCard';
import ProductForm from '../components/products/ProductForm';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import { ROLES } from '../utils/constants';

const Products = () => {
    const { products, loading, error, loadProducts, addProduct, editProduct, removeProduct } = useProducts();
    const { user } = useAuth();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const isAdmin = user?.role === ROLES.ADMIN;

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await removeProduct(id);
        }
    };

    const handleFormSubmit = async (data) => {
        try {
            if (editingProduct) {
                await editProduct(editingProduct._id, data);
            } else {
                await addProduct(data);
            }
            setIsFormOpen(false);
            setEditingProduct(null);
        } catch (err) {
            console.error(err);
            // Error handled in hook/displayed in UI via error state if needed
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                {isAdmin && !isFormOpen && (
                    <Button onClick={() => setIsFormOpen(true)} variant="primary">
                        + Add Product
                    </Button>
                )}
            </div>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>}

            {isFormOpen ? (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-2xl mx-auto border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Create New Product'}</h2>
                    <ProductForm
                        initialData={editingProduct}
                        onSubmit={handleFormSubmit}
                        onCancel={() => { setIsFormOpen(false); setEditingProduct(null); }}
                    />
                </div>
            ) : (
                <>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.length === 0 ? (
                                <p className="text-gray-500 col-span-full text-center py-10">No products found.</p>
                            ) : (
                                products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Products;