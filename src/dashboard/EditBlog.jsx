"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import BlogRichTextEditor from "./BlogRichTextEditor";

import { createClient } from "../lib/supabase/client";

import "./add-blog.css";

export default function EditBlog() {
    const router = useRouter();
    const params = useParams();

    const blogId = params?.id;

    const supabase = useMemo(
        () => createClient(),
        []
    );

    const fileInputRef = useRef(null);

    const [categories, setCategories] =
        useState([]);

    const [loadingCategories, setLoadingCategories] =
        useState(true);

    const [loadingBlog, setLoadingBlog] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [uploadingImage, setUploadingImage] =
        useState(false);

    const [imageError, setImageError] =
        useState("");

    const [message, setMessage] = useState({
        type: "",
        text: "",
    });

    const [form, setForm] = useState({
        title: "",
        slug: "",
        category_id: "",
        description: "",
        content: "",
        featured_image_url: "",
        featured_image_alt: "",
        author_name: "",
        status: "draft",
        featured: false,
        seo_title: "",
        seo_description: "",
    });

    const [imagePreview, setImagePreview] =
        useState("");

    /*
     * ---------------------------------------------
     * Load categories
     * ---------------------------------------------
     */

    useEffect(() => {
        const loadCategories = async () => {
            setLoadingCategories(true);

            const { data, error } =
                await supabase
                    .from("blog_categories")
                    .select("id, name, slug")
                    .order("name", {
                        ascending: true,
                    });

            if (error) {
                console.error(
                    "Error loading categories:",
                    error
                );

                setMessage({
                    type: "error",
                    text:
                        "Unable to load blog categories.",
                });
            } else {
                setCategories(data || []);
            }

            setLoadingCategories(false);
        };

        loadCategories();
    }, [supabase]);

    /*
     * ---------------------------------------------
     * Load existing blog
     * ---------------------------------------------
     */

    useEffect(() => {
        if (!blogId) {
            return;
        }

        const loadBlog = async () => {
            setLoadingBlog(true);

            const { data, error } =
                await supabase
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
                        published_at
                    `)
                    .eq("id", blogId)
                    .single();

            if (error) {
                console.error(
                    "Error loading blog:",
                    error
                );

                setMessage({
                    type: "error",
                    text:
                        "Unable to load this blog post.",
                });

                setLoadingBlog(false);
                return;
            }

            if (!data) {
                setMessage({
                    type: "error",
                    text:
                        "The requested blog post could not be found.",
                });

                setLoadingBlog(false);
                return;
            }

            setForm({
                title: data.title || "",
                slug: data.slug || "",
                category_id:
                    data.category_id || "",
                description:
                    data.description || "",
                content: data.content || "",
                featured_image_url:
                    data.featured_image_url || "",
                featured_image_alt:
                    data.featured_image_alt || "",
                author_name:
                    data.author_name || "",
                status:
                    data.status || "draft",
                featured:
                    Boolean(data.featured),
                seo_title:
                    data.seo_title || "",
                seo_description:
                    data.seo_description || "",
            });

            setImagePreview(
                data.featured_image_url || ""
            );

            setLoadingBlog(false);
        };

        loadBlog();
    }, [blogId, supabase]);

    /*
     * ---------------------------------------------
     * Generate slug
     * ---------------------------------------------
     */

    const generateSlug = (value) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    };

    /*
     * ---------------------------------------------
     * Form change
     * ---------------------------------------------
     */

    const handleChange = (event) => {
        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

        setMessage({
            type: "",
            text: "",
        });
    };

    /*
     * ---------------------------------------------
     * Title change
     *
     * Unlike Add Blog, editing the title does
     * NOT automatically overwrite the existing
     * slug.
     *
     * This prevents an accidental URL change.
     * ---------------------------------------------
     */

    const handleTitleChange = (event) => {
        const title = event.target.value;

        setForm((previous) => ({
            ...previous,
            title,
            seo_title:
                previous.seo_title ||
                title,
        }));

        setMessage({
            type: "",
            text: "",
        });
    };

    /*
     * ---------------------------------------------
     * Upload replacement image
     * ---------------------------------------------
     */

    const handleImageUpload = async (event) => {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        setImageError("");

        setMessage({
            type: "",
            text: "",
        });

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
        ];

        if (!allowedTypes.includes(file.type)) {
            setImageError(
                "Only JPG, PNG, WEBP and GIF images are allowed."
            );

            event.target.value = "";

            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setImageError(
                "Image size must be 10 MB or smaller."
            );

            event.target.value = "";

            return;
        }

        const localPreview =
            URL.createObjectURL(file);

        setImagePreview(localPreview);

        setUploadingImage(true);

        try {
            const formData = new FormData();

            formData.append("file", file);

            formData.append(
                "folder",
                "SoftBild/Blog/Featured"
            );

            const response = await fetch(
                "/api/cloudinary/upload",
                {
                    method: "POST",
                    body: formData,
                    credentials: "same-origin",
                }
            );

            const result =
                await response.json();

            if (
                !response.ok ||
                !result.success
            ) {
                throw new Error(
                    result.message ||
                        "Image upload failed."
                );
            }

            setForm((previous) => ({
                ...previous,
                featured_image_url:
                    result.image.url,
            }));

            setImagePreview(
                result.image.url
            );

            setMessage({
                type: "success",
                text:
                    "Featured image uploaded successfully.",
            });
        } catch (error) {
            console.error(
                "Image upload error:",
                error
            );

            setImagePreview(
                form.featured_image_url || ""
            );

            setForm((previous) => ({
                ...previous,
                featured_image_url:
                    previous.featured_image_url,
            }));

            setImageError(
                error.message ||
                    "Unable to upload the image."
            );
        } finally {
            setUploadingImage(false);

            URL.revokeObjectURL(
                localPreview
            );
        }
    };

    /*
     * ---------------------------------------------
     * Remove image
     *
     * This removes the image URL from the blog
     * record when the changes are saved.
     *
     * Cloudinary cleanup can be added later.
     * ---------------------------------------------
     */

    const removeImage = () => {
        setImagePreview("");

        setForm((previous) => ({
            ...previous,
            featured_image_url: "",
            featured_image_alt: "",
        }));

        setImageError("");

        setMessage({
            type: "",
            text: "",
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    /*
     * ---------------------------------------------
     * Validation
     * ---------------------------------------------
     */

    const validateForm = () => {
        if (!form.title.trim()) {
            return "Please enter a blog title.";
        }

        if (!form.slug.trim()) {
            return "Please enter a blog slug.";
        }

        if (!form.category_id) {
            return "Please select a blog category.";
        }

        if (!form.description.trim()) {
            return "Please enter a short description.";
        }

        if (!form.content.trim()) {
            return "Please enter the blog content.";
        }

        if (!form.author_name.trim()) {
            return "Please enter the author name.";
        }

        if (
            form.status === "published" &&
            !form.featured_image_url
        ) {
            return "Please upload a featured image before publishing.";
        }

        if (
            form.status === "published" &&
            form.featured_image_url &&
            !form.featured_image_alt.trim()
        ) {
            return "Please enter alt text for the featured image before publishing.";
        }

        return "";
    };

    /*
     * ---------------------------------------------
     * Save changes
     * ---------------------------------------------
     */

    const saveBlog = async (
        requestedStatus
    ) => {
        setMessage({
            type: "",
            text: "",
        });

        const validationError =
            validateForm();

        if (validationError) {
            setMessage({
                type: "error",
                text: validationError,
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }

        if (!blogId) {
            setMessage({
                type: "error",
                text:
                    "Blog ID is missing.",
            });

            return;
        }

        setSaving(true);

        try {
            const finalStatus =
                requestedStatus ||
                form.status;

            const isPublished =
                finalStatus === "published";

            /*
             * Get the current published_at value
             * so an already-published blog keeps
             * its original publication date.
             */
            const { data: existingBlog } =
                await supabase
                    .from("blogs")
                    .select("published_at")
                    .eq("id", blogId)
                    .single();

            let publishedAt = null;

            if (isPublished) {
                publishedAt =
                    existingBlog?.published_at ||
                    new Date().toISOString();
            }

            const payload = {
                title: form.title.trim(),

                slug: form.slug.trim(),

                category_id:
                    form.category_id || null,

                description:
                    form.description.trim(),

                content:
                    form.content.trim(),

                featured_image_url:
                    form.featured_image_url ||
                    null,

                featured_image_alt:
                    form.featured_image_alt.trim() ||
                    null,

                author_name:
                    form.author_name.trim() ||
                    null,

                status: finalStatus,

                featured: Boolean(
                    form.featured
                ),

                seo_title:
                    form.seo_title.trim() ||
                    null,

                seo_description:
                    form.seo_description.trim() ||
                    null,

                published_at:
                    publishedAt,
            };

            const { error } =
                await supabase
                    .from("blogs")
                    .update(payload)
                    .eq("id", blogId);

            if (error) {
                console.error(
                    "Error updating blog:",
                    error
                );

                if (
                    error.code ===
                    "23505"
                ) {
                    throw new Error(
                        "A blog with this slug already exists. Please use a different slug."
                    );
                }

                throw new Error(
                    error.message ||
                        "Unable to update the blog."
                );
            }

            setMessage({
                type: "success",
                text: isPublished
                    ? "Blog updated and published successfully."
                    : "Blog updated and saved as draft successfully.",
            });

            setTimeout(() => {
                router.push(
                    "/dashboard/blog"
                );
            }, 900);
        } catch (error) {
            console.error(
                "Update blog error:",
                error
            );

            setMessage({
                type: "error",
                text:
                    error.message ||
                    "Something went wrong while updating the blog.",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } finally {
            setSaving(false);
        }
    };

    /*
     * ---------------------------------------------
     * Loading state
     * ---------------------------------------------
     */

    if (loadingBlog) {
        return (
            <div className="sb-add-blog-page">
                <div className="sb-add-blog-loading">
                    <div className="sb-add-blog-spinner" />

                    <span>
                        Loading blog...
                    </span>
                </div>
            </div>
        );
    }

    /*
     * ---------------------------------------------
     * Render
     * ---------------------------------------------
     */

    return (
        <div className="sb-add-blog-page">

            {/* -----------------------------------------
                TOP BACK BUTTON
            ------------------------------------------ */}

            <button
                type="button"
                className="sb-add-blog-back"
                onClick={() =>
                    router.push(
                        "/dashboard/blog"
                    )
                }
            >
                <ArrowBackIcon />
                Back to Blogs
            </button>

            {/* -----------------------------------------
                MESSAGE
            ------------------------------------------ */}

            {message.text && (
                <div
                    className={`sb-add-blog-message ${message.type}`}
                >
                    <span>
                        {message.text}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            setMessage({
                                type: "",
                                text: "",
                            })
                        }
                    >
                        <CloseIcon />
                    </button>
                </div>
            )}

            <div className="sb-add-blog-grid">

                {/* =====================================
                    MAIN COLUMN
                ====================================== */}

                <div className="sb-add-blog-main">

                    {/* ---------------------------------
                        BASIC INFORMATION
                    ---------------------------------- */}

                    <section className="sb-add-blog-card">

                        <div className="sb-add-blog-card-header">

                            <div>
                                <span className="sb-add-blog-section-label">
                                    BLOG INFORMATION
                                </span>

                                <h2>
                                    Edit Blog
                                </h2>

                                <p>
                                    Update the information
                                    for your blog post.
                                </p>
                            </div>

                            <div className="sb-add-blog-section-icon">
                                <AutoAwesomeOutlinedIcon />
                            </div>

                        </div>

                        <div className="sb-add-blog-form">

                            {/* TITLE */}

                            <div className="sb-add-blog-field full">

                                <label>
                                    Blog Title
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={
                                        form.title
                                    }
                                    onChange={
                                        handleTitleChange
                                    }
                                    placeholder="Enter your blog title"
                                />

                            </div>

                            {/* SLUG */}

                            <div className="sb-add-blog-field">

                                <label>
                                    Slug
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="slug"
                                    value={
                                        form.slug
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="your-blog-slug"
                                />

                                <small>
                                    Used in the blog URL.
                                    Changing this will
                                    change the blog URL.
                                </small>

                            </div>

                            {/* CATEGORY */}

                            <div className="sb-add-blog-field">

                                <label>
                                    Category
                                    <span>*</span>
                                </label>

                                <select
                                    name="category_id"
                                    value={
                                        form.category_id
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        loadingCategories
                                    }
                                >

                                    <option value="">
                                        {loadingCategories
                                            ? "Loading categories..."
                                            : "Select category"}
                                    </option>

                                    {categories.map(
                                        (
                                            category
                                        ) => (
                                            <option
                                                key={
                                                    category.id
                                                }
                                                value={
                                                    category.id
                                                }
                                            >
                                                {
                                                    category.name
                                                }
                                            </option>
                                        )
                                    )}

                                </select>

                                {!loadingCategories &&
                                    categories.length ===
                                        0 && (
                                        <small className="sb-add-blog-warning">
                                            No categories
                                            available.
                                            Create a category
                                            first.
                                        </small>
                                    )}

                            </div>

                            {/* DESCRIPTION */}

                            <div className="sb-add-blog-field full">

                                <label>
                                    Short Description
                                    <span>*</span>
                                </label>

                                <textarea
                                    name="description"
                                    value={
                                        form.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    rows="4"
                                    placeholder="Write a short description that will appear on your blog listing..."
                                />

                                <small>
                                    Keep this concise and
                                    useful for readers.
                                </small>

                            </div>

                            {/* CONTENT */}

                            <div className="sb-add-blog-field full">

                                <label>
                                    Blog Content
                                    <span>*</span>
                                </label>

                               <BlogRichTextEditor
                                    value={form.content}
                                    onChange={(value) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            content: value,
                                        }))
                                    }
                                    placeholder="Write your blog content here..."
                                />

                                <small>
                                    Your existing
                                    `content` database
                                    field is used for
                                    this content.
                                </small>

                            </div>

                        </div>

                    </section>

                    {/* ---------------------------------
                        SEO
                    ---------------------------------- */}

                    <section className="sb-add-blog-card">

                        <div className="sb-add-blog-card-header">

                            <div>
                                <span className="sb-add-blog-section-label">
                                    SEARCH ENGINE OPTIMIZATION
                                </span>

                                <h2>
                                    SEO Settings
                                </h2>

                                <p>
                                    Optional metadata for
                                    search engines.
                                </p>
                            </div>

                        </div>

                        <div className="sb-add-blog-form">

                            {/* SEO TITLE */}

                            <div className="sb-add-blog-field full">

                                <label>
                                    SEO Title
                                </label>

                                <input
                                    type="text"
                                    name="seo_title"
                                    value={
                                        form.seo_title
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="SEO title"
                                    maxLength={70}
                                />

                                <small>
                                    Recommended: around
                                    50–60 characters.
                                </small>

                            </div>

                            {/* SEO DESCRIPTION */}

                            <div className="sb-add-blog-field full">

                                <label>
                                    SEO Description
                                </label>

                                <textarea
                                    name="seo_description"
                                    value={
                                        form.seo_description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    rows="4"
                                    maxLength={160}
                                    placeholder="Write a short search engine description..."
                                />

                                <small>
                                    Recommended: around
                                    150–160 characters.
                                </small>

                            </div>

                        </div>

                    </section>

                </div>

                {/* =====================================
                    SIDEBAR
                ====================================== */}

                <aside className="sb-add-blog-sidebar">

                    {/* ---------------------------------
                        FEATURED IMAGE
                    ---------------------------------- */}

                    <section className="sb-add-blog-card">

                        <div className="sb-add-blog-card-header compact">

                            <div>
                                <span className="sb-add-blog-section-label">
                                    FEATURED IMAGE
                                </span>

                                <h2>
                                    Blog Image
                                </h2>
                            </div>

                        </div>

                        <div className="sb-add-blog-image-upload">

                            {imagePreview ||
                            form.featured_image_url ? (
                                <div className="sb-add-blog-image-preview">

                                    <img
                                        src={
                                            imagePreview ||
                                            form.featured_image_url
                                        }
                                        alt="Blog featured image"
                                    />

                                    <div className="sb-add-blog-image-overlay">

                                        <button
                                            type="button"
                                            onClick={
                                                removeImage
                                            }
                                            disabled={
                                                uploadingImage
                                            }
                                        >
                                            <DeleteOutlineIcon />
                                            Remove
                                        </button>

                                    </div>

                                    {uploadingImage && (
                                        <div className="sb-add-blog-image-uploading">

                                            <div className="sb-add-blog-spinner" />

                                            Uploading...

                                        </div>
                                    )}

                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="sb-add-blog-upload-box"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    disabled={
                                        uploadingImage
                                    }
                                >

                                    <div className="sb-add-blog-upload-icon">
                                        <CloudUploadOutlinedIcon />
                                    </div>

                                    <strong>
                                        Upload featured
                                        image
                                    </strong>

                                    <span>
                                        JPG, PNG, WEBP or
                                        GIF
                                    </span>

                                    <small>
                                        Maximum 10 MB
                                    </small>

                                </button>
                            )}

                            <input
                                ref={
                                    fileInputRef
                                }
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                onChange={
                                    handleImageUpload
                                }
                                hidden
                            />

                        </div>

                        {imageError && (
                            <div className="sb-add-blog-image-error">
                                {imageError}
                            </div>
                        )}

                        <div className="sb-add-blog-field sb-add-blog-image-alt-field">
                            <label>
                                Image Alt Text
                                {form.featured_image_url && <span>*</span>}
                            </label>

                            <input
                                type="text"
                                name="featured_image_alt"
                                value={form.featured_image_alt}
                                onChange={handleChange}
                                placeholder="Describe the featured image"
                                maxLength={125}
                            />

                            <small>
                                Describe what the image shows for accessibility and SEO.
                            </small>
                        </div>

                        <div className="sb-add-blog-cloudinary-note">

                            <ImageOutlinedIcon />

                            <span>
                                Images are securely
                                stored in Cloudinary.
                            </span>

                        </div>

                    </section>

                    {/* ---------------------------------
                        PUBLISHING
                    ---------------------------------- */}

                    <section className="sb-add-blog-card">

                        <div className="sb-add-blog-card-header compact">

                            <div>
                                <span className="sb-add-blog-section-label">
                                    PUBLISHING
                                </span>

                                <h2>
                                    Post Settings
                                </h2>
                            </div>

                        </div>

                        <div className="sb-add-blog-publishing">

                            {/* AUTHOR */}

                            <div className="sb-add-blog-field">

                                <label>
                                    Author Name
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="author_name"
                                    value={
                                        form.author_name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter author name"
                                />

                            </div>

                            {/* STATUS */}

                            <div className="sb-add-blog-field">

                                <label>
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={
                                        form.status
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="draft">
                                        Draft
                                    </option>

                                    <option value="published">
                                        Published
                                    </option>

                                </select>

                            </div>

                            {/* FEATURED */}

                            <label className="sb-add-blog-checkbox">

                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={
                                        form.featured
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <span>

                                    <strong>
                                        Featured Post
                                    </strong>

                                    <small>
                                        Show this post as
                                        featured on the
                                        website.
                                    </small>

                                </span>

                            </label>

                        </div>

                    </section>

                    {/* ---------------------------------
                        ACTIONS
                    ---------------------------------- */}

                    <div className="sb-add-blog-actions">

                        <button
                            type="button"
                            className="sb-add-blog-cancel"
                            disabled={
                                saving
                            }
                            onClick={() =>
                                router.push(
                                    "/dashboard/blog"
                                )
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="sb-add-blog-draft"
                            disabled={
                                saving ||
                                uploadingImage
                            }
                            onClick={() =>
                                saveBlog("draft")
                            }
                        >
                            <SaveOutlinedIcon />

                            {saving
                                ? "Saving..."
                                : "Save Draft"}
                        </button>

                        <button
                            type="button"
                            className="sb-add-blog-publish"
                            disabled={
                                saving ||
                                uploadingImage
                            }
                            onClick={() =>
                                saveBlog(
                                    "published"
                                )
                            }
                        >
                            <PublishOutlinedIcon />

                            {saving
                                ? "Publishing..."
                                : "Publish"}
                        </button>

                    </div>

                </aside>

            </div>

        </div>
    );
}