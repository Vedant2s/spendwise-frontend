import { useCallback, useEffect, useState } from "react";
import CreateGoalForm from "../components/goals/CreateGoalForm";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { formatCurrency } from "../utils/currency";
import { formatDate } from "../utils/date";
import { getGoals } from "../api/goalApi";

const GoalsPage = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchGoals = useCallback(async () => {
        try {
            const data = await getGoals();
            const goalList = Array.isArray(data)
                ? data
                : Array.isArray(data?.goals)
                  ? data.goals
                  : Array.isArray(data?.data)
                    ? data.data
                    : Array.isArray(data?.data?.goals)
                      ? data.data.goals
                      : [];
            setGoals(goalList);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Failed to load your goals."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        queueMicrotask(fetchGoals);
    }, [fetchGoals]);

    const handleGoalCreated = () => {
        fetchGoals();
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

                    <ErrorMessage message={error} onRetry={fetchGoals} />

                    {loading ? (
                        <Loader text="Loading goals..." />
                    ) : goals.length === 0 ? (
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