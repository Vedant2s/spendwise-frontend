import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AppLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="app-shell">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="app-content">
                <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />

                <main className="app-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;