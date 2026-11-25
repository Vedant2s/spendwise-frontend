import { useCallback, useEffect, useState } from "react";
import { getAccounts } from "../api/accountApi";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import AccountCard from "../components/accounts/AccountCard";
import CreateAccountModal from "../components/accounts/CreateAccountModal";

const AccountsPage = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchAccounts = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getAccounts();
            setAccounts(Array.isArray(data) ? data : data?.accounts || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Failed to load your accounts."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);

    return (
        <div>
            <div className="page-header">
                <p className="page-subtitle">
                    Manage your wallets and bank accounts
                </p>

                <Button onClick={() => setIsModalOpen(true)}>
                    + New Account
                </Button>
            </div>

            <ErrorMessage message={error} onRetry={fetchAccounts} />

            {loading ? (
                <Loader fullPage text="Loading accounts..." />
            ) : accounts.length === 0 ? (
                <div className="card empty-state">
                    <p style={{ marginBottom: "1rem" }}>
                        You don&apos;t have any accounts yet.
                    </p>
                    <Button onClick={() => setIsModalOpen(true)}>
                        Create your first account
                    </Button>
                </div>
            ) : (
                <div className="accounts-grid">
                    {accounts.map((account, index) => (
                        <AccountCard
                            key={account.id ?? account.accountId ?? index}
                            account={account}
                        />
                    ))}
                </div>
            )}

            <CreateAccountModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreated={fetchAccounts}
            />
        </div>
    );
};

export default AccountsPage;