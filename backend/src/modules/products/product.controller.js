import * as productService from './product.service.js';
import { createProductSchema, updateProductSchema } from './product.validation.js';
import { apiResponse } from '../../utils/apiResponse.js';
import { HTTP_STATUS } from '../../config/constants.js';

export const getProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        apiResponse(res, HTTP_STATUS.OK, true, 'Products retrieved successfully', products);
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        apiResponse(res, HTTP_STATUS.OK, true, 'Product retrieved successfully', product);
    } catch (error) {
        if (error.message === 'Product not found') {
            return apiResponse(res, HTTP_STATUS.NOT_FOUND, false, error.message);
        }
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const { error, value } = createProductSchema.validate(req.body);
        if (error) return apiResponse(res, HTTP_STATUS.BAD_REQUEST, false, error.details[0].message);

        const newProduct = await productService.createProduct(value, req.user.id);
        apiResponse(res, HTTP_STATUS.CREATED, true, 'Product created successfully', newProduct);
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { error, value } = updateProductSchema.validate(req.body);
        if (error) return apiResponse(res, HTTP_STATUS.BAD_REQUEST, false, error.details[0].message);

        const updatedProduct = await productService.updateProduct(req.params.id, value);
        apiResponse(res, HTTP_STATUS.OK, true, 'Product updated successfully', updatedProduct);
    } catch (error) {
        if (error.message === 'Product not found') {
            return apiResponse(res, HTTP_STATUS.NOT_FOUND, false, error.message);
        }
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProduct(req.params.id);
        apiResponse(res, HTTP_STATUS.OK, true, 'Product deleted successfully');
    } catch (error) {
        if (error.message === 'Product not found') {
            return apiResponse(res, HTTP_STATUS.NOT_FOUND, false, error.message);
        }
        next(error);
    }
};