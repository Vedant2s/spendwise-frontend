import Loader from "../common/Loader";
import { formatCurrency } from "../../utils/currency";

const normalizeCurrencyList = (data) => {
    if (!data) return [];

    if (Array.isArray(data)) {
        return data.map((item) => ({
            currency: item.currency || item.currencyCode || item.code || "USD",
            balance: item.balance ?? item.amount ?? item.totalBalance ?? 0,
        }));
    }

    if (typeof data === "object") {
        return Object.entries(data).map(([currency, balance]) => ({
            currency,
            balance,
        }));
    }

    return [];
};

const CurrencyBalanceCard = ({ data, loading }) => {
    const items = normalizeCurrencyList(data);

    return (
        <div className="card">
            <div className="card-title">Balance by Currency</div>

            {loading ? (
                <Loader text="" />
            ) : items.length === 0 ? (
                <div className="empty-state">No currency balances found.</div>
            ) : (
                <ul className="balance-list">
                    {items.map((item) => (
                        <li key={item.currency} className="balance-list-item">
                            <span className="balance-list-name">{item.currency}</span>
                            <span className="balance-list-amount">
                                {formatCurrency(item.balance, item.currency)}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CurrencyBalanceCard;