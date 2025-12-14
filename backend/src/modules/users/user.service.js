import User from './user.model.js';

export const getAllUsers = async () => {
    // Return all users but exclude passwords
    return await User.find().select('-password');
};

export const getUserById = async (id) => {
    const user = await User.findById(id).select('-password');
    if (!user) throw new Error('User not found');
    return user;
};

export const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error('User not found');
    return user;
};