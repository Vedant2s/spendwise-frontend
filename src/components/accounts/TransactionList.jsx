import Loader from "../common/Loader";
import { formatCurrency } from "../../utils/currency";
import { formatDate } from "../../utils/date";

const TransactionList = ({
    transactions,
    loading,
    fallbackCurrency = "USD",
}) => {
    const list = Array.isArray(transactions)
        ? transactions
        : transactions?.records || transactions?.content || [];

    return (
        <div className="card">
            <div className="card-title">Recent Transactions</div>

            {loading ? (
                <Loader text="Loading transactions..." />
            ) : list.length === 0 ? (
                <div className="empty-state">
                    No transactions found for this period.
                </div>
            ) : (
                <ul className="transaction-list">
                    {list.map((tx, index) => {
                        const id = tx.id ?? tx.transactionId ?? index;
                        const title =
                            tx.description ||
                            tx.title ||
                            tx.note ||
                            tx.category ||
                            "Transaction";
                        const category = tx.category || tx.categoryName || "";
                        const date = formatDate(
                            tx.date ?? tx.transactionDate ?? tx.createdAt
                        );
                        const currency =
                            tx.currency || tx.currencyCode || fallbackCurrency;
                        const rawAmount = Number(tx.amount ?? 0);
                        const isIncome =
                            tx.type?.toUpperCase() === "INCOME" || rawAmount > 0;
                        const displayAmount = Math.abs(rawAmount);

                        return (
                            <li key={id} className="transaction-item">
                                <div className="transaction-info">
                                    <span className="transaction-title">
                                        {title}
                                    </span>
                                    <span className="transaction-meta">
                                        {[category, date]
                                            .filter(Boolean)
                                            .join(" • ")}
                                    </span>
                                </div>

                                <span
                                    className={`transaction-amount ${
                                        isIncome ? "text-success" : "text-danger"
                                    }`}
                                >
                                    {isIncome ? "+" : "-"}
                                    {formatCurrency(displayAmount, currency)}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default TransactionList;