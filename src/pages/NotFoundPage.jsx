import { Link } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <div className="card not-found-card">
                <div className="not-found-code">404</div>
                <h2>Page not found</h2>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "1.25rem" }}>
                    The page you are looking for does not exist or was moved.
                </p>
                <Link to={ROUTES.DASHBOARD} className="btn btn-primary">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;