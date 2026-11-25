import { useEffect, useState } from "react";
import { getAvailableCurrencies } from "../api/currencyApi";
import { setCurrencyPreference } from "../api/userApi";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

const FALLBACK_CURRENCIES = ["USD", "EUR", "INR", "GBP"];

const normalizeCurrencies = (data) => {
    if (!Array.isArray(data) || data.length === 0) return FALLBACK_CURRENCIES;

    return data
        .map((item) =>
            typeof item === "string"
                ? item
                : item.code || item.currencyCode || item.currency || item.name
        )
        .filter(Boolean);
};

const SettingsPage = () => {
    const [currencies, setCurrencies] = useState(FALLBACK_CURRENCIES);
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [loadingCurrencies, setLoadingCurrencies] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        let active = true;

        const fetchCurrencies = async () => {
            setLoadingCurrencies(true);
            try {
                const data = await getAvailableCurrencies();
                if (!active) return;

                const normalized = normalizeCurrencies(data);
                setCurrencies(normalized);
                setSelectedCurrency((prev) =>
                    normalized.includes(prev) ? prev : normalized[0]
                );
            } catch {
                // Keep fallback list if endpoint is unavailable
            } finally {
                if (active) setLoadingCurrencies(false);
            }
        };

        fetchCurrencies();
        return () => {
            active = false;
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            await setCurrencyPreference({
                currency: selectedCurrency,
            });
            setSuccess(`Preferred currency updated to ${selectedCurrency}.`);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Failed to update preferences."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="page-header">
                <p className="page-subtitle">
                    Configure your default SpendWise currency and account preferences
                </p>
            </div>

            <div className="card settings-card">
                <div className="card-title">Currency Preference</div>

                {loadingCurrencies ? (
                    <Loader text="Loading currencies..." />
                ) : (
                    <form onSubmit={handleSubmit}>
                        <ErrorMessage message={error} />

                        {success && (
                            <div className="success-banner" role="status">
                                {success}
                            </div>
                        )}

                        <div className="form-field">
                            <label htmlFor="preferred-currency" className="form-label">
                                Default Currency
                            </label>
                            <select
                                id="preferred-currency"
                                className="form-input"
                                value={selectedCurrency}
                                onChange={(e) => {
                                    setSelectedCurrency(e.target.value);
                                    setSuccess("");
                                }}
                            >
                                {currencies.map((code) => (
                                    <option key={code} value={code}>
                                        {code}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button type="submit" loading={saving}>
                            Save Preference
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SettingsPage;