"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

function BlogDetails() {


    const { slug } = useParams();
const router = useRouter();

const supabase = createClient();

const [searchTerm, setSearchTerm] = useState("");
const [blogs, setBlogs] = useState([]);
const [post, setPost] = useState(null);
const [loadingBlog, setLoadingBlog] = useState(true);

useEffect(() => {
    const loadBlog = async () => {
        if (!slug) {
            return;
        }

        setLoadingBlog(true);

        const { data, error } = await supabase
            .from("blogs")
            .select(`
                id,
                title,
                slug,
                description,
                content,
                featured_image_url,
                featured_image_alt,
                author_name,
                status,
                featured,
                published_at,
                blog_categories (
                    id,
                    name,
                    slug
                )
            `)
            .eq("slug", slug)
            .eq("status", "published")
            .maybeSingle();

        if (error) {
            console.error(
                "Error loading blog detail:",
                error
            );

            setPost(null);
            setLoadingBlog(false);
            return;
        }

        if (!data) {
            setPost(null);
            setLoadingBlog(false);
            return;
        }

        const formattedPost = {
            id: data.id,
            title: data.title,
            slug: data.slug,
            description: data.description || "",
            content: data.content || "",
            image: data.featured_image_url || "",
            imageAlt: data.featured_image_alt || "",
            author: data.author_name || "SoftBild",
            category: data.blog_categories?.name || "",
            publishedDate: data.published_at
                ? new Date(
                      data.published_at
                  ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                  })
                : "",
        };

        setPost(formattedPost);

        setLoadingBlog(false);
    };

    loadBlog();
}, [slug]);



useEffect(() => {
    const loadPublishedBlogs = async () => {
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
                "Error loading related blogs:",
                error
            );
            setBlogs([]);
            return;
        }

        const formattedBlogs = (data || []).map(
            (blog) => ({
                id: blog.id,
                title: blog.title,
                slug: blog.slug,
                description: blog.description || "",
                image: blog.featured_image_url || "",
                imageAlt: blog.featured_image_alt || "",
                category:
                    blog.blog_categories?.name || "",
                publishedAt: blog.published_at,
            })
        );

        setBlogs(formattedBlogs);
    };

    loadPublishedBlogs();
}, []);


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
     * Related blogs
     *
     * Same-category blogs are shown first.
     * Remaining slots are filled with other blogs.
     */
const relatedBlogs = useMemo(() => {
    if (!post) {
        return [];
    }

    const sameCategory = blogs.filter(
        (blog) =>
            blog.id !== post.id &&
            blog.category &&
            blog.category === post.category
    );

    const otherBlogs = blogs.filter(
        (blog) =>
            blog.id !== post.id &&
            !sameCategory.some(
                (relatedBlog) =>
                    relatedBlog.id === blog.id
            )
    );

    return [
        ...sameCategory,
        ...otherBlogs,
    ].slice(0, 4);
}, [post, blogs]);


    /*
     * Search from sidebar
     */
    const handleSearch = (e) => {
        e.preventDefault();

        const query = searchTerm.trim();

        if (!query) {
            router.push("/blog");
            return;
        }

        router.push(
            `/blog?search=${encodeURIComponent(query)}`
        );
    };

    const searchSuggestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
        return [];
    }

    return blogs
        .filter((blog) => {
            const title = blog.title?.toLowerCase() || "";
            const category = blog.category?.toLowerCase() || "";
            const description = blog.description?.toLowerCase() || "";

            return (
                title.includes(query) ||
                category.includes(query) ||
                description.includes(query)
            );
        })
        .slice(0, 6);
}, [searchTerm]);

    /*
     * Category filter
     */
    const handleCategory = (category) => {
        if (category === "All") {
            router.push("/blog");
            return;
        }

        router.push(
            `/blog?category=${encodeURIComponent(category)}`
        );
    };

    /*
     * Blog not found
     */
if (loadingBlog) {
    return (
        <section className="sb-blog-detail-page">
            <div className="container">
                <div className="sb-blog-not-found">
                    <h1>Loading Blog...</h1>

                    <p>
                        Please wait while we load the article.
                    </p>
                </div>
            </div>
        </section>
    );
}

if (!post) {
    return (
            <>
<section className="sb-blog-detail-page">
                    <div className="container">

                        <div className="sb-blog-not-found">

                            <span className="sb-blog-not-found-icon">
                                404
                            </span>

                            <h1>
                                Blog Post Not Found
                            </h1>

                            <p>
                                The blog post you're looking for
                                doesn't exist or may have been
                                removed.
                            </p>

                            <Link
                                href="/blog"
                                className="sb-blog-primary-btn"
                            >
                                ← Back to Blog
                            </Link>

                        </div>

                    </div>
                </section>
            </>
        );
    }

    /*
     * Render article content
     *
     * Supports:
     *
     * content: "single string"
     *
     * OR
     *
     * content: [
     *     "paragraph 1",
     *     "paragraph 2"
     * ]
     */

    const renderContent = () => {
    if (!post?.content) {
        return (
            <div className="sb-blog-content-placeholder">
                <p>
                    The full article content will be
                    published here soon.
                </p>
            </div>
        );
    }

    return (
        <div
            className="sb-blog-rich-content"
            dangerouslySetInnerHTML={{
                __html: post.content,
            }}
        />
    );
};

    /*
     * Check whether this post's category is active
     */
    const isCategoryActive = (category) => {
        if (category === "All") {
            return false;
        }

        return category === post.category;
    };

    return (
        <>
<main>

                {/* =================================================
                    BREADCRUMB
                ================================================== */}

                <section className="container-fluid blog-detail-breadcrumb-section">

                    <div className="container">

                        <nav
                            className="blog-breadcrumb"
                            aria-label="Breadcrumb"
                        >

                            <Link href="/">
                                Home
                            </Link>

                            <span>/</span>

                            <Link href="/blog">
                                Blog
                            </Link>

                            <span>/</span>

                            <span className="blog-breadcrumb-current">
                                {post.title}
                            </span>

                        </nav>

                    </div>

                </section>


                {/* =================================================
                    BLOG DETAIL CONTENT
                ================================================== */}

                <section className="container-fluid py-80 bg-img-top">

                    <div className="container">

                        <div className="row g-5">

                            {/* =================================================
                                MAIN ARTICLE
                            ================================================== */}

                            <div className="col-xl-8 col-lg-8">

                                <article className="sb-blog-article">

                                    {/* Category */}

                                    {post.category && (
                                        <div className="sb-blog-category">
                                            {post.category}
                                        </div>
                                    )}


                                    {/* Title */}

                                    <h1 className="dark-subtitle">
                                        {post.title}
                                    </h1>


                                    {/* Description */}

                                    <p className="sb-blog-article-intro">
                                        {post.description}
                                    </p>


                                    {/* =================================================
                                        ARTICLE META
                                    ================================================== */}

                                    <div className="sb-blog-article-meta">

                                        {/* Author */}

                                        <div className="sb-blog-author">

                                            <div className="sb-blog-author-avatar">
                                                S
                                            </div>

                                            <div>

                                                <span className="meta-label">
                                                    Written by
                                                </span>

                                                <strong>
                                                    {post.author || "SoftBild"}
                                                </strong>

                                            </div>

                                        </div>


                                        <div className="sb-blog-meta-divider" />


                                        {/* Reading Time */}

                                        {/* <div>

                                            <span className="meta-label">
                                                Reading time
                                            </span>

                                            <strong>
                                                {post.readTime}
                                            </strong>

                                        </div> */}


                                        {/* Published Date */}

                                        {post.publishedDate && (
                                            <>
                                                <div className="sb-blog-meta-divider" />

                                                <div>

                                                    <span className="meta-label">
                                                        Published
                                                    </span>

                                                    <strong>
                                                        {post.publishedDate}
                                                    </strong>

                                                </div>
                                            </>
                                        )}

                                    </div>


                                    {/* =================================================
                                        FEATURED IMAGE
                                    ================================================== */}

                                    <div className="sb-blog-featured-image">

                                        <img
                                            src={post.image}
                                            alt={post.imageAlt?.trim() || post.title}
                                        />

                                    </div>


                                    {/* =================================================
                                        ARTICLE CONTENT
                                    ================================================== */}

                                    <div className="sb-blog-article-content">
                                        {post.content ? (
                                            renderContent(post.content)
                                        ) : (
                                            <div className="sb-blog-content-placeholder">
                                                <p>
                                                    The full article content will be published here soon.
                                                </p>
                                            </div>
                                        )}
                                    </div>


                                    {/* =================================================
                                        ARTICLE FOOTER
                                    ================================================== */}

                                    <div className="sb-blog-article-footer">

                                        <div className="sb-blog-footer-category">
                                            <span>
                                                Category:
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleCategory(post.category)
                                                }
                                            >
                                                {post.category || "Technology"}
                                            </button>
                                        </div>

                                        <Link
                                            href="/blog"
                                            className="sb-blog-back-btn"
                                        >
                                            ← View All Blogs
                                        </Link>

                                    </div>

                                </article>

                            </div>


                            {/* =================================================
                                RIGHT SIDEBAR
                            ================================================== */}

                            <div className="col-xl-4 col-lg-4">

                                <aside className="sb-blog-sidebar">


                                    {/* =================================================
                                        SEARCH BLOGS
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


    {searchTerm.trim() && (
        <div className="sb-blog-search-suggestions">

            {searchSuggestions.length > 0 ? (
                <>
                    {searchSuggestions.map((blog) => (
                        <Link
                            key={blog.id}
                            href={`/blog/${blog.slug}`}
                            className="sb-blog-search-suggestion"
                            onClick={() =>
                                setSearchTerm("")
                            }
                        >

                            <div className="sb-blog-search-suggestion-content">

                                {blog.category && (
                                    <span className="sb-blog-search-suggestion-category">
                                        {blog.category}
                                    </span>
                                )}

                                <strong>
                                    {blog.title}
                                </strong>

                                {blog.description && (
                                    <small>
                                        {blog.description}
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
                        onClick={handleSearch}
                    >
                        View all search results →
                    </button>
                </>
            ) : (
                <div className="sb-blog-search-no-results">
                    <strong>No blogs found</strong>
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
                                        EXPLORE CATEGORIES
                                    ================================================== */}

                                    <div className="sb-blog-sidebar-block">

                                        <div className="sb-blog-sidebar-heading">

                                            <h3>
                                                Explore Categories
                                            </h3>

                                        </div>


                                        <div className="sb-blog-category-list">

                                            {categories.map(
                                                (category) => {

                                                    const categoryCount =
                                                        category === "All"
                                                            ? blogs.length
                                                            : blogs.filter(
                                                                (blog) =>
                                                                    blog.category ===
                                                                    category
                                                            ).length;

                                                    const active =
                                                        isCategoryActive(
                                                            category
                                                        );

                                                    return (
                                                        <button
                                                            key={category}
                                                            type="button"
                                                            className={`sb-blog-category-item ${
                                                                active
                                                                    ? "active"
                                                                    : ""
                                                            }`}
                                                            onClick={() =>
                                                                handleCategory(
                                                                    category
                                                                )
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
                                                }
                                            )}

                                        </div>

                                    </div>


                                    {/* =================================================
                                        CURRENT BLOG CATEGORY
                                    ================================================== */}

                                    {post.category && (

                                        <div className="sb-blog-sidebar-block sb-blog-current-category">

                                            <div className="sb-blog-sidebar-heading">
                                                <h3>
                                                    Current Topic
                                                </h3>
                                            </div>

                                            <div className="sb-blog-current-category-content">
                                                <span>
                                                    You're reading
                                                </span>

                                                <strong>
                                                    {post.category}
                                                </strong>
                                            </div>

                                            <button
                                                type="button"
                                                className="sb-blog-sidebar-clear"
                                                onClick={() =>
                                                    handleCategory(post.category)
                                                }
                                            >
                                                View All{" "}
                                                {post.category} Blogs
                                            </button>

                                        </div>

                                    )}


                                    {/* =================================================
                                        RELEVANT BLOGS
                                    ================================================== */}

                                    {relatedBlogs.length > 0 && (

                                        <div className="sb-blog-sidebar-block">

                                            <div className="sb-blog-sidebar-heading">

                                                <h3>
                                                    Relevant Blogs
                                                </h3>

                                            </div>


                                            <div className="sb-related-blog-list">

                                                {relatedBlogs.map(
                                                    (relatedBlog) => (

                                                        <Link
                                                            key={
                                                                relatedBlog.id
                                                            }
                                                            href={`/blog/${relatedBlog.slug}`}
                                                            className="sb-related-blog"
                                                        >

                                                            <div className="sb-related-blog-image">

                                                                <img
                                                                    src={
                                                                        relatedBlog.image
                                                                    }
                                                                    alt={
                                                                        relatedBlog.imageAlt?.trim() ||
                                                                        relatedBlog.title
                                                                    }
                                                                />

                                                            </div>


                                                            <div className="sb-related-blog-content">

                                                                {relatedBlog.category && (
                                                                    <span>
                                                                        {
                                                                            relatedBlog.category
                                                                        }
                                                                    </span>
                                                                )}

                                                                <h4>
                                                                    {
                                                                        relatedBlog.title
                                                                    }
                                                                </h4>


                                                            </div>

                                                        </Link>

                                                    )
                                                )}

                                            </div>


                                            <Link
                                                href="/blog"
                                                className="sb-blog-sidebar-view-all"
                                            >
                                                View All Blogs
                                            </Link>

                                        </div>

                                    )}


                                    {/* =================================================
                                        SIDEBAR CTA
                                    ================================================== */}

                                    <div className="sb-blog-sidebar-cta">

                                        <div className="sb-blog-sidebar-cta-icon">
                                            *
                                        </div>

                                        <h3>
                                            Stay Ahead With Better Technology
                                        </h3>

                                        <p>
                                            Explore practical insights,
                                            development strategies, and
                                            technology trends to help your
                                            business make better digital
                                            decisions.
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

            </main>
        </>
    );
}

export default BlogDetails;