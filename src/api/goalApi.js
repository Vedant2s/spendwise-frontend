import axiosClient from './axiosClient';

export const createGoal = async (data) => {
    const response = await axiosClient.post("/goals", data);
    return response.data;
};