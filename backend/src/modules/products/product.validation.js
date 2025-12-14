import Joi from 'joi';

export const createProductSchema = Joi.object({
    name: Joi.string().required().min(3),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().min(0).required(),
});

export const updateProductSchema = Joi.object({
    name: Joi.string().min(3),
    description: Joi.string(),
    price: Joi.number().positive(),
    stock: Joi.number().min(0),
});