export const formatCurrency = (amount, currency = "USD") => {
    const numericAmount = Number(amount);

    if (amount === null || amount === undefined || Number.isNaN(numericAmount)) {
        return "—";
    }

    try {
        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: currency || "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(numericAmount);
    } catch {
        // Fallback if backend passes an unfamiliar currency code
        return `${numericAmount.toFixed(2)} ${currency}`;
    }
};