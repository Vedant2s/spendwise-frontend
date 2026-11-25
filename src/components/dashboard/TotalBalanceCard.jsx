import Loader from "../common/Loader";
import { formatCurrency } from "../../utils/currency";

const TotalBalanceCard = ({ data, loading }) => {
    const amount =
        typeof data === "number"
            ? data
            : data?.actualBalance ?? data?.totalBalance ?? data?.balance ?? data?.amount;

    const currency = data?.currency || data?.currencyCode || "USD";

    return (
        <div className="card">
            <div className="card-title">Actual Balance</div>

            {loading ? (
                <Loader text="" />
            ) : (
                <>
                    <div className="big-balance">
                        {formatCurrency(amount ?? 0, currency)}
                    </div>
                    <p className="balance-meta">
                        Net balance for the selected period ({currency})
                    </p>
                </>
            )}
        </div>
    );
};

export default TotalBalanceCard;