import Button from "./Button";

const ErrorMessage = ({ message, onRetry }) => {
    if (!message) return null;

    return (
        <div className="error-banner" role="alert">
            <span>{message}</span>
            {onRetry && (
                <Button variant="secondary" onClick={onRetry}>
                    Retry
                </Button>
            )}
        </div>
    );
};

export default ErrorMessage;