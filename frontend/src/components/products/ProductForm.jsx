import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const ProductForm = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                price: initialData.price || '',
                stock: initialData.stock || '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert numbers
        onSubmit({
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock)
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Price ($)"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Stock"
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
                <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit" variant="primary">
                    {initialData ? 'Update Product' : 'Create Product'}
                </Button>
            </div>
        </form>
    );
};

export default ProductForm;