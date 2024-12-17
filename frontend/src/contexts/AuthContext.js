import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const { data } = await axios.get('http://localhost:5000/api/auth/validate');
                    setUser(data); // Assuming `data` contains user details (e.g., role)
                } catch (error) {
                    localStorage.removeItem('authToken');
                    delete axios.defaults.headers.common['Authorization'];
                }
            }
            setLoading(false);
        };

        validateToken();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            setUser({
                email: data.email,
                role: data.role,
                organizationId: data.organizationId,
            });
            localStorage.setItem('authToken', data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            return data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
