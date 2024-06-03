// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken'); // Изменено с 'token' на 'authToken'
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token); // Сохраняем токен в localStorage
        setIsAuthenticated(true);

    };

    const logout = () => {
        localStorage.removeItem('authToken'); // Изменено с 'token' на 'authToken'
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        window.location.replace('/');
    };

    const getToken = () => {
        return localStorage.getItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};
