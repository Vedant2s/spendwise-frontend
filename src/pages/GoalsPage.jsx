import { useState } from "react";
import CreateGoalForm from "../components/goals/CreateGoalForm";
import { formatCurrency } from "../utils/currency";
import { formatDate } from "../utils/date";

const GoalsPage = () => {
    const [goals, setGoals] = useState([]);

    const handleGoalCreated = (newGoal) => {
        setGoals((prev) => [newGoal, ...prev]);
    };

    return (
        <div>
            <div className="page-header">
                <p className="page-subtitle">
                    Plan and track your savings milestones
                </p>
            </div>

            <div className="two-col-layout">
                <CreateGoalForm onCreated={handleGoalCreated} />

                <div className="card">
                    <div className="card-title">Savings Goals</div>

                    {goals.length === 0 ? (
                        <div className="empty-state">
                            Created goals will appear here.
                        </div>
                    ) : (
                        <div className="item-card-list">
                            {goals.map((goal, index) => {
                                const target = Number(goal.targetAmount ?? 0);
                                const current = Number(goal.currentAmount ?? 0);
                                const percent =
                                    target > 0
                                        ? Math.min(100, Math.round((current / target) * 100))
                                        : 0;
                                const currency = goal.currency || "USD";

                                return (
                                    <div
                                        key={goal.id ?? index}
                                        className="item-card-row"
                                        style={{
                                            flexDirection: "column",
                                            alignItems: "stretch",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                gap: "1rem",
                                            }}
                                        >
                                            <div>
                                                <div className="item-card-title">
                                                    {goal.name || "Savings Goal"}
                                                </div>
                                                {(goal.desired_date || goal.targetDate) && (
                                                    <div className="item-card-meta">
                                                        Desired date: {formatDate(goal.desired_date || goal.targetDate)}
                                                    </div>
                                                )}
                                            </div>

                                            <strong>
                                                {formatCurrency(current, currency)} /{" "}
                                                {formatCurrency(target, currency)}
                                            </strong>
                                        </div>

                                        <div className="progress-track">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GoalsPage;