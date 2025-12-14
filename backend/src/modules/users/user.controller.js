import * as userService from './user.service.js';
import { apiResponse } from '../../utils/apiResponse.js';
import { HTTP_STATUS } from '../../config/constants.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        apiResponse(res, HTTP_STATUS.OK, true, 'Users retrieved successfully', users);
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        apiResponse(res, HTTP_STATUS.OK, true, 'User retrieved successfully', user);
    } catch (error) {
        if (error.message === 'User not found') {
            return apiResponse(res, HTTP_STATUS.NOT_FOUND, false, error.message);
        }
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        apiResponse(res, HTTP_STATUS.OK, true, 'User deleted successfully');
    } catch (error) {
        if (error.message === 'User not found') {
            return apiResponse(res, HTTP_STATUS.NOT_FOUND, false, error.message);
        }
        next(error);
    }
};