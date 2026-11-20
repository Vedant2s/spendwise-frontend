import { createContext, useState } from "react";
import { login as loginApi, register as registerApi } from "../api/authApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const login = async (credentials) => {
        const response = await loginApi(credentials);
        const token = response.token;

        localStorage.setItem("token", token);
        setToken(token);
        return response;
    };

    const register = async (userData) => {
        const response = await registerApi(userData);
        const token = response.token;

        if (token) {
            localStorage.setItem("token", token);
            setToken(token);
        }

        return response;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};