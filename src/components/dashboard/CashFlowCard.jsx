import Loader from "../common/Loader";
import { formatCurrency } from "../../utils/currency";

const CashFlowCard = ({ data, loading }) => {
    const income = Number(data?.income ?? data?.totalIncome ?? 0);
    const expense = Math.abs(
        Number(data?.expense ?? data?.expenses ?? data?.totalExpense ?? 0)
    );
    const net =
        data?.netCashFlow ?? data?.net ?? data?.balance ?? income - expense;
    const currency = data?.currency || data?.currencyCode || "USD";

    const totalVolume = income + expense;
    const incomePercent = totalVolume > 0 ? (income / totalVolume) * 100 : 50;

    return (
        <div className="card">
            <div className="card-title">Cash Flow</div>

            {loading ? (
                <Loader text="" />
            ) : !data ? (
                <div className="empty-state">No cash flow data for this period.</div>
            ) : (
                <div className="cashflow-rows">
                    <div className="cashflow-row">
                        <span>Income</span>
                        <span className="text-success">
                            +{formatCurrency(income, currency)}
                        </span>
                    </div>

                    <div className="cashflow-row">
                        <span>Expenses</span>
                        <span className="text-danger">
                            -{formatCurrency(expense, currency)}
                        </span>
                    </div>

                    <div className="cashflow-bar-track" aria-hidden="true">
                        <div
                            className="cashflow-bar-income"
                            style={{ width: `${incomePercent}%` }}
                        />
                    </div>

                    <div
                        className="cashflow-row"
                        style={{
                            paddingTop: "0.5rem",
                            borderTop: "1px solid var(--color-border)",
                            fontWeight: 700,
                        }}
                    >
                        <span>Net</span>
                        <span className={net >= 0 ? "text-success" : "text-danger"}>
                            {formatCurrency(net, currency)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CashFlowCard;