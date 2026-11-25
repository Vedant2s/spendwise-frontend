import axiosClient from './axiosClient';

export const createGoal = async (data) => {
    const response = await axiosClient.post("/goals", data);
    return response.data;
};
export const getGoals = async () => {
    const response = await axiosClient.get("/goals");
    return response.data;
}