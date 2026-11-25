import { useEffect, useState } from "react";
import { createAccount } from "../../api/accountApi";
import { getAvailableCurrencies } from "../../api/currencyApi";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";

const FALLBACK_CURRENCIES = ["USD", "EUR", "INR", "GBP"];

const normalizeCurrencies = (data) => {
    if (!Array.isArray(data) || data.length === 0) return FALLBACK_CURRENCIES;

    return data.map((item) =>
        typeof item === "string"
            ? item
            : item.code || item.currencyCode || item.currency || item.name
    ).filter(Boolean);
};

const CreateAccountModal = ({ isOpen, onClose, onCreated }) => {
    const [currencies, setCurrencies] = useState(FALLBACK_CURRENCIES);
    const [formData, setFormData] = useState({
        name: "",
        type: "CHECKING",
        currency: "USD",
        balance: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        let active = true;
        const loadCurrencies = async () => {
            try {
                const data = await getAvailableCurrencies();
                if (!active) return;

                const normalized = normalizeCurrencies(data);
                setCurrencies(normalized);
                setFormData((prev) => ({
                    ...prev,
                    currency: normalized.includes(prev.currency)
                        ? prev.currency
                        : normalized[0],
                }));
            } catch {
                // Keep fallback currencies if currency endpoint fails
            }
        };

        loadCurrencies();
        return () => {
            active = false;
        };
    }, [isOpen]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            await createAccount({
                name: formData.name.trim(),
                type: formData.type,
                currency: formData.currency,
                balance: formData.balance === "" ? 0 : Number(formData.balance),
            });

            setFormData({
                name: "",
                type: "CHECKING",
                currency: currencies[0] || "USD",
                balance: "",
            });

            onCreated?.();
            onClose();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Failed to create account."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create Account">
            <form onSubmit={handleSubmit}>
                <ErrorMessage message={error} />

                <Input
                    label="Account Name"
                    name="name"
                    type="text"
                    placeholder="e.g. Main Checking"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <div className="form-field">
                    <label htmlFor="account-type" className="form-label">
                        Account Type
                    </label>
                    <select
                        id="account-type"
                        name="type"
                        className="form-input"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="CHECKING">Checking</option>
                        <option value="SAVINGS">Savings</option>
                        <option value="CASH">Cash</option>
                        <option value="CREDIT_CARD">Credit Card</option>
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="account-currency" className="form-label">
                        Currency
                    </label>
                    <select
                        id="account-currency"
                        name="currency"
                        className="form-input"
                        value={formData.currency}
                        onChange={handleChange}
                    >
                        {currencies.map((code) => (
                            <option key={code} value={code}>
                                {code}
                            </option>
                        ))}
                    </select>
                </div>

                <Input
                    label="Initial Balance"
                    name="balance"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.balance}
                    onChange={handleChange}
                    required
                />

                <div className="modal-actions">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" loading={loading}>
                        Create Account
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateAccountModal;