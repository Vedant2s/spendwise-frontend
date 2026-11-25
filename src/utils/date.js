export const formatDate = (dateInput) => {
    if (!dateInput) return "—";

    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return "—";

    return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date);
};

export const formatShortDate = (dateInput) => {
    if (!dateInput) return "—";

    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return "—";

    return new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
    }).format(date);
};