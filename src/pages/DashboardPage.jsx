import { useCallback, useEffect, useState } from "react";
import {
    getAccountBalances,
    getActualBalance,
    getBalanceTrend,
    getCashFlow,
    getCurrencyBalances,
    getSpendingStructure,
} from "../api/dashboardApi";
import usePeriod from "../hooks/usePeriod";
import PeriodSelector from "../components/common/PeriodSelector";
import ErrorMessage from "../components/common/ErrorMessage";
import TotalBalanceCard from "../components/dashboard/TotalBalanceCard";
import CashFlowCard from "../components/dashboard/CashFlowCard";
import CurrencyBalanceCard from "../components/dashboard/CurrencyBalanceCard";
import AccountBalanceCard from "../components/dashboard/AccountBalanceCard";
import BalanceTrendChart from "../components/dashboard/BalanceTrendChart";
import SpendingStructureChart from "../components/dashboard/SpendingStructureChart";

const DashboardPage = () => {
    const { period, setPeriod } = usePeriod();

    const [staticLoading, setStaticLoading] = useState(true);
    const [periodLoading, setPeriodLoading] = useState(true);
    const [error, setError] = useState("");

    const [currencyBalances, setCurrencyBalances] = useState(null);
    const [accountBalances, setAccountBalances] = useState(null);
    const [actualBalance, setActualBalance] = useState(null);
    const [cashFlow, setCashFlow] = useState(null);
    const [balanceTrend, setBalanceTrend] = useState(null);
    const [spendingStructure, setSpendingStructure] = useState(null);

    const fetchStaticData = useCallback(async () => {
        setStaticLoading(true);
        const [currencyRes, accountRes] = await Promise.allSettled([
            getCurrencyBalances(),
            getAccountBalances(),
        ]);

        if (currencyRes.status === "fulfilled") {
            setCurrencyBalances(currencyRes.value);
        }
        if (accountRes.status === "fulfilled") {
            setAccountBalances(accountRes.value);
        }

        if (
            currencyRes.status === "rejected" &&
            accountRes.status === "rejected"
        ) {
            setError("Failed to load balance overview.");
        }

        setStaticLoading(false);
    }, []);

    const fetchPeriodData = useCallback(async () => {
        setPeriodLoading(true);
        setError("");

        const [actualRes, cashFlowRes, trendRes, spendingRes] =
            await Promise.allSettled([
                getActualBalance(period),
                getCashFlow(period),
                getBalanceTrend(period),
                getSpendingStructure(period),
            ]);

        if (actualRes.status === "fulfilled") setActualBalance(actualRes.value);
        if (cashFlowRes.status === "fulfilled") setCashFlow(cashFlowRes.value);
        if (trendRes.status === "fulfilled") setBalanceTrend(trendRes.value);
        if (spendingRes.status === "fulfilled") {
            setSpendingStructure(spendingRes.value);
        }

        const anyRejected = [
            actualRes,
            cashFlowRes,
            trendRes,
            spendingRes,
        ].some((res) => res.status === "rejected");

        if (anyRejected) {
            setError("Some dashboard data failed to load.");
        }

        setPeriodLoading(false);
    }, [period]);

    useEffect(() => {
        fetchStaticData();
    }, [fetchStaticData]);

    useEffect(() => {
        fetchPeriodData();
    }, [fetchPeriodData]);

    const preferredCurrency =
        actualBalance?.currency ||
        actualBalance?.currencyCode ||
        cashFlow?.currency ||
        "USD";

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <p className="dashboard-subtitle">
                    Overview of your balances, cash flow, and spending
                </p>

                <PeriodSelector value={period} onChange={setPeriod} />
            </div>

            <ErrorMessage
                message={error}
                onRetry={() => {
                    fetchStaticData();
                    fetchPeriodData();
                }}
            />

            <div className="dashboard-grid-top">
                <TotalBalanceCard
                    data={actualBalance}
                    loading={periodLoading}
                />
                <CashFlowCard data={cashFlow} loading={periodLoading} />
            </div>

            <div className="dashboard-grid-charts">
                <BalanceTrendChart
                    data={balanceTrend}
                    loading={periodLoading}
                    currency={preferredCurrency}
                />
                <SpendingStructureChart
                    data={spendingStructure}
                    loading={periodLoading}
                    currency={preferredCurrency}
                />
            </div>

            <div className="dashboard-grid-bottom">
                <CurrencyBalanceCard
                    data={currencyBalances}
                    loading={staticLoading}
                />
                <AccountBalanceCard
                    data={accountBalances}
                    loading={staticLoading}
                />
            </div>
        </div>
    );
};

export default DashboardPage;