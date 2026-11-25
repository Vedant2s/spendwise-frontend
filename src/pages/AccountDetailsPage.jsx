import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
    getAccounts,
    getExpenseStructure,
    getRecentTransactions,
} from "../api/accountApi";
import usePeriod from "../hooks/usePeriod";
import PeriodSelector from "../components/common/PeriodSelector";
import ErrorMessage from "../components/common/ErrorMessage";
import ExpenseStructureChart from "../components/accounts/ExpenseStructureChart";
import TransactionList from "../components/accounts/TransactionList";
import { formatCurrency } from "../utils/currency";
import { ROUTES } from "../utils/constants";

const AccountDetailsPage = () => {
    const { accountId } = useParams();
    const location = useLocation();
    const { period, setPeriod } = usePeriod();

    const [account, setAccount] = useState(location.state?.account || null);
    const [expenseStructure, setExpenseStructure] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (account) return;

        let active = true;
        const loadAccountInfo = async () => {
            try {
                const data = await getAccounts();
                const list = Array.isArray(data) ? data : data?.accounts || [];
                const matched = list.find(
                    (item) => String(item.id ?? item.accountId) === String(accountId)
                );
                if (active && matched) {
                    setAccount(matched);
                }
            } catch {
                // Non-blocking fallback
            }
        };

        loadAccountInfo();
        return () => {
            active = false;
        };
    }, [account, accountId]);

    const fetchDetails = useCallback(async () => {
        setLoading(true);
        setError("");

        const [structureRes, txRes] = await Promise.allSettled([
            getExpenseStructure(accountId, period),
            getRecentTransactions(period),
        ]);

        if (structureRes.status === "fulfilled") {
            setExpenseStructure(structureRes.value);
        }

        if (txRes.status === "fulfilled") {
            const rawList = Array.isArray(txRes.value)
                ? txRes.value
                : txRes.value?.records || txRes.value?.content || [];

            // Filter by accountId if the transaction objects include it
            const hasAccountIds = rawList.some(
                (tx) => tx.accountId !== undefined && tx.accountId !== null
            );

            setTransactions(
                hasAccountIds
                    ? rawList.filter(
                          (tx) => String(tx.accountId) === String(accountId)
                      )
                    : rawList
            );
        }

        if (
            structureRes.status === "rejected" &&
            txRes.status === "rejected"
        ) {
            setError("Failed to load account details.");
        }

        setLoading(false);
    }, [accountId, period]);

    useEffect(() => {
        fetchDetails();
    }, [fetchDetails]);

    const accountName =
        account?.name || account?.accountName || `Account #${accountId}`;
    const currency = account?.currency || account?.currencyCode || "USD";
    const balance = account?.balance ?? account?.currentBalance;

    return (
        <div className="account-details-page">
            <div>
                <Link to={ROUTES.ACCOUNTS} className="back-link">
                    &larr; Back to Accounts
                </Link>

                <div className="dashboard-header">
                    <div>
                        <h2 style={{ margin: 0 }}>{accountName}</h2>
                        {balance !== undefined && (
                            <p className="dashboard-subtitle">
                                Current balance:{" "}
                                <strong>{formatCurrency(balance, currency)}</strong>
                            </p>
                        )}
                    </div>

                    <PeriodSelector value={period} onChange={setPeriod} />
                </div>
            </div>

            <ErrorMessage message={error} onRetry={fetchDetails} />

            <div className="account-details-grid">
                <ExpenseStructureChart
                    data={expenseStructure}
                    loading={loading}
                    currency={currency}
                />

                <TransactionList
                    transactions={transactions}
                    loading={loading}
                    fallbackCurrency={currency}
                />
            </div>
        </div>
    );
};

export default AccountDetailsPage;