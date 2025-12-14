/**
 * Standardized API Response
 * @param {Response} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {boolean} success - Success status
 * @param {string} message - Message
 * @param {object} data - Data payload (optional)
 */
export const apiResponse = (res, statusCode, success, message, data = null) => {
    const response = {
        success,
        message,
    };

    if (data !== null) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};