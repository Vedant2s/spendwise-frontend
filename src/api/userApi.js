import axiosClient from './axiosClient';

export const setCurrencyPreference = async (data) => {
    const response = await axiosClient.patch("/users/me/preferences", data);
    return response.data;
};