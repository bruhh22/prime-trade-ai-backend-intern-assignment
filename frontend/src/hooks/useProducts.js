import { useState, useCallback } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api/product.api';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchProducts();
            // Adjust depending on backend response structure (e.g. response.data or just response)
            setProducts(response.data || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, []);

    const addProduct = async (productData) => {
        setLoading(true);
        try {
            await createProduct(productData);
            await loadProducts(); // Refresh list
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create product');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const editProduct = async (id, productData) => {
        setLoading(true);
        try {
            await updateProduct(id, productData);
            await loadProducts();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update product');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const removeProduct = async (id) => {
        setLoading(true);
        try {
            await deleteProduct(id);
            await loadProducts();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete product');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { products, loading, error, loadProducts, addProduct, editProduct, removeProduct };
};

export default useProducts;