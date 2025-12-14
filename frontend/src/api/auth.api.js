import api from './axios';

export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data; // Expected: { success: true, data: { user, token } }
};

export const registerUser = async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
};