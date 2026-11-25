import { useState } from "react";
import CreateBudgetForm from "../components/budgets/CreateBudgetForm";
import { formatCurrency } from "../utils/currency";

const BudgetPage = () => {
    const [budgets, setBudgets] = useState([]);

    const handleBudgetCreated = (newBudget) => {
        setBudgets((prev) => [newBudget, ...prev]);
    };

    return (
        <div>
            <div className="page-header">
                <p className="page-subtitle">
                    Set spending limits by category and time period
                </p>
            </div>

            <div className="two-col-layout">
                <CreateBudgetForm onCreated={handleBudgetCreated} />

                <div className="card">
                    <div className="card-title">Budgets</div>

                    {budgets.length === 0 ? (
                        <div className="empty-state">
                            Created budgets will appear here.
                        </div>
                    ) : (
                        <div className="item-card-list">
                            {budgets.map((budget, index) => (
                                <div
                                    key={budget.id ?? index}
                                    className="item-card-row"
                                >
                                    <div>
                                        <div className="item-card-title">
                                            {budget.name || budget.category || "Budget"}
                                        </div>
                                        <div className="item-card-meta">
                                            {[budget.category, budget.period]
                                                .filter(Boolean)
                                                .join(" • ")}
                                        </div>
                                    </div>

                                    <strong>
                                        {formatCurrency(
                                            budget.amount ?? budget.limitAmount ?? 0,
                                            budget.currency || "USD"
                                        )}
                                    </strong>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BudgetPage;