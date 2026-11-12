import axiosClient from "./axiosClient";

export const login = async (credentials) => {
    const response = await axiosClient.post(
        "/auth/v1/login",
        credentials
    );

    return response.data;
};

export const register = async (userData) => {
    const response = await axiosClient.post(
        "/auth/v1/register",
        userData
    );

    return response.data;
};