import { useState } from "react";
import { createBudget } from "../../api/budgetApi";
import { DEFAULT_PERIOD, PERIOD_OPTIONS } from "../../utils/constants";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";

const CreateBudgetForm = ({ onCreated }) => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        amount: "",
        period: DEFAULT_PERIOD,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setSuccess("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const payload = {
            name: formData.name.trim(),
            category: formData.category.trim(),
            amount: Number(formData.amount),
            period: formData.period,
        };

        try {
            const response = await createBudget(payload);
            setSuccess("Budget created successfully.");
            onCreated?.(response && typeof response === "object" ? response : payload);

            setFormData({
                name: "",
                category: "",
                amount: "",
                period: DEFAULT_PERIOD,
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Failed to create budget."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="card-title">Create Budget</div>

            <form onSubmit={handleSubmit}>
                <ErrorMessage message={error} />

                {success && (
                    <div className="success-banner" role="status">
                        {success}
                    </div>
                )}

                <Input
                    label="Budget Name"
                    name="name"
                    type="text"
                    placeholder="e.g. Monthly Groceries"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Category"
                    name="category"
                    type="text"
                    placeholder="e.g. FOOD"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Budget Limit"
                    name="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />

                <div className="form-field">
                    <label htmlFor="budget-period" className="form-label">
                        Period
                    </label>
                    <select
                        id="budget-period"
                        name="period"
                        className="form-input"
                        value={formData.period}
                        onChange={handleChange}
                    >
                        {PERIOD_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label} ({opt.value})
                            </option>
                        ))}
                    </select>
                </div>

                <Button type="submit" loading={loading}>
                    Create Budget
                </Button>
            </form>
        </div>
    );
};

export default CreateBudgetForm;