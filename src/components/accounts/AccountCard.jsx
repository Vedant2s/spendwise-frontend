import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/currency";
import { ROUTES } from "../../utils/constants";

const AccountCard = ({ account }) => {
    const id = account.id ?? account.accountId;
    const name = account.name || account.accountName || "Unnamed Account";
    const type = account.type || account.accountType || "";
    const currency = account.currency || account.currencyCode || "USD";
    const balance = account.balance ?? account.currentBalance ?? 0;

    return (
        <Link
            to={`${ROUTES.ACCOUNTS}/${id}`}
            state={{ account }}
            className="card account-card"
        >
            <div className="account-card-top">
                <div>
                    <h3 className="account-card-name">{name}</h3>
                    {type && <div className="account-card-type">{type}</div>}
                </div>

                <span className="currency-badge">{currency}</span>
            </div>

            <div className="account-card-balance">
                {formatCurrency(balance, currency)}
            </div>
        </Link>
    );
};

export default AccountCard;