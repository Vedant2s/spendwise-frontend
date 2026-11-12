import axiosClient from "./axiosClient";

export const getCurrencyBalances = async () => {
    const response =
        await axiosClient.get("/dashboard/balance/currency");

    return response.data;
};

export const getAccountBalances = async () => {
    const response =
        await axiosClient.get("/dashboard/balance/accounts");

    return response.data;
};

export const getCashFlow = async (period) => {
    const response =
        await axiosClient.get("/dashboard/cash-flow", {
            params: { period }
        });

    return response.data;
};

export const getSpendingStructure = async (period) => {
    const response =
        await axiosClient.get("/dashboard/spending/structure", {
            params: { period }
        });

    return response.data;
};

export const getBalanceTrend = async (period) => {
    const response =
        await axiosClient.get("/dashboard/balance/trend", {
            params: { period }
        });

    return response.data;
};

export const getActualBalance = async (period) => {
    const response =
        await axiosClient.get("/dashboard/balance/actual-balance", {
            params: { period }
        });

    return response.data;
};