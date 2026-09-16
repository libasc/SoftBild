"use client";

import { useEffect, useMemo, useState } from "react";
const readMoreIcon = "/assets/icons/arrow-right-blue.svg";

import BlogHeroSection from "../BlogHeroSection";
import { createClient } from "../../../lib/supabase/client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
function Blog() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const supabase = createClient();

    const [blogs, setBlogs] = useState([]);
    const [loadingBlogs, setLoadingBlogs] = useState(true);

    useEffect(() => {
    const loadPublishedBlogs = async () => {
        setLoadingBlogs(true);

        const { data, error } = await supabase
            .from("blogs")
            .select(`
                id,
                title,
                slug,
                description,
                featured_image_url,
                featured_image_alt,
                published_at,
                blog_categories (
                    id,
                    name,
                    slug
                )
            `)
            .eq("status", "published")
            .order("published_at", {
                ascending: false,
            });

        if (error) {
            console.error(
                "Error loading published blogs:",
                error
            );
            setBlogs([]);
            setLoadingBlogs(false);
            return;
        }

        const formattedBlogs = (data || []).map((blog) => ({
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            description: blog.description || "",
            image: blog.featured_image_url,
            imageAlt: blog.featured_image_alt || "",
            category: blog.blog_categories?.name || "",
            publishedAt: blog.published_at,
        }));

        setBlogs(formattedBlogs);
        setLoadingBlogs(false);
    };

    loadPublishedBlogs();
}, []);



    const setSearchParams = (params) => {
        const query = new URLSearchParams(params).toString();
        router.push(query ? `/blog?${query}` : "/blog");
    };

    const initialSearch = searchParams.get("search") || "";
    const initialCategory = searchParams.get("category") || "All";

    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] =
        useState(initialCategory);

    /*
     * Get unique categories
     */
    const categories = useMemo(() => {
        return [
            "All",
            ...new Set(
                blogs
                    .map((blog) => blog.category)
                    .filter(Boolean)
            ),
        ];
    }, [blogs]);

    /*
     * Filter blogs
     */
    /*
 * Filter blogs
 */
const filteredPosts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return blogs.filter((post) => {
        const matchesSearch =
            !search ||
            post.title?.toLowerCase().includes(search) ||
            post.description?.toLowerCase().includes(search) ||
            post.category?.toLowerCase().includes(search);

        const matchesCategory =
            selectedCategory === "All" ||
            post.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });
}, [blogs, searchTerm, selectedCategory]);


/*
 * Live search suggestions
 */
const searchSuggestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
        return [];
    }

    return blogs
        .filter((post) => {
            const title =
                post.title?.toLowerCase() || "";

            const description =
                post.description?.toLowerCase() || "";

            const category =
                post.category?.toLowerCase() || "";

            return (
                title.includes(query) ||
                description.includes(query) ||
                category.includes(query)
            );
        })
        .slice(0, 6);
}, [searchTerm]);

    /*
     * Check if filters are active
     */
    const hasActiveFilters =
        searchTerm.trim() !== "" ||
        selectedCategory !== "All";

    /*
     * Search
     */
        const handleSearch = (e) => {
            if (e) {
                e.preventDefault();
            }

            const search = searchTerm.trim();

            const params = {};

            if (search) {
                params.search = search;
            }

            if (selectedCategory !== "All") {
                params.category = selectedCategory;
            }

            setSearchParams(params);
        };

    /*
     * Category
     */
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);

        const params = {};

        const search = searchTerm.trim();

        if (search) {
            params.search = search;
        }

        if (category !== "All") {
            params.category = category;
        }

        setSearchParams(params);
    };

    /*
     * Clear filters
     */
    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("All");
        setSearchParams({});
    };

    return (
        <>
<BlogHeroSection />

            {/* =====================================================
                BLOG SECTION
            ====================================================== */}

            <section className="container-fluid py-80 bg-blue2 bg-img-top">
                <div className="container">

                    <div className="row g-5">

                        {/* =================================================
                            BLOG CONTENT
                        ================================================== */}

                        <div className="col-xl-8 col-lg-8">

                            {/* Result heading */}

                            <div className="sb-blog-list-header">

                                <div>
                                    <h2 className="dark-subtitle mb-0">
                                        Latest Insights & Articles
                                    </h2>
                                </div>

                                <div className="sb-blog-result-count">
                                    <strong>
                                        {filteredPosts.length}
                                    </strong>

                                    <span>
                                        {filteredPosts.length === 1
                                            ? " Article"
                                            : " Articles"}
                                    </span>
                                </div>

                            </div>

                            {/* Active filter information */}

                            {hasActiveFilters && (
                                <div className="sb-blog-active-filters">

                                    <div className="sb-blog-active-filter-text">

                                        <span>
                                            Showing results
                                        </span>

                                        {searchTerm.trim() && (
                                            <strong>
                                                "{searchTerm.trim()}"
                                            </strong>
                                        )}

                                        {selectedCategory !== "All" && (
                                            <span>
                                                in{" "}
                                                <strong>
                                                    {selectedCategory}
                                                </strong>
                                            </span>
                                        )}

                                    </div>

                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="sb-blog-clear-filter"
                                    >
                                        Clear Filters
                                    </button>

                                </div>
                            )}

                            {/* =================================================
                                BLOG CARDS
                            ================================================== */}

                            <div className="row sb-blog-wrapper">

                                {loadingBlogs ? (
                                    <div className="col-12">
                                        <div className="sb-blog-no-results">
                                            <h3>Loading Blogs...</h3>
                                            <p>
                                                Please wait while we load the latest articles.
                                            </p>
                                        </div>
                                    </div>
                                ) : filteredPosts.length > 0 ? (
                                    filteredPosts.map((post) => (

                                        <div
                                            className="col-xl-6 col-lg-6 col-md-6 d-flex mb-3"
                                            key={post.id}
                                        >

                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="sb-blog-card-link"
                                                aria-label={`Read ${post.title}`}
                                            >

                                                <div className="sb-blog-card1 h-100">

                                                    <div className="sb-blog-card1-content h-100">

                                                        <div className="sb-blog-card1-inner-content">

                                                            {/* Blog Image */}

                                                            <div className="blog-card-image">

                                                                <img
                                                                    src={post.image}
                                                                    alt={
                                                                        post.imageAlt?.trim() ||
                                                                        post.title
                                                                    }
                                                                />

                                                            </div>

                                                            {/* Blog Read Time */}

                                                            {/* <div className="blog-date-time">

                                                                <p>
                                                                    {post.readTime}
                                                                </p>

                                                            </div> */}

                                                            {/* Blog Title */}

                                                            <h3 className="dark-title2">
                                                                {post.title}
                                                            </h3>

                                                            {/* Blog Description */}

                                                            <p>
                                                                {post.description}
                                                            </p>

                                                        </div>

                                                        {/* Read More */}

                                                        <div className="blog-read-more-btnwrapper justify-content-end">

                                                            <span className="blog-btn-text-read-more text-gradient1">
                                                                Read More
                                                            </span>

                                                            <div className="blog-btn-icon-read-more">

                                                                <img
                                                                    src={readMoreIcon}
                                                                    alt=""
                                                                />

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </Link>

                                        </div>

                                    ))
                                ) : (

                                    /* =================================================
                                       NO RESULTS
                                    ================================================== */

                                    <div className="col-12">

                                        <div className="sb-blog-no-results">

                                            <div className="sb-blog-no-results-icon">
                                                🔍
                                            </div>

                                            <h3>
                                                No Blogs Found
                                            </h3>

                                            <p>
                                                We couldn't find any articles
                                                matching your search or selected
                                                category.
                                            </p>

                                            <button
                                                type="button"
                                                onClick={clearFilters}
                                                className="sf-btn3"
                                            >
                                                Clear Filters
                                            </button>

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>


                        {/* =================================================
                            RIGHT SIDEBAR
                        ================================================== */}

                        <div className="col-xl-4 col-lg-4">

                            <aside className="sb-blog-sidebar">

                                {/* =================================================
                                    SEARCH
                                ================================================== */}

                                <div className="sb-blog-sidebar-block">

                                    <div className="sb-blog-sidebar-heading">
                                        <h3>
                                            Search Blogs
                                        </h3>
                                    </div>

                                    <div className="sb-blog-search-wrapper">

                                        <form
                                            onSubmit={handleSearch}
                                            className="sb-blog-sidebar-search"
                                        >

                                            <input
                                                type="search"
                                                placeholder="Search blogs..."
                                                value={searchTerm}
                                                onChange={(e) =>
                                                    setSearchTerm(e.target.value)
                                                }
                                                aria-label="Search blogs"
                                                autoComplete="off"
                                            />

                                            <button
                                                type="submit"
                                                aria-label="Search blogs"
                                            >
                                                Search
                                            </button>

                                        </form>


                                        {/* =================================================
                                            LIVE SEARCH SUGGESTIONS
                                        ================================================== */}

                                        {searchTerm.trim() && (
                                            <div className="sb-blog-search-suggestions">

                                                {searchSuggestions.length > 0 ? (
                                                    <>

                                                        {searchSuggestions.map((post) => (
                                                            <Link
                                                                key={post.id}
                                                                href={`/blog/${post.slug}`}
                                                                className="sb-blog-search-suggestion"
                                                                onClick={() =>
                                                                    setSearchTerm("")
                                                                }
                                                            >

                                                                <div className="sb-blog-search-suggestion-content">

                                                                    {post.category && (
                                                                        <span className="sb-blog-search-suggestion-category">
                                                                            {post.category}
                                                                        </span>
                                                                    )}

                                                                    <strong>
                                                                        {post.title}
                                                                    </strong>

                                                                    {post.description && (
                                                                        <small>
                                                                            {post.description}
                                                                        </small>
                                                                    )}

                                                                </div>

                                                                <span className="sb-blog-search-suggestion-arrow">
                                                                    →
                                                                </span>

                                                            </Link>
                                                        ))}


                                                        <button
                                                            type="button"
                                                            className="sb-blog-search-view-all"
                                                            onClick={() => {
                                                                handleSearch();
                                                            }}
                                                        >
                                                            View all search results →
                                                        </button>

                                                    </>
                                                ) : (

                                                    <div className="sb-blog-search-no-results">

                                                        <strong>
                                                            No blogs found
                                                        </strong>

                                                        <span>
                                                            Try another keyword or category.
                                                        </span>

                                                    </div>

                                                )}

                                            </div>
                                        )}

                                    </div>
                            </div>


                                {/* =================================================
                                    CATEGORIES
                                ================================================== */}

                                <div className="sb-blog-sidebar-block">

                                    <div className="sb-blog-sidebar-heading">

                                        <h3>
                                            Explore Categories
                                        </h3>

                                    </div>

                                    <div className="sb-blog-category-list">

                                        {categories.map((category) => {

                                            const isActive =
                                                selectedCategory === category;

                                            const categoryCount =
                                                category === "All"
                                                    ? blogs.length
                                                    : blogs.filter(
                                                        (blog) =>
                                                            blog.category === category
                                                    ).length;

                                            return (
                                                <button
                                                    type="button"
                                                    key={category}
                                                    className={`sb-blog-category-item ${
                                                        isActive
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleCategoryChange(category)
                                                    }
                                                >

                                                    <span className="sb-blog-category-name">

                                                        {category === "All"
                                                            ? "All Categories"
                                                            : category}

                                                    </span>

                                                    <span className="sb-blog-category-count">
                                                        {categoryCount}
                                                    </span>

                                                </button>
                                            );
                                        })}

                                    </div>

                                </div>


                                {/* =================================================
                                    ACTIVE FILTERS
                                ================================================== */}

                                {hasActiveFilters && (

                                    <div className="sb-blog-sidebar-block sb-blog-filter-status">

                                        <div className="sb-blog-sidebar-heading">

                                            <h3>
                                                Active Filters
                                            </h3>

                                        </div>

                                        <div className="sb-blog-active-filter-list">

                                            {searchTerm.trim() && (
                                                <div className="sb-blog-filter-tag">

                                                    <span>
                                                        Search:
                                                    </span>

                                                    <strong>
                                                        {searchTerm.trim()}
                                                    </strong>

                                                </div>
                                            )}

                                            {selectedCategory !== "All" && (
                                                <div className="sb-blog-filter-tag">

                                                    <span>
                                                        Category:
                                                    </span>

                                                    <strong>
                                                        {selectedCategory}
                                                    </strong>

                                                </div>
                                            )}

                                        </div>

                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="sb-blog-sidebar-clear"
                                        >
                                            Clear All Filters
                                        </button>

                                    </div>

                                )}


                                {/* =================================================
                                    BLOG INFORMATION
                                ================================================== */}

                                <div className="sb-blog-sidebar-cta">

                                    <div className="sb-blog-sidebar-cta-icon">
                                        ✦
                                    </div>

                                    <h3>
                                        Stay Ahead With Better Technology
                                    </h3>

                                    <p>
                                        Explore practical insights, development
                                        strategies, and technology trends to help
                                        your business make better digital decisions.
                                    </p>

                                    <Link
                                        href="/contact"
                                        className="sf-btn3"
                                    >
                                        Let's Talk
                                    </Link>

                                </div>

                            </aside>

                        </div>

                    </div>

                </div>
            </section>
        </>
    );
}

export default Blog;