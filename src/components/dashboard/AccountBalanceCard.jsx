import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import { formatCurrency } from "../../utils/currency";
import { ROUTES } from "../../utils/constants";

const normalizeAccountBalances = (data) => {
    if (!Array.isArray(data)) return [];

    return data.map((acc, index) => ({
        id: acc.accountId ?? acc.id ?? index,
        hasRouteId: Boolean(acc.accountId ?? acc.id),
        name: acc.accountName || acc.name || `Account ${index + 1}`,
        balance: acc.balance ?? acc.currentBalance ?? acc.amount ?? 0,
        currency: acc.currency || acc.currencyCode || "USD",
    }));
};

const AccountBalanceCard = ({ data, loading }) => {
    const accounts = normalizeAccountBalances(data);

    return (
        <div className="card">
            <div className="card-title">Balance by Account</div>

            {loading ? (
                <Loader text="" />
            ) : accounts.length === 0 ? (
                <div className="empty-state">No accounts found.</div>
            ) : (
                <ul className="balance-list">
                    {accounts.map((account) => (
                        <li key={account.id} className="balance-list-item">
                            {account.hasRouteId ? (
                                <Link
                                    to={`${ROUTES.ACCOUNTS}/${account.id}`}
                                    className="balance-list-name"
                                >
                                    {account.name}
                                </Link>
                            ) : (
                                <span className="balance-list-name">{account.name}</span>
                            )}

                            <span className="balance-list-amount">
                                {formatCurrency(account.balance, account.currency)}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AccountBalanceCard;