"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import { createClient } from "../lib/supabase/client";

import "./blog-cms.css";

const PAGE_SIZE = 10;

export default function Blog() {
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);

    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [featuredFilter, setFeaturedFilter] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);

    const [viewBlog, setViewBlog] = useState(null);
    const [deleteBlog, setDeleteBlog] = useState(null);
    const [deleting, setDeleting] = useState(false);

    /*
     * ---------------------------------------------
     * Fetch categories
     * ---------------------------------------------
     */
    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from("blog_categories")
            .select("id, name, slug")
            .order("name", { ascending: true });

        if (error) {
            console.error("Error loading blog categories:", error);
            return;
        }

        setCategories(data || []);
    };

    /*
     * ---------------------------------------------
     * Fetch blogs
     * ---------------------------------------------
     */
    const fetchBlogs = async (showRefresh = false) => {
        try {
            if (showRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const { data, error } = await supabase
                .from("blogs")
                .select(`
                    id,
                    title,
                    slug,
                    category_id,
                    description,
                    content,
                    featured_image_url,
                    featured_image_alt,
                    author_name,
                    status,
                    featured,
                    seo_title,
                    seo_description,
                    published_at,
                    created_at,
                    updated_at,
                    category:blog_categories (
                        id,
                        name,
                        slug
                    )
                `)
                .order("created_at", {
                    ascending: false,
                });

            if (error) {
                console.error("Error loading blogs:", error);
                return;
            }

            setBlogs(data || []);
        } catch (error) {
            console.error("Unexpected blog loading error:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    /*
     * ---------------------------------------------
     * Initial load
     * ---------------------------------------------
     */
    useEffect(() => {
        fetchCategories();
        fetchBlogs();
    }, []);

    /*
     * ---------------------------------------------
     * Filter blogs
     * ---------------------------------------------
     */
    const filteredBlogs = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        return blogs.filter((blog) => {
            const matchesSearch =
                !search ||
                blog.title?.toLowerCase().includes(search) ||
                blog.slug?.toLowerCase().includes(search) ||
                blog.description?.toLowerCase().includes(search) ||
                blog.author_name?.toLowerCase().includes(search);

            const matchesCategory =
                categoryFilter === "all" ||
                blog.category_id === categoryFilter;

            const matchesStatus =
                statusFilter === "all" ||
                blog.status === statusFilter;

            const matchesFeatured =
                featuredFilter === "all" ||
                (featuredFilter === "featured" && blog.featured) ||
                (featuredFilter === "regular" && !blog.featured);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus &&
                matchesFeatured
            );
        });
    }, [
        blogs,
        searchTerm,
        categoryFilter,
        statusFilter,
        featuredFilter,
    ]);

    /*
     * ---------------------------------------------
     * Pagination
     * ---------------------------------------------
     */
    const totalPages = Math.max(
        1,
        Math.ceil(filteredBlogs.length / PAGE_SIZE)
    );

    const paginatedBlogs = useMemo(() => {
        const startIndex =
            (currentPage - 1) * PAGE_SIZE;

        return filteredBlogs.slice(
            startIndex,
            startIndex + PAGE_SIZE
        );
    }, [filteredBlogs, currentPage]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    /*
     * ---------------------------------------------
     * Clear filters
     * ---------------------------------------------
     */
    const clearFilters = () => {
        setSearchTerm("");
        setCategoryFilter("all");
        setStatusFilter("all");
        setFeaturedFilter("all");
        setCurrentPage(1);
    };

    /*
     * ---------------------------------------------
     * Delete blog
     * ---------------------------------------------
     */
    const handleDelete = async () => {
        if (!deleteBlog) return;

        try {
            setDeleting(true);

            const { error } = await supabase
                .from("blogs")
                .delete()
                .eq("id", deleteBlog.id);

            if (error) {
                console.error(
                    "Error deleting blog:",
                    error
                );

                alert(
                    error.message ||
                        "Unable to delete the blog."
                );

                return;
            }

            setBlogs((previousBlogs) =>
                previousBlogs.filter(
                    (blog) =>
                        blog.id !== deleteBlog.id
                )
            );

            setDeleteBlog(null);
        } catch (error) {
            console.error(
                "Unexpected delete error:",
                error
            );

            alert(
                "Something went wrong while deleting the blog."
            );
        } finally {
            setDeleting(false);
        }
    };

    /*
     * ---------------------------------------------
     * Format date
     * ---------------------------------------------
     */
    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    };

    /*
     * ---------------------------------------------
     * Status class
     * ---------------------------------------------
     */
    const getStatusClass = (status) => {
        if (status === "published") {
            return "published";
        }

        return "draft";
    };

    /*
     * ---------------------------------------------
     * Loading
     * ---------------------------------------------
     */
    if (loading) {
        return (
            <div className="sb-blog-cms">
                <div className="sb-blog-cms-loading">
                    <div className="sb-blog-cms-spinner" />

                    <p>Loading blogs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="sb-blog-cms">
            {/* ----------------------------------------
                TOP ACTION BAR
            ----------------------------------------- */}
            <div className="sb-blog-cms-toolbar">
                <div>
                    <div className="sb-blog-cms-result-count">
                        {filteredBlogs.length}{" "}
                        {filteredBlogs.length === 1
                            ? "blog"
                            : "blogs"}
                    </div>

                    <p className="sb-blog-cms-toolbar-text">
                        Manage your SoftBild blog posts
                    </p>
                </div>

                <div className="sb-blog-cms-toolbar-actions">
                    <button
                        type="button"
                        className="sb-blog-cms-refresh"
                        onClick={() =>
                            fetchBlogs(true)
                        }
                        disabled={refreshing}
                    >
                        <RefreshIcon
                            className={
                                refreshing
                                    ? "sb-blog-refreshing"
                                    : ""
                            }
                        />

                        {refreshing
                            ? "Refreshing..."
                            : "Refresh"}
                    </button>

                    <button
                        type="button"
                        className="sb-blog-cms-add"
                        onClick={() =>
                            router.push(
                                "/dashboard/add-blog"
                            )
                        }
                    >
                        <AddIcon />
                        Add Blog
                    </button>
                </div>
            </div>

            {/* ----------------------------------------
                FILTERS
            ----------------------------------------- */}
            <div className="sb-blog-cms-filters">
                <div className="sb-blog-cms-search">
                    <SearchIcon />

                    <input
                        type="text"
                        placeholder="Search blogs by title, author, slug..."
                        value={searchTerm}
                        onChange={(event) => {
                            setSearchTerm(
                                event.target.value
                            );
                            setCurrentPage(1);
                        }}
                    />

                    {searchTerm && (
                        <button
                            type="button"
                            className="sb-blog-search-clear"
                            onClick={() => {
                                setSearchTerm("");
                                setCurrentPage(1);
                            }}
                        >
                            <CloseIcon />
                        </button>
                    )}
                </div>

                <select
                    value={categoryFilter}
                    onChange={(event) => {
                        setCategoryFilter(
                            event.target.value
                        );
                        setCurrentPage(1);
                    }}
                >
                    <option value="all">
                        All Categories
                    </option>

                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={(event) => {
                        setStatusFilter(
                            event.target.value
                        );
                        setCurrentPage(1);
                    }}
                >
                    <option value="all">
                        All Status
                    </option>

                    <option value="published">
                        Published
                    </option>

                    <option value="draft">
                        Draft
                    </option>
                </select>

                <select
                    value={featuredFilter}
                    onChange={(event) => {
                        setFeaturedFilter(
                            event.target.value
                        );
                        setCurrentPage(1);
                    }}
                >
                    <option value="all">
                        All Posts
                    </option>

                    <option value="featured">
                        Featured
                    </option>

                    <option value="regular">
                        Regular
                    </option>
                </select>

                {(searchTerm ||
                    categoryFilter !== "all" ||
                    statusFilter !== "all" ||
                    featuredFilter !== "all") && (
                    <button
                        type="button"
                        className="sb-blog-cms-clear"
                        onClick={clearFilters}
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {/* ----------------------------------------
                TABLE
            ----------------------------------------- */}
            <div className="sb-blog-cms-table-card">
                {paginatedBlogs.length === 0 ? (
                    <div className="sb-blog-cms-empty">
                        <div className="sb-blog-cms-empty-icon">
                            <ArticleOutlinedIcon />
                        </div>

                        <h3>No blogs found</h3>

                        <p>
                            {searchTerm ||
                            categoryFilter !==
                                "all" ||
                            statusFilter !==
                                "all" ||
                            featuredFilter !==
                                "all"
                                ? "Try changing your search or filters."
                                : "Start publishing your first blog post."}
                        </p>

                        {searchTerm ||
                        categoryFilter !==
                            "all" ||
                        statusFilter !==
                            "all" ||
                        featuredFilter !==
                            "all" ? (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="sb-blog-cms-empty-button"
                            >
                                Clear filters
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() =>
                                    router.push(
                                        "/dashboard/add-blog"
                                    )
                                }
                                className="sb-blog-cms-empty-button"
                            >
                                <AddIcon />
                                Add your first blog
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="sb-blog-cms-table-wrapper">
                            <table className="sb-blog-cms-table">
                                <thead>
                                    <tr>
                                        <th>BLOG</th>
                                        <th>CATEGORY</th>
                                        <th>AUTHOR</th>
                                        <th>STATUS</th>
                                        <th>DATE</th>
                                        <th className="sb-blog-actions-heading">
                                            ACTIONS
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {paginatedBlogs.map(
                                        (blog) => (
                                            <tr
                                                key={
                                                    blog.id
                                                }
                                            >
                                                <td>
                                                    <div className="sb-blog-cms-blog-cell">
                                                        <div className="sb-blog-cms-image">
                                                            {blog.featured_image_url ? (
                                                                <img
                                                                    src={
                                                                        blog.featured_image_url
                                                                    }
                                                                    alt={
                                                                        blog.featured_image_alt?.trim() ||
                                                                        blog.title
                                                                    }
                                                                />
                                                            ) : (
                                                                <ArticleOutlinedIcon />
                                                            )}
                                                        </div>

                                                        <div className="sb-blog-cms-blog-info">
                                                            <div className="sb-blog-cms-title-row">
                                                                <strong>
                                                                    {
                                                                        blog.title
                                                                    }
                                                                </strong>

                                                                {blog.featured && (
                                                                    <span className="sb-blog-featured-badge">
                                                                        <StarIcon />
                                                                        Featured
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <span className="sb-blog-cms-slug">
                                                                /
                                                                {
                                                                    blog.slug
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>
                                                    <span className="sb-blog-category-badge">
                                                        {blog
                                                            .category
                                                            ?.name ||
                                                            "Uncategorized"}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="sb-blog-author">
                                                        {
                                                            blog.author_name ||
                                                            "—"
                                                        }
                                                    </div>
                                                </td>

                                                <td>
                                                    <span
                                                        className={`sb-blog-status-badge ${getStatusClass(
                                                            blog.status
                                                        )}`}
                                                    >
                                                        <span />
                                                        {blog.status ===
                                                        "published"
                                                            ? "Published"
                                                            : "Draft"}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="sb-blog-date">
                                                        <CalendarTodayOutlinedIcon />

                                                        {formatDate(
                                                            blog.published_at ||
                                                                blog.created_at
                                                        )}
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="sb-blog-row-actions">
                                                        <button
                                                            type="button"
                                                            title="View blog"
                                                            onClick={() =>
                                                                setViewBlog(
                                                                    blog
                                                                )
                                                            }
                                                        >
                                                            <VisibilityOutlinedIcon />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            title="Edit blog"
                                                            onClick={() =>
                                                                router.push(
                                                                    `/dashboard/blog/edit/${blog.id}`
                                                                )
                                                            }
                                                        >
                                                            <EditOutlinedIcon />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            title="Delete blog"
                                                            className="delete"
                                                            onClick={() =>
                                                                setDeleteBlog(
                                                                    blog
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
                        </div>

                        {/* --------------------------------
                            PAGINATION
                        --------------------------------- */}
                        {totalPages > 1 && (
                            <div className="sb-blog-cms-pagination">
                                <div>
                                    Showing{" "}
                                    <strong>
                                        {(currentPage -
                                            1) *
                                            PAGE_SIZE +
                                            1}
                                    </strong>{" "}
                                    to{" "}
                                    <strong>
                                        {Math.min(
                                            currentPage *
                                                PAGE_SIZE,
                                            filteredBlogs.length
                                        )}
                                    </strong>{" "}
                                    of{" "}
                                    <strong>
                                        {
                                            filteredBlogs.length
                                        }
                                    </strong>
                                </div>

                                <div className="sb-blog-pagination-buttons">
                                    <button
                                        type="button"
                                        disabled={
                                            currentPage ===
                                            1
                                        }
                                        onClick={() =>
                                            setCurrentPage(
                                                (page) =>
                                                    page -
                                                    1
                                            )
                                        }
                                    >
                                        Previous
                                    </button>

                                    {Array.from(
                                        {
                                            length: totalPages,
                                        },
                                        (_, index) =>
                                            index + 1
                                    ).map((page) => (
                                        <button
                                            type="button"
                                            key={page}
                                            className={
                                                currentPage ===
                                                page
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setCurrentPage(
                                                    page
                                                )
                                            }
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        type="button"
                                        disabled={
                                            currentPage ===
                                            totalPages
                                        }
                                        onClick={() =>
                                            setCurrentPage(
                                                (page) =>
                                                    page +
                                                    1
                                            )
                                        }
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* ----------------------------------------
                VIEW MODAL
            ----------------------------------------- */}
            {viewBlog && (
                <div
                    className="sb-blog-modal-overlay"
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            setViewBlog(null);
                        }
                    }}
                >
                    <div className="sb-blog-view-modal">
                        <div className="sb-blog-modal-header">
                            <div>
                                <span>
                                    Blog Preview
                                </span>

                                <h2>
                                    {viewBlog.title}
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setViewBlog(null)
                                }
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {viewBlog.featured_image_url && (
                            <div className="sb-blog-view-image">
                                <img
                                    src={
                                        viewBlog.featured_image_url
                                    }
                                    alt={
                                        viewBlog.featured_image_alt?.trim() ||
                                        viewBlog.title
                                    }
                                />
                            </div>
                        )}

                        <div className="sb-blog-view-content">
                            <div className="sb-blog-view-meta">
                                <span>
                                    {viewBlog
                                        .category
                                        ?.name ||
                                        "Uncategorized"}
                                </span>

                                <span>
                                    {viewBlog.author_name ||
                                        "Unknown author"}
                                </span>

                                <span
                                    className={`sb-blog-status-badge ${getStatusClass(
                                        viewBlog.status
                                    )}`}
                                >
                                    <span />
                                    {viewBlog.status ===
                                    "published"
                                        ? "Published"
                                        : "Draft"}
                                </span>
                            </div>

                            {viewBlog.description && (
                                <div className="sb-blog-view-description">
                                    {
                                        viewBlog.description
                                    }
                                </div>
                            )}

                            <div className="sb-blog-view-url">
                                <strong>
                                    Slug:
                                </strong>

                                /{viewBlog.slug}
                            </div>
                        </div>

                        <div className="sb-blog-modal-footer">
                            <button
                                type="button"
                                className="sb-blog-modal-secondary"
                                onClick={() =>
                                    setViewBlog(null)
                                }
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                className="sb-blog-modal-primary"
                                onClick={() =>
                                    router.push(
                                        `/dashboard/blog/edit/${viewBlog.id}`
                                    )
                                }
                            >
                                <EditOutlinedIcon />
                                Edit Blog
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ----------------------------------------
                DELETE MODAL
            ----------------------------------------- */}
            {deleteBlog && (
                <div
                    className="sb-blog-modal-overlay"
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                            event.currentTarget &&
                            !deleting
                        ) {
                            setDeleteBlog(null);
                        }
                    }}
                >
                    <div className="sb-blog-delete-modal">
                        <div className="sb-blog-delete-icon">
                            <DeleteOutlineIcon />
                        </div>

                        <h2>Delete blog?</h2>

                        <p>
                            Are you sure you want to
                            delete{" "}
                            <strong>
                                "{deleteBlog.title}"
                            </strong>
                            ? This action cannot be
                            undone.
                        </p>

                        <div className="sb-blog-delete-actions">
                            <button
                                type="button"
                                className="sb-blog-modal-secondary"
                                disabled={deleting}
                                onClick={() =>
                                    setDeleteBlog(null)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="sb-blog-delete-confirm"
                                disabled={deleting}
                                onClick={
                                    handleDelete
                                }
                            >
                                {deleting
                                    ? "Deleting..."
                                    : "Delete Blog"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}