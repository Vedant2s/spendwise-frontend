import { useId } from "react";

const Input = ({
    label,
    id,
    error,
    className = "",
    ...rest
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
        <div className="form-field">
            {label && (
                <label htmlFor={inputId} className="form-label">
                    {label}
                </label>
            )}

            <input
                id={inputId}
                className={`form-input ${error ? "has-error" : ""} ${className}`.trim()}
                {...rest}
            />

            {error && <span className="form-error">{error}</span>}
        </div>
    );
};

export default Input;