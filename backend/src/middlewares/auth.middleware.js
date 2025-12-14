import { verifyToken } from '../utils/jwt.js';
import { apiResponse } from '../utils/apiResponse.js';
import { HTTP_STATUS } from '../config/constants.js';

export const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return apiResponse(res, HTTP_STATUS.UNAUTHORIZED, false, 'Not authorized, no token provided');
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return apiResponse(res, HTTP_STATUS.UNAUTHORIZED, false, 'Not authorized, invalid token');
    }

    // Attach user info to request
    req.user = decoded;
    next();
};