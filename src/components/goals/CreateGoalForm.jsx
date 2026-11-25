import { useState } from "react";
import { createGoal } from "../../api/goalApi";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";

const CreateGoalForm = ({ onCreated }) => {
    const [formData, setFormData] = useState({
        name: "",
        targetAmount: "",
        currentAmount: "",
        desired_date: "",
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
            targetAmount: Number(formData.targetAmount),
            currentAmount:
                formData.currentAmount === "" ? 0 : Number(formData.currentAmount),
            desired_date: formData.desired_date || null,
        };

        try {
            const response = await createGoal(payload);
            setSuccess("Goal created successfully.");
            onCreated?.(response && typeof response === "object" ? response : payload);

            setFormData({
                name: "",
                targetAmount: "",
                currentAmount: "",
                desired_date: "",
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Failed to create goal."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="card-title">Create Savings Goal</div>

            <form onSubmit={handleSubmit}>
                <ErrorMessage message={error} />

                {success && (
                    <div className="success-banner" role="status">
                        {success}
                    </div>
                )}

                <Input
                    label="Goal Name"
                    name="name"
                    type="text"
                    placeholder="e.g. Emergency Fund"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Target Amount"
                    name="targetAmount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    value={formData.targetAmount}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Current Saved Amount"
                    name="currentAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.currentAmount}
                    onChange={handleChange}
                />

                <Input
                    label="Desired Date"
                    name="desired_date"
                    type="date"
                    value={formData.desired_date}
                    onChange={handleChange}
                />

                <Button type="submit" loading={loading}>
                    Create Goal
                </Button>
            </form>
        </div>
    );
};

export default CreateGoalForm;