import { createContext, useState, useEffect } from 'react';
import { getToken, getUser, setToken as setLocalToken, setUser as setLocalUser, removeToken } from '../utils/token';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = getToken();
        const storedUser = getUser();

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (userData, authToken) => {
        setLocalToken(authToken);
        setLocalUser(userData);
        setToken(authToken);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeToken();
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};