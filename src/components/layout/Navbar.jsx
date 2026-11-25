import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from "../common/Button";
import { ROUTES } from "../../utils/constants";

const getPageTitle = (pathname) => {
    if (pathname.startsWith(ROUTES.DASHBOARD)) return "Dashboard";
    if (pathname.startsWith(ROUTES.ACCOUNTS)) return "Accounts";
    if (pathname.startsWith(ROUTES.BUDGETS)) return "Budgets";
    if (pathname.startsWith(ROUTES.GOALS)) return "Goals";
    if (pathname.startsWith(ROUTES.SETTINGS)) return "Settings";
    return "SpendWise";
};

const Navbar = ({ onMenuClick }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate(ROUTES.LOGIN, { replace: true });
    };

    return (
        <header className="app-navbar">
            <div className="navbar-left">
                <button
                    type="button"
                    className="navbar-menu-btn"
                    onClick={onMenuClick}
                    aria-label="Toggle navigation menu"
                >
                    &#9776;
                </button>
                <h1 className="navbar-title">{getPageTitle(pathname)}</h1>
            </div>

            <Button variant="secondary" onClick={handleLogout}>
                Logout
            </Button>
        </header>
    );
};

export default Navbar;