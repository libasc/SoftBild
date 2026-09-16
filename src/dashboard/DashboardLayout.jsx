"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { createClient } from "../lib/supabase/client";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import "./dashboard.css";

export default function DashboardLayout({
    children,
    pageTitle = "Dashboard",
    pageDescription = "",
    activeSection = "overview",
}) {
    const router = useRouter();
    const pathname = usePathname();

    const supabase = useMemo(() => createClient(), []);

    const [sidebarCollapsed, setSidebarCollapsed] =
        useState(false);

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const [profileOpen, setProfileOpen] =
        useState(false);

    const [openSection, setOpenSection] =
        useState(activeSection);

    const handleLogout = async () => {
        const { error } =
            await supabase.auth.signOut();

        if (error) {
            console.error(
                "Logout error:",
                error
            );
            return;
        }

        router.replace("/dashboard/login");
        router.refresh();
    };

    const handleNavigation = (section) => {
        setSidebarOpen(false);

        if (section === "overview") {
            router.push("/dashboard");
            return;
        }

        if (section === "hire") {
            router.push(
                "/dashboard/hire-dev-inquiry"
            );
            return;
        }

        if (section === "contact") {
            router.push("/dashboard/contact-inquiry");
            return;
        }

        if (section === "blog") {
            setOpenSection(
                openSection === "blog"
                    ? ""
                    : "blog"
            );
            return;
        }

        if (section === "portfolio") {
            setOpenSection(
                openSection === "portfolio"
                    ? ""
                    : "portfolio"
            );
            return;
        }
    };

    return (
        <div
            className={`sb-dashboard ${
                sidebarCollapsed
                    ? "sidebar-collapsed"
                    : ""
            }`}
        >
            {/* =================================================
                MOBILE OVERLAY
            ================================================= */}

            {sidebarOpen && (
                <button
                    className="sb-dashboard-overlay"
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                    aria-label="Close menu"
                />
            )}

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside
                className={`sb-dashboard-sidebar ${
                    sidebarOpen
                        ? "is-open"
                        : ""
                }`}
            >
                <div className="sb-dashboard-brand">
                    <div className="sb-dashboard-brand-mark">
                        S
                    </div>

                    <div className="sb-dashboard-brand-copy">
                        <div className="sb-dashboard-brand-name">
                            Soft<span>Bild</span>
                        </div>

                        <div className="sb-dashboard-brand-label">
                            Administration
                        </div>
                    </div>

                    <button
                        className="sb-dashboard-sidebar-close"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        aria-label="Close sidebar"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className="sb-dashboard-menu-heading">
                    MAIN MENU
                </div>

                <nav className="sb-dashboard-nav">

                    {/* DASHBOARD */}

                    <button
                        className={`sb-dashboard-nav-item ${
                            activeSection ===
                            "overview"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleNavigation(
                                "overview"
                            )
                        }
                        title="Dashboard"
                    >
                        <span className="sb-dashboard-nav-icon">
                            <DashboardOutlinedIcon />
                        </span>

                        <span className="sb-dashboard-nav-text">
                            Dashboard
                        </span>
                    </button>

                    {/* HIRE DEV */}

                    <button
                        className={`sb-dashboard-nav-item ${
                            activeSection ===
                            "hire"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleNavigation(
                                "hire"
                            )
                        }
                        title="Hire-Dev Inquiry"
                    >
                        <span className="sb-dashboard-nav-icon">
                            <WorkOutlineIcon />
                        </span>

                        <span className="sb-dashboard-nav-text">
                            Hire-Dev Inquiry
                        </span>
                    </button>

                    {/* CONTACT */}

                    <button
                        className={`sb-dashboard-nav-item ${
                            activeSection ===
                            "contact"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleNavigation(
                                "contact"
                            )
                        }
                        title="Contact Inquiry"
                    >
                        <span className="sb-dashboard-nav-icon">
                            <MailOutlineIcon />
                        </span>

                        <span className="sb-dashboard-nav-text">
                            Contact Inquiry
                        </span>
                    </button>

                    {/* BLOG */}

                    <div className="sb-dashboard-nav-group">
                        <button
                            className={`sb-dashboard-nav-item sb-dashboard-nav-parent ${
                                openSection ===
                                "blog"
                                    ? "expanded"
                                    : ""
                            }`}
                            onClick={() =>
                                handleNavigation(
                                    "blog"
                                )
                            }
                            title="Blog"
                        >
                            <span className="sb-dashboard-nav-icon">
                                <ArticleOutlinedIcon />
                            </span>

                            <span className="sb-dashboard-nav-text">
                                Blog
                            </span>

                            <KeyboardArrowDownIcon className="sb-dashboard-nav-arrow" />
                        </button>

                        {openSection ===
                            "blog" && !sidebarCollapsed && (
                            <div className="sb-dashboard-submenu">
                                <button
                                    onClick={() =>
                                        router.push("/dashboard/blog")
                                    }
                                >
                                    All Blogs
                                </button>

                                <button
                                    onClick={() =>
                                        router.push("/dashboard/add-blog")
                                    }
                                >
                                    Add Blog
                                </button>

                                <button
                                    onClick={() =>
                                        router.push(
                                            "/dashboard/blog/categories"
                                        )
                                    }
                                >
                                    Categories
                                </button>

                                <button
                                    onClick={() =>
                                        router.push(
                                            "/dashboard/blog/features"
                                        )
                                    }
                                >
                                    Required Features
                                </button>
                            </div>
                        )}
                    </div>

                    {/* PORTFOLIO */}

                    <div className="sb-dashboard-nav-group">
                        <button
                            className={`sb-dashboard-nav-item sb-dashboard-nav-parent ${
                                openSection ===
                                "portfolio"
                                    ? "expanded"
                                    : ""
                            }`}
                            onClick={() =>
                                handleNavigation(
                                    "portfolio"
                                )
                            }
                            title="Portfolio"
                        >
                            <span className="sb-dashboard-nav-icon">
                                <GridViewOutlinedIcon />
                            </span>

                            <span className="sb-dashboard-nav-text">
                                Portfolio
                            </span>

                            <KeyboardArrowDownIcon className="sb-dashboard-nav-arrow" />
                        </button>

                        {openSection ===
                            "portfolio" && !sidebarCollapsed && (
                            <div className="sb-dashboard-submenu">
                                <button>
                                    All Portfolio
                                </button>

                                <button>
                                    Add Portfolio
                                </button>

                                <button>
                                    Categories
                                </button>

                                <button>
                                    Required Features
                                </button>
                            </div>
                        )}
                    </div>

                    {/* USERS */}

                    <button
                        className="sb-dashboard-nav-item"
                        title="Users"
                    >
                        <span className="sb-dashboard-nav-icon">
                            <PeopleOutlineIcon />
                        </span>

                        <span className="sb-dashboard-nav-text">
                            Users
                        </span>
                    </button>
                </nav>

                <div className="sb-dashboard-sidebar-bottom">
                    <div className="sb-dashboard-sidebar-help">
                        <span className="sb-dashboard-help-dot" />

                        <div>
                            <strong>
                                System Online
                            </strong>

                            <small>
                                All services operational
                            </small>
                        </div>
                    </div>

                    <button
                        className="sb-dashboard-logout"
                        onClick={() =>
                            setProfileOpen(
                                false
                            )
                        }
                    >
                        <LogoutOutlinedIcon />

                        <span className="sb-dashboard-nav-text">
                            Account
                        </span>
                    </button>
                </div>

                {/* COLLAPSE */}

                <button
                    className="sb-dashboard-collapse-button"
                    onClick={() =>
                        setSidebarCollapsed(
                            (value) =>
                                !value
                        )
                    }
                    title={
                        sidebarCollapsed
                            ? "Expand sidebar"
                            : "Collapse sidebar"
                    }
                >
                    {sidebarCollapsed ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon />
                    )}
                </button>
            </aside>

            {/* =================================================
                MAIN
            ================================================= */}

            <main className="sb-dashboard-main">

                {/* HEADER */}

                <header className="sb-dashboard-header">

                    <button
                        className="sb-dashboard-mobile-menu"
                        onClick={() =>
                            setSidebarOpen(
                                true
                            )
                        }
                    >
                        <MenuIcon />
                    </button>

                    <div className="sb-dashboard-header-title">

                        <div className="sb-dashboard-breadcrumb">
                            Dashboard

                            <span>/</span>

                            {pageTitle}
                        </div>

                        <h1>
                            {pageTitle}
                        </h1>

                        <p>
                            {pageDescription}
                        </p>
                    </div>

                    {/* PROFILE */}

                    <div className="sb-dashboard-profile">

                        <button
                            className="sb-dashboard-profile-button"
                            onClick={() =>
                                setProfileOpen(
                                    (value) =>
                                        !value
                                )
                            }
                        >
                            <div className="sb-dashboard-user-avatar">
                                SA
                            </div>

                            <div className="sb-dashboard-user-info">
                                <strong>
                                    SoftBild Admin
                                </strong>

                                <span>
                                    Administrator
                                </span>
                            </div>

                            <KeyboardArrowDownIcon
                                className={
                                    profileOpen
                                        ? "profile-open"
                                        : ""
                                }
                            />
                        </button>

                        {profileOpen && (
                            <>
                                <button
                                    className="sb-dashboard-profile-backdrop"
                                    onClick={() =>
                                        setProfileOpen(
                                            false
                                        )
                                    }
                                />

                                <div className="sb-dashboard-profile-menu">

                                    <div className="sb-dashboard-profile-menu-head">

                                        <div className="sb-dashboard-user-avatar">
                                            SA
                                        </div>

                                        <div>
                                            <strong>
                                                SoftBild
                                                Admin
                                            </strong>

                                            <span>
                                                Administrator
                                            </span>
                                        </div>

                                    </div>

                                    <div className="sb-dashboard-profile-divider" />

                                    <button>
                                        <PersonOutlineIcon />
                                        Profile
                                    </button>

                                    <button>
                                        <SettingsOutlinedIcon />
                                        Settings
                                    </button>

                                    <div className="sb-dashboard-profile-divider" />

                                    <button
                                        className="logout"
                                        onClick={
                                            handleLogout
                                        }
                                    >
                                        <LogoutOutlinedIcon />
                                        Logout
                                    </button>

                                </div>
                            </>
                        )}
                    </div>
                </header>

                {/* PAGE CONTENT */}

                {children}

            </main>
        </div>
    );
}