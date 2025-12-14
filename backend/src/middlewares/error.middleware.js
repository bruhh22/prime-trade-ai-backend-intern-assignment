import { config } from '../config/env.js';
import { HTTP_STATUS } from '../config/constants.js';

export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';

    console.error(`[Error] ${req.method} ${req.url}: ${message}`);
    if (config.nodeEnv === 'development') {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        stack: config.nodeEnv === 'development' ? err.stack : undefined,
    });
};