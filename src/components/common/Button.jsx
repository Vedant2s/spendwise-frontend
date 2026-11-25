const Button = ({
    children,
    type = "button",
    variant = "primary",
    loading = false,
    disabled = false,
    className = "",
    ...rest
}) => {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`btn btn-${variant} ${className}`.trim()}
            {...rest}
        >
            {loading ? "Please wait..." : children}
        </button>
    );
};

export default Button;