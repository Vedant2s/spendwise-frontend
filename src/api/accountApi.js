import axiosClient from "./axiosClient";

export const createAccount = async (data) => {
    const response = await axiosClient.post("/accounts", data);
    return response.data;
};

export const getAccounts = async () => {
    const response = await axiosClient.get("/accounts/wallet");
    return response.data;
};

export const getRecentTransactions = async (period) => {
    const response = await axiosClient.get(
        "/accounts/last-records",
        {
            params: { period }
        }
    );

    return response.data;
};

export const getExpenseStructure = async (accountId, period) => {
    const response = await axiosClient.get(
        `/accounts/${accountId}/expense-structure`,
        {
            params: { period }
        }
    );

    return response.data;
};