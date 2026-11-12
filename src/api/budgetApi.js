import axiosClient from './axiosClient';

export const createBudget = async (data) => {
    const response = await axiosClient.post("/budget",data);
    return response.data;
};