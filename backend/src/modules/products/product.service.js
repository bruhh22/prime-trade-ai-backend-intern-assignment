// import Product from './product.model.js';

// export const getAllProducts = async () => {
//     return await Product.find().populate('createdBy', 'name email');
// };

// export const getProductById = async (id) => {
//     const product = await Product.findById(id).populate('createdBy', 'name email');
//     if (!product) throw new Error('Product not found');
//     return product;
// };

// export const createProduct = async (productData, userId) => {
//     return await Product.create({ ...productData, createdBy: userId });
// };

// export const updateProduct = async (id, updateData) => {
//     const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
//     if (!product) throw new Error('Product not found');
//     return product;
// };

// export const deleteProduct = async (id) => {
//     const product = await Product.findByIdAndDelete(id);
//     if (!product) throw new Error('Product not found');
//     return product;
// };

import Product from './product.model.js';
import * as cacheService from '../../cache/cache.service.js';

const CACHE_KEY_ALL = 'products:all';
const CACHE_KEY_ID = (id) => `products:${id}`;
const TTL_ALL = 60; // 60 seconds
const TTL_ID = 300; // 5 minutes

export const getAllProducts = async () => {
    // 1. Try Cache
    const cachedProducts = await cacheService.get(CACHE_KEY_ALL);
    if (cachedProducts) {
        return cachedProducts;
    }

    // 2. Query DB
    const products = await Product.find().populate('createdBy', 'name email');

    // 3. Set Cache
    await cacheService.set(CACHE_KEY_ALL, products, TTL_ALL);

    return products;
};

export const getProductById = async (id) => {
    // 1. Try Cache
    const cachedProduct = await cacheService.get(CACHE_KEY_ID(id));
    if (cachedProduct) {
        return cachedProduct;
    }

    // 2. Query DB
    const product = await Product.findById(id).populate('createdBy', 'name email');
    if (!product) throw new Error('Product not found');

    // 3. Set Cache
    await cacheService.set(CACHE_KEY_ID(id), product, TTL_ID);

    return product;
};

export const createProduct = async (productData, userId) => {
    const product = await Product.create({ ...productData, createdBy: userId });

    // Invalidation: The list of all products is now stale
    await cacheService.del(CACHE_KEY_ALL);

    return product;
};

export const updateProduct = async (id, updateData) => {
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!product) throw new Error('Product not found');

    // Invalidation: Clear specific product cache AND the main list
    await Promise.all([
        cacheService.del(CACHE_KEY_ID(id)),
        cacheService.del(CACHE_KEY_ALL)
    ]);

    return product;
};

export const deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error('Product not found');

    // Invalidation: Clear specific product cache AND the main list
    await Promise.all([
        cacheService.del(CACHE_KEY_ID(id)),
        cacheService.del(CACHE_KEY_ALL)
    ]);

    return product;
};