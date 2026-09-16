"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

import "./dashboard.css";

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
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const STATUS_OPTIONS = [
    "new",
    "in_progress",
    "contacted",
    "converted",
    "closed",
];

const ITEMS_PER_PAGE = 10;

function formatStatus(status) {
    if (!status) return "New";

    return status
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(date) {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

function searchableValue(value) {
    return String(value ?? "").toLowerCase();
}

export default function Index() {
    const router = useRouter();

    const supabase = useMemo(() => createClient(), []);

    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const [updatingId, setUpdatingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const [openSection, setOpenSection] = useState("contact");

    /*
     * =========================================================
     * LOAD INQUIRIES
     * =========================================================
     */

    const loadInquiries = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("contact_inquiries")
            .select("*")
            .order("created_at", {
                ascending: false,
            });

        if (error) {
            console.error(
                "Failed to load contact inquiries:",
                error
            );

            setInquiries([]);
        } else {
            setInquiries(data || []);
        }

        setLoading(false);
    };

    useEffect(() => {
        loadInquiries();
    }, []);

    /*
     * =========================================================
     * SEARCH + FILTER
     * =========================================================
     */

    const filteredInquiries = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        return inquiries.filter((inquiry) => {
            if (statusFilter !== "all") {
                if (inquiry.status !== statusFilter) {
                    return false;
                }
            }

            if (!search) {
                return true;
            }

            const searchableText = [
                inquiry.name,
                inquiry.email,
                inquiry.phone,
                inquiry.company,
                inquiry.message,
                inquiry.timezone,
                inquiry.status,
            ]
                .map(searchableValue)
                .join(" ");

            return searchableText.includes(search);
        });
    }, [inquiries, searchTerm, statusFilter]);

    /*
     * =========================================================
     * PAGINATION
     * =========================================================
     */

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredInquiries.length / ITEMS_PER_PAGE
        )
    );

    const paginatedInquiries =
        filteredInquiries.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    /*
     * =========================================================
     * COUNTS
     * =========================================================
     */

    const totalCount = inquiries.length;

    const newCount = inquiries.filter(
        (item) => item.status === "new"
    ).length;

    const inProgressCount = inquiries.filter(
        (item) => item.status === "in_progress"
    ).length;

    const contactedCount = inquiries.filter(
        (item) => item.status === "contacted"
    ).length;

    const convertedCount = inquiries.filter(
        (item) => item.status === "converted"
    ).length;

    const closedCount = inquiries.filter(
        (item) => item.status === "closed"
    ).length;

    const consultationCount = inquiries.filter(
        (item) => item.consultation === true
    ).length;

    /*
     * =========================================================
     * UPDATE STATUS
     * =========================================================
     */

    const updateStatus = async (id, status) => {
        setUpdatingId(id);

        const { error } = await supabase
            .from("contact_inquiries")
            .update({ status })
            .eq("id", id);

        if (error) {
            console.error(
                "Failed to update inquiry:",
                error
            );

            alert("Unable to update the inquiry status.");

            setUpdatingId(null);
            return;
        }

        const updatedAt =
            new Date().toISOString();

        setInquiries((current) =>
            current.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          status,
                          updated_at: updatedAt,
                      }
                    : item
            )
        );

        if (
            selectedInquiry &&
            selectedInquiry.id === id
        ) {
            setSelectedInquiry((current) => ({
                ...current,
                status,
                updated_at: updatedAt,
            }));
        }

        setUpdatingId(null);
    };

    /*
     * =========================================================
     * DELETE
     * =========================================================
     */

    const confirmDelete = async () => {
        if (!deleteTarget) return;

        const id = deleteTarget.id;

        setDeletingId(id);

        const { error } = await supabase
            .from("contact_inquiries")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(
                "Failed to delete inquiry:",
                error
            );

            alert("Unable to delete this inquiry.");

            setDeletingId(null);
            return;
        }

        setInquiries((current) =>
            current.filter(
                (item) => item.id !== id
            )
        );

        if (
            selectedInquiry &&
            selectedInquiry.id === id
        ) {
            setSelectedInquiry(null);
        }

        setDeleteTarget(null);
        setDeletingId(null);
    };

    /*
     * =========================================================
     * LOGOUT
     * =========================================================
     */

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

    /*
     * =========================================================
     * NAVIGATION
     * =========================================================
     */

    const handleNavigation = (section) => {
        if (section === "overview") {
            router.push("/dashboard");
            return;
        }

        if (section === "hire") {
            setOpenSection("hire");
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

    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter("all");
        setCurrentPage(1);
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
                    <button
                        className="sb-dashboard-nav-item"
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

                    <button
                      className="sb-dashboard-nav-item"
                      onClick={() =>
                          router.push("/dashboard/hire-dev-inquiry")
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

                    <button
                        className={`sb-dashboard-nav-item ${
                            openSection ===
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

                        {newCount > 0 && (
                            <span className="sb-dashboard-nav-count">
                                {newCount}
                            </span>
                        )}
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
                            "blog" && (
                            <div className="sb-dashboard-submenu">
                                <button>
                                    All Blogs
                                </button>
                                <button>
                                    Add Blog
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
                            "portfolio" && (
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

                {/* COLLAPSE BUTTON */}

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
                            Contact Inquiry
                        </div>

                        <h1>
                            Contact Inquiry
                        </h1>

                        <p>
                            Manage and respond to
                            inquiries submitted
                            through your SoftBild
                            website.
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

                {/* CONTENT */}

                <section className="sb-dashboard-content">
                    {/* STATS */}

                    <div className="sb-dashboard-stats">
                        <div className="sb-dashboard-stat-card">
                            <div className="sb-dashboard-stat-icon blue">
                                <MailOutlineIcon />
                            </div>

                            <div>
                                <span>
                                    Total Inquiries
                                </span>
                                <strong>
                                    {totalCount}
                                </strong>
                                <small>
                                    All submissions
                                </small>
                            </div>
                        </div>

                        <div className="sb-dashboard-stat-card">
                            <div className="sb-dashboard-stat-icon orange">
                                !
                            </div>

                            <div>
                                <span>
                                    New
                                </span>
                                <strong>
                                    {newCount}
                                </strong>
                                <small>
                                    Need attention
                                </small>
                            </div>
                        </div>

                        <div className="sb-dashboard-stat-card">
                            <div className="sb-dashboard-stat-icon purple">
                                <TrendingUpIcon />
                            </div>

                            <div>
                                <span>
                                    In Progress
                                </span>
                                <strong>
                                    {inProgressCount}
                                </strong>
                                <small>
                                    Being handled
                                </small>
                            </div>
                        </div>

                        <div className="sb-dashboard-stat-card">
                            <div className="sb-dashboard-stat-icon green">
                                ✓
                            </div>

                            <div>
                                <span>
                                    Converted
                                </span>
                                <strong>
                                    {convertedCount}
                                </strong>
                                <small>
                                    Successful leads
                                </small>
                            </div>
                        </div>
                    </div>

                    {/* PIPELINE */}

                    <div className="sb-dashboard-overview-strip">
                        <div className="sb-dashboard-overview-title">
                            <div>
                                <span>
                                    INQUIRY PIPELINE
                                </span>

                                <strong>
                                    Lead status overview
                                </strong>
                            </div>
                        </div>

                        <div className="sb-dashboard-pipeline">
                            <div>
                                <span className="pipeline-dot new" />
                                <strong>
                                    {newCount}
                                </strong>
                                <small>
                                    New
                                </small>
                            </div>

                            <div>
                                <span className="pipeline-dot progress" />
                                <strong>
                                    {
                                        inProgressCount
                                    }
                                </strong>
                                <small>
                                    In Progress
                                </small>
                            </div>

                            <div>
                                <span className="pipeline-dot contacted" />
                                <strong>
                                    {
                                        contactedCount
                                    }
                                </strong>
                                <small>
                                    Contacted
                                </small>
                            </div>

                            <div>
                                <span className="pipeline-dot converted" />
                                <strong>
                                    {
                                        convertedCount
                                    }
                                </strong>
                                <small>
                                    Converted
                                </small>
                            </div>

                            <div>
                                <span className="pipeline-dot closed" />
                                <strong>
                                    {closedCount}
                                </strong>
                                <small>
                                    Closed
                                </small>
                            </div>

                            <div className="pipeline-consultation">
                                <MailOutlineIcon />

                                <div>
                                    <strong>
                                        {
                                            consultationCount
                                        }
                                    </strong>

                                    <small>
                                        Consultation
                                        requests
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TABLE PANEL */}

                    <div className="sb-dashboard-panel">
                        <div className="sb-dashboard-panel-header">
                            <div>
                                <div className="sb-dashboard-section-kicker">
                                    LEADS
                                </div>

                                <h2>
                                    Contact Inquiries
                                </h2>

                                <p>
                                    {filteredInquiries.length}{" "}
                                    {filteredInquiries.length ===
                                    1
                                        ? "inquiry"
                                        : "inquiries"}{" "}
                                    found
                                </p>
                            </div>

                            <button
                                className="sb-dashboard-refresh"
                                onClick={
                                    loadInquiries
                                }
                                disabled={
                                    loading
                                }
                            >
                                <RefreshIcon />
                                <span>
                                    Refresh
                                </span>
                            </button>
                        </div>

                        {/* FILTERS */}

                        <div className="sb-dashboard-filters">
                            <div className="sb-dashboard-search">
                                <SearchIcon />

                                <input
                                    type="search"
                                    value={
                                        searchTerm
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setSearchTerm(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Search name, email, phone, company or message..."
                                />

                                {searchTerm && (
                                    <button
                                        type="button"
                                        className="sb-dashboard-search-clear"
                                        onClick={() =>
                                            setSearchTerm(
                                                ""
                                            )
                                        }
                                    >
                                        <CloseIcon />
                                    </button>
                                )}
                            </div>

                            <select
                                className="sb-dashboard-status-filter"
                                value={
                                    statusFilter
                                }
                                onChange={(event) =>
                                    setStatusFilter(
                                        event
                                            .target
                                            .value
                                    )
                                }
                            >
                                <option value="all">
                                    All Statuses
                                </option>

                                {STATUS_OPTIONS.map(
                                    (status) => (
                                        <option
                                            key={
                                                status
                                            }
                                            value={
                                                status
                                            }
                                        >
                                            {formatStatus(
                                                status
                                            )}
                                        </option>
                                    )
                                )}
                            </select>

                            {(searchTerm ||
                                statusFilter !==
                                    "all") && (
                                <button
                                    className="sb-dashboard-clear"
                                    onClick={
                                        clearFilters
                                    }
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>

                        {/* TABLE */}

                        <div className="sb-dashboard-table-wrapper">
                            {loading ? (
                                <div className="sb-dashboard-loading">
                                    <div className="sb-dashboard-spinner" />
                                    <p>
                                        Loading
                                        inquiries...
                                    </p>
                                </div>
                            ) : paginatedInquiries.length ===
                              0 ? (
                                <div className="sb-dashboard-empty">
                                    <div className="sb-dashboard-empty-icon">
                                        <MailOutlineIcon />
                                    </div>

                                    <h3>
                                        No inquiries
                                        found
                                    </h3>

                                    <p>
                                        {searchTerm ||
                                        statusFilter !==
                                            "all"
                                            ? "Try changing your search or filter."
                                            : "New contact inquiries will appear here."}
                                    </p>

                                    {(searchTerm ||
                                        statusFilter !==
                                            "all") && (
                                        <button
                                            onClick={
                                                clearFilters
                                            }
                                            className="sb-dashboard-empty-button"
                                        >
                                            Clear
                                            Filters
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <table className="sb-dashboard-table">
                                    <thead>
                                        <tr>
                                            <th>
                                                CONTACT
                                            </th>
                                            <th>
                                                COMPANY
                                            </th>
                                            <th>
                                                MESSAGE
                                            </th>
                                            <th>
                                                CONSULTATION
                                            </th>
                                            <th>
                                                STATUS
                                            </th>
                                            <th>
                                                SUBMITTED
                                            </th>
                                            <th />
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {paginatedInquiries.map(
                                            (
                                                inquiry
                                            ) => (
                                                <tr
                                                    key={
                                                        inquiry.id
                                                    }
                                                >
                                                    <td>
                                                        <div className="sb-dashboard-contact-cell">
                                                            <div className="sb-dashboard-contact-avatar">
                                                                {(
                                                                    inquiry.name ||
                                                                    "U"
                                                                )
                                                                    .charAt(
                                                                        0
                                                                    )
                                                                    .toUpperCase()}
                                                            </div>

                                                            <div>
                                                                <strong>
                                                                    {inquiry.name ||
                                                                        "Not provided"}
                                                                </strong>

                                                                <span>
                                                                    {inquiry.email ||
                                                                        "No email"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <span className="sb-dashboard-company">
                                                            {inquiry.company ||
                                                                "—"}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <div className="sb-dashboard-message-preview">
                                                            {inquiry.message ||
                                                                "No message provided"}
                                                        </div>
                                                    </td>

                                                    <td>
                                                        {inquiry.consultation ? (
                                                            <div className="sb-dashboard-consultation yes">
                                                                <span>
                                                                    ✓
                                                                </span>

                                                                <div>
                                                                    <strong>
                                                                        Requested
                                                                    </strong>

                                                                    {inquiry.consultation_datetime && (
                                                                        <small>
                                                                            {formatDate(
                                                                                inquiry.consultation_datetime
                                                                            )}
                                                                        </small>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <span className="sb-dashboard-not-requested">
                                                                Not
                                                                requested
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td>
                                                        <select
                                                            className={`sb-dashboard-status-select status-${inquiry.status}`}
                                                            value={
                                                                inquiry.status ||
                                                                "new"
                                                            }
                                                            disabled={
                                                                updatingId ===
                                                                inquiry.id
                                                            }
                                                            onChange={(
                                                                event
                                                            ) =>
                                                                updateStatus(
                                                                    inquiry.id,
                                                                    event
                                                                        .target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            {STATUS_OPTIONS.map(
                                                                (
                                                                    status
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            status
                                                                        }
                                                                        value={
                                                                            status
                                                                        }
                                                                    >
                                                                        {formatStatus(
                                                                            status
                                                                        )}
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </td>

                                                    <td>
                                                        <span className="sb-dashboard-date">
                                                            {formatDate(
                                                                inquiry.created_at
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <div className="sb-dashboard-actions">
                                                            <button
                                                                className="sb-dashboard-action view"
                                                                title="View inquiry"
                                                                onClick={() =>
                                                                    setSelectedInquiry(
                                                                        inquiry
                                                                    )
                                                                }
                                                            >
                                                                <VisibilityOutlinedIcon />
                                                            </button>

                                                            <button
                                                                className="sb-dashboard-action delete"
                                                                title="Delete inquiry"
                                                                disabled={
                                                                    deletingId ===
                                                                    inquiry.id
                                                                }
                                                                onClick={() =>
                                                                    setDeleteTarget(
                                                                        inquiry
                                                                    )
                                                                }
                                                            >
                                                                <DeleteOutlineIcon />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* PAGINATION */}

                        {!loading &&
                            filteredInquiries.length >
                                0 && (
                                <div className="sb-dashboard-pagination">
                                    <span>
                                        Showing{" "}
                                        <strong>
                                            {(currentPage -
                                                1) *
                                                ITEMS_PER_PAGE +
                                                1}
                                        </strong>{" "}
                                        to{" "}
                                        <strong>
                                            {Math.min(
                                                currentPage *
                                                    ITEMS_PER_PAGE,
                                                filteredInquiries.length
                                            )}
                                        </strong>{" "}
                                        of{" "}
                                        <strong>
                                            {
                                                filteredInquiries.length
                                            }
                                        </strong>
                                    </span>

                                    <div className="sb-dashboard-page-buttons">
                                        <button
                                            disabled={
                                                currentPage ===
                                                1
                                            }
                                            onClick={() =>
                                                setCurrentPage(
                                                    (
                                                        page
                                                    ) =>
                                                        page -
                                                        1
                                                )
                                            }
                                        >
                                            ←
                                        </button>

                                        {Array.from(
                                            {
                                                length: totalPages,
                                            },
                                            (
                                                _,
                                                index
                                            ) =>
                                                index +
                                                1
                                        )
                                            .slice(
                                                Math.max(
                                                    0,
                                                    currentPage -
                                                        3
                                                ),
                                                Math.min(
                                                    totalPages,
                                                    currentPage +
                                                        2
                                                )
                                            )
                                            .map(
                                                (
                                                    page
                                                ) => (
                                                    <button
                                                        key={
                                                            page
                                                        }
                                                        className={
                                                            page ===
                                                            currentPage
                                                                ? "active"
                                                                : ""
                                                        }
                                                        onClick={() =>
                                                            setCurrentPage(
                                                                page
                                                            )
                                                        }
                                                    >
                                                        {
                                                            page
                                                        }
                                                    </button>
                                                )
                                            )}

                                        <button
                                            disabled={
                                                currentPage ===
                                                totalPages
                                            }
                                            onClick={() =>
                                                setCurrentPage(
                                                    (
                                                        page
                                                    ) =>
                                                        page +
                                                        1
                                                )
                                            }
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                            )}
                    </div>
                </section>
            </main>

            {/* =================================================
                VIEW MODAL
            ================================================= */}

            {selectedInquiry && (
                <div
                    className="sb-dashboard-modal-overlay"
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            setSelectedInquiry(
                                null
                            );
                        }
                    }}
                >
                    <div className="sb-dashboard-modal">
                        <div className="sb-dashboard-modal-header">
                            <div>
                                <span className="sb-dashboard-modal-label">
                                    CONTACT INQUIRY
                                </span>

                                <h2>
                                    {selectedInquiry.name ||
                                        "Contact Inquiry"}
                                </h2>
                            </div>

                            <button
                                className="sb-dashboard-modal-close"
                                onClick={() =>
                                    setSelectedInquiry(
                                        null
                                    )
                                }
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        <div className="sb-dashboard-modal-body">
                            <div className="sb-dashboard-detail-grid">
                                <div className="sb-dashboard-detail">
                                    <span>
                                        Name
                                    </span>

                                    <strong>
                                        {selectedInquiry.name ||
                                            "Not provided"}
                                    </strong>
                                </div>

                                <div className="sb-dashboard-detail">
                                    <span>
                                        Email
                                    </span>

                                    <a
                                        href={`mailto:${selectedInquiry.email}`}
                                    >
                                        {selectedInquiry.email ||
                                            "Not provided"}
                                    </a>
                                </div>

                                <div className="sb-dashboard-detail">
                                    <span>
                                        Phone
                                    </span>

                                    {selectedInquiry.phone ? (
                                        <a
                                            href={`tel:${selectedInquiry.phone}`}
                                        >
                                            {
                                                selectedInquiry.phone
                                            }
                                        </a>
                                    ) : (
                                        <strong>
                                            Not provided
                                        </strong>
                                    )}
                                </div>

                                <div className="sb-dashboard-detail">
                                    <span>
                                        Company
                                    </span>

                                    <strong>
                                        {selectedInquiry.company ||
                                            "Not provided"}
                                    </strong>
                                </div>

                                <div className="sb-dashboard-detail">
                                    <span>
                                        Consultation
                                    </span>

                                    <strong>
                                        {selectedInquiry.consultation
                                            ? "Requested"
                                            : "Not requested"}
                                    </strong>
                                </div>

                                <div className="sb-dashboard-detail">
                                    <span>
                                        Consultation Date
                                    </span>

                                    <strong>
                                        {selectedInquiry.consultation_datetime
                                            ? formatDate(
                                                  selectedInquiry.consultation_datetime
                                              )
                                            : "Not scheduled"}
                                    </strong>
                                </div>

                                <div className="sb-dashboard-detail">
                                    <span>
                                        Timezone
                                    </span>

                                    <strong>
                                        {selectedInquiry.timezone ||
                                            "Not provided"}
                                    </strong>
                                </div>

                                <div className="sb-dashboard-detail">
                                    <span>
                                        Email Status
                                    </span>

                                    <strong
                                        className={
                                            selectedInquiry.email_sent
                                                ? "email-success"
                                                : "email-pending"
                                        }
                                    >
                                        {selectedInquiry.email_sent
                                            ? "Sent"
                                            : "Not sent"}
                                    </strong>
                                </div>

                                <div className="sb-dashboard-detail">
                                    <span>
                                        Submitted
                                    </span>

                                    <strong>
                                        {formatDate(
                                            selectedInquiry.created_at
                                        )}
                                    </strong>
                                </div>

                                <div className="sb-dashboard-detail">
                                    <span>
                                        Status
                                    </span>

                                    <select
                                        className={`sb-dashboard-status-select status-${selectedInquiry.status}`}
                                        value={
                                            selectedInquiry.status ||
                                            "new"
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            updateStatus(
                                                selectedInquiry.id,
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                    >
                                        {STATUS_OPTIONS.map(
                                            (
                                                status
                                            ) => (
                                                <option
                                                    key={
                                                        status
                                                    }
                                                    value={
                                                        status
                                                    }
                                                >
                                                    {formatStatus(
                                                        status
                                                    )}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="sb-dashboard-detail-message">
                                <span>
                                    Message
                                </span>

                                <div>
                                    {selectedInquiry.message ||
                                        "No message provided."}
                                </div>
                            </div>

                            {selectedInquiry.email_error && (
                                <div className="sb-dashboard-email-error">
                                    <strong>
                                        Email delivery
                                        error
                                    </strong>

                                    <p>
                                        {
                                            selectedInquiry.email_error
                                        }
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="sb-dashboard-modal-footer">
                            <button
                                className="sb-dashboard-modal-delete"
                                onClick={() => {
                                    setSelectedInquiry(
                                        null
                                    );
                                    setDeleteTarget(
                                        selectedInquiry
                                    );
                                }}
                            >
                                <DeleteOutlineIcon />
                                Delete Inquiry
                            </button>

                            <button
                                className="sb-dashboard-modal-secondary"
                                onClick={() =>
                                    setSelectedInquiry(
                                        null
                                    )
                                }
                            >
                                Close
                            </button>

                            {selectedInquiry.email && (
                                <a
                                    href={`mailto:${selectedInquiry.email}`}
                                    className="sb-dashboard-modal-primary"
                                >
                                    Reply by Email
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* =================================================
                DELETE CONFIRMATION MODAL
            ================================================= */}

            {deleteTarget && (
                <div
                    className="sb-dashboard-delete-overlay"
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            setDeleteTarget(
                                null
                            );
                        }
                    }}
                >
                    <div className="sb-dashboard-delete-modal">
                        <div className="sb-dashboard-delete-icon">
                            <WarningAmberRoundedIcon />
                        </div>

                        <h2>
                            Delete inquiry?
                        </h2>

                        <p>
                            You're about to permanently
                            delete the inquiry from{" "}
                            <strong>
                                {deleteTarget.name ||
                                    "this contact"}
                            </strong>
                            .
                        </p>

                        <span className="sb-dashboard-delete-warning">
                            This action cannot be undone.
                        </span>

                        <div className="sb-dashboard-delete-actions">
                            <button
                                className="sb-dashboard-delete-cancel"
                                onClick={() =>
                                    setDeleteTarget(
                                        null
                                    )
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="sb-dashboard-delete-confirm"
                                onClick={
                                    confirmDelete
                                }
                                disabled={
                                    deletingId ===
                                    deleteTarget.id
                                }
                            >
                                {deletingId ===
                                deleteTarget.id
                                    ? "Deleting..."
                                    : "Delete Inquiry"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}