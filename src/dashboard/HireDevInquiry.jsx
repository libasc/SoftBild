"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../lib/supabase/client";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

import "./dashboard.css";

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
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase()
        );
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

export function HireDevInquiry() {
    const supabase = useMemo(
        () => createClient(),
        []
    );

    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] =
        useState("all");

    const [selectedInquiry, setSelectedInquiry] =
        useState(null);

    const [deleteTarget, setDeleteTarget] =
        useState(null);

    const [deletingId, setDeletingId] =
        useState(null);

    const [updatingId, setUpdatingId] =
        useState(null);

    const [currentPage, setCurrentPage] =
        useState(1);

    /*
     * =====================================================
     * LOAD
     * =====================================================
     */

    const loadInquiries = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("hire_dev_inquiries")
            .select("*")
            .order("created_at", {
                ascending: false,
            });

        if (error) {
            console.error(
                "Failed to load Hire-Dev inquiries:",
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
     * =====================================================
     * SEARCH + FILTER
     * =====================================================
     */

    const filteredInquiries = useMemo(() => {
        const search =
            searchTerm.trim().toLowerCase();

        return inquiries.filter((inquiry) => {
            if (
                statusFilter !== "all" &&
                inquiry.status !== statusFilter
            ) {
                return false;
            }

            if (!search) {
                return true;
            }

            const searchableText = [
                inquiry.name,
                inquiry.email,
                inquiry.phone,
                inquiry.company,
                inquiry.project_type,
                inquiry.project_requirements,
                inquiry.developers_required,
                inquiry.status,
                inquiry.timezone,
            ]
                .map(searchableValue)
                .join(" ");

            return searchableText.includes(search);
        });
    }, [
        inquiries,
        searchTerm,
        statusFilter,
    ]);

    /*
     * =====================================================
     * PAGINATION
     * =====================================================
     */

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredInquiries.length /
                ITEMS_PER_PAGE
        )
    );

    const paginatedInquiries =
        filteredInquiries.slice(
            (currentPage - 1) *
                ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    /*
     * =====================================================
     * COUNTS
     * =====================================================
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

    const consultationCount =
        inquiries.filter(
            (item) =>
                item.consultation_required ===
                true
        ).length;

    /*
     * =====================================================
     * UPDATE STATUS
     * =====================================================
     */

    const updateStatus = async (
        id,
        status
    ) => {
        setUpdatingId(id);

        const { error } = await supabase
            .from("hire_dev_inquiries")
            .update({ status })
            .eq("id", id);

        if (error) {
            console.error(
                "Failed to update status:",
                error
            );

            alert(
                "Unable to update the inquiry status."
            );

            setUpdatingId(null);
            return;
        }

        setInquiries((current) =>
            current.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          status,
                      }
                    : item
            )
        );

        if (
            selectedInquiry?.id === id
        ) {
            setSelectedInquiry((current) => ({
                ...current,
                status,
            }));
        }

        setUpdatingId(null);
    };

    /*
     * =====================================================
     * DELETE
     * =====================================================
     */

    const confirmDelete = async () => {
        if (!deleteTarget) return;

        const id = deleteTarget.id;

        setDeletingId(id);

        const { error } = await supabase
            .from("hire_dev_inquiries")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(
                "Failed to delete inquiry:",
                error
            );

            alert(
                "Unable to delete this inquiry."
            );

            setDeletingId(null);
            return;
        }

        setInquiries((current) =>
            current.filter(
                (item) => item.id !== id
            )
        );

        setDeleteTarget(null);
        setDeletingId(null);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter("all");
        setCurrentPage(1);
    };

    return (
    <>

                <section className="sb-dashboard-content">
                    {/* STATS */}

                    <div className="sb-dashboard-stats">
                        <div className="sb-dashboard-stat-card">
                            <div className="sb-dashboard-stat-icon blue">
                                <GroupsOutlinedIcon />
                            </div>

                            <div>
                                <span>
                                    Total Requests
                                </span>

                                <strong>
                                    {totalCount}
                                </strong>

                                <small>
                                    All hiring requests
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
                                    {
                                        inProgressCount
                                    }
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
                                    {
                                        convertedCount
                                    }
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
                                    HIRING PIPELINE
                                </span>

                                <strong>
                                    Developer request
                                    overview
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

                    {/* TABLE */}

                    <div className="sb-dashboard-panel">
                        <div className="sb-dashboard-panel-header">
                            <div>
                                <div className="sb-dashboard-section-kicker">
                                    DEVELOPER REQUESTS
                                </div>

                                <h2>
                                    Hire-Dev Inquiries
                                </h2>

                                <p>
                                    {
                                        filteredInquiries.length
                                    }{" "}
                                    {filteredInquiries.length ===
                                    1
                                        ? "request"
                                        : "requests"}{" "}
                                    found
                                </p>
                            </div>

                            <button
                                className="sb-dashboard-refresh"
                                onClick={
                                    loadInquiries
                                }
                                disabled={loading}
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
                                    onChange={(event) =>
                                        setSearchTerm(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Search name, email, phone, company, project..."
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
                                        <GroupsOutlinedIcon />
                                    </div>

                                    <h3>
                                        No Hire-Dev
                                        requests found
                                    </h3>

                                    <p>
                                        Try changing your
                                        search or filter.
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
                                                PROJECT
                                            </th>

                                            <th>
                                                DEVELOPERS
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
                                                        <div>
                                                            <strong
                                                                style={{
                                                                    display:
                                                                        "block",
                                                                    color:
                                                                        "#34424c",
                                                                    fontSize:
                                                                        "10px",
                                                                    marginBottom:
                                                                        "4px",
                                                                }}
                                                            >
                                                                {inquiry.project_type ||
                                                                    "Project request"}
                                                            </strong>

                                                            <span className="sb-dashboard-company">
                                                                {inquiry.company ||
                                                                    "No company"}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="sb-dashboard-developer-count">
                                                            <strong>
                                                                {inquiry.developers_required ??
                                                                    0}
                                                            </strong>

                                                            <span>
                                                                developer
                                                                {Number(
                                                                    inquiry.developers_required
                                                                ) ===
                                                                1
                                                                    ? ""
                                                                    : "s"}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        {inquiry.consultation_required ? (
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
                                        ).map(
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
                                    HIRE-DEV INQUIRY
                                </span>

                                <h2>
                                    {selectedInquiry.name ||
                                        "Developer Request"}
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

                                    <strong>
                                        {selectedInquiry.phone ||
                                            "Not provided"}
                                    </strong>
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
                                        Project Type
                                    </span>

                                    <strong>
                                        {selectedInquiry.project_type ||
                                            "Not specified"}
                                    </strong>
                                </div>

                                <div className="sb-dashboard-detail">
                                    <span>
                                        Developers Required
                                    </span>

                                    <strong>
                                        {
                                            selectedInquiry.developers_required
                                        }
                                    </strong>
                                </div>

                                <div className="sb-dashboard-detail">
                                    <span>
                                        Consultation
                                    </span>

                                    <strong>
                                        {selectedInquiry.consultation_required
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
                                    Project Requirements
                                </span>

                                <div>
                                    {selectedInquiry.project_requirements ||
                                        "No project requirements provided."}
                                </div>
                            </div>
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
                DELETE MODAL
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
                            delete the Hire-Dev request
                            from{" "}
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
        </>
    );
}