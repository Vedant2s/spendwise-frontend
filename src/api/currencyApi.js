import axiosClient from './axiosClient';

export const getAvailableCurrencies = async () => {
    const response = await axiosClient.get("/currency");
    return response.data;
};