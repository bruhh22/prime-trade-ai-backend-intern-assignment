import * as authService from './auth.service.js';
import { registerSchema, loginSchema } from './auth.validation.js';
import { apiResponse } from '../../utils/apiResponse.js';
import { HTTP_STATUS } from '../../config/constants.js';

export const register = async (req, res, next) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return apiResponse(res, HTTP_STATUS.BAD_REQUEST, false, error.details[0].message);
        }

        const user = await authService.registerUser(value);
        return apiResponse(res, HTTP_STATUS.CREATED, true, 'User registered successfully', user);
    } catch (err) {
        if (err.message === 'User already exists') {
            return apiResponse(res, HTTP_STATUS.BAD_REQUEST, false, err.message);
        }
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return apiResponse(res, HTTP_STATUS.BAD_REQUEST, false, error.details[0].message);
        }

        const { user, token } = await authService.loginUser(value.email, value.password);

        return apiResponse(res, HTTP_STATUS.OK, true, 'Login successful', {
            user,
            token
        });
    } catch (err) {
        if (err.message === 'Invalid credentials') {
            return apiResponse(res, HTTP_STATUS.UNAUTHORIZED, false, err.message);
        }
        next(err);
    }
};