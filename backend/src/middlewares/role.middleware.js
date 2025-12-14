import { apiResponse } from '../utils/apiResponse.js';
import { HTTP_STATUS } from '../config/constants.js';

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return apiResponse(
                res,
                HTTP_STATUS.FORBIDDEN,
                false,
                `User role '${req.user?.role}' is not authorized to access this route`
            );
        }
        next();
    };
};