import { NavLink } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

const NAV_ITEMS = [
    { label: "Dashboard", to: ROUTES.DASHBOARD },
    { label: "Accounts", to: ROUTES.ACCOUNTS },
    { label: "Budgets", to: ROUTES.BUDGETS },
    { label: "Goals", to: ROUTES.GOALS },
    { label: "Settings", to: ROUTES.SETTINGS },
];

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <>
            <div
                className={`sidebar-overlay ${isOpen ? "open" : ""}`.trim()}
                onClick={onClose}
            />

            <aside className={`app-sidebar ${isOpen ? "open" : ""}`.trim()}>
                <div className="sidebar-brand">SpendWise</div>

                <nav className="sidebar-nav" aria-label="Main navigation">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`.trim()
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;