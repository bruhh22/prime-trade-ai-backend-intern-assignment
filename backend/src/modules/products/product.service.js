import Product from './product.model.js';

export const getAllProducts = async () => {
    return await Product.find().populate('createdBy', 'name email');
};

export const getProductById = async (id) => {
    const product = await Product.findById(id).populate('createdBy', 'name email');
    if (!product) throw new Error('Product not found');
    return product;
};

export const createProduct = async (productData, userId) => {
    return await Product.create({ ...productData, createdBy: userId });
};

export const updateProduct = async (id, updateData) => {
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!product) throw new Error('Product not found');
    return product;
};

export const deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error('Product not found');
    return product;
};