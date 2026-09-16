"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { createClient } from "../lib/supabase/client";

import "./blog-categories.css";

export default function BlogCategories() {
    const router = useRouter();

    const supabase = useMemo(
        () => createClient(),
        []
    );

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [modalOpen, setModalOpen] =
        useState(false);

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    const [editingCategory, setEditingCategory] =
        useState(null);

    const [categoryToDelete, setCategoryToDelete] =
        useState(null);

    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [message, setMessage] = useState({
        type: "",
        text: "",
    });

    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
    });

    /*
     * ---------------------------------------------
     * Load categories
     * ---------------------------------------------
     */

    const loadCategories = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("blog_categories")
            .select(`
                id,
                name,
                slug,
                description,
                created_at,
                updated_at
            `)
            .order("name", {
                ascending: true,
            });

        if (error) {
            console.error(
                "Error loading blog categories:",
                error
            );

            setMessage({
                type: "error",
                text:
                    "Unable to load blog categories.",
            });

            setCategories([]);
        } else {
            /*
             * Load the number of blogs using
             * each category.
             */
            const categoriesWithCounts =
                await Promise.all(
                    (data || []).map(
                        async (category) => {
                            const { count } =
                                await supabase
                                    .from("blogs")
                                    .select(
                                        "id",
                                        {
                                            count: "exact",
                                            head: true,
                                        }
                                    )
                                    .eq(
                                        "category_id",
                                        category.id
                                    );

                            return {
                                ...category,
                                blogCount:
                                    count || 0,
                            };
                        }
                    )
                );

            setCategories(
                categoriesWithCounts
            );
        }

        setLoading(false);
    };

    useEffect(() => {
        loadCategories();
    }, []);

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
     * Filter categories
     * ---------------------------------------------
     */

    const filteredCategories = useMemo(() => {
        const search =
            searchTerm.trim().toLowerCase();

        if (!search) {
            return categories;
        }

        return categories.filter(
            (category) =>
                category.name
                    ?.toLowerCase()
                    .includes(search) ||
                category.slug
                    ?.toLowerCase()
                    .includes(search) ||
                category.description
                    ?.toLowerCase()
                    .includes(search)
        );
    }, [categories, searchTerm]);

    /*
     * ---------------------------------------------
     * Open Add modal
     * ---------------------------------------------
     */

    const openAddModal = () => {
        setEditingCategory(null);

        setForm({
            name: "",
            slug: "",
            description: "",
        });

        setMessage({
            type: "",
            text: "",
        });

        setModalOpen(true);
    };

    /*
     * ---------------------------------------------
     * Open Edit modal
     * ---------------------------------------------
     */

    const openEditModal = (category) => {
        setEditingCategory(category);

        setForm({
            name: category.name || "",
            slug: category.slug || "",
            description:
                category.description || "",
        });

        setMessage({
            type: "",
            text: "",
        });

        setModalOpen(true);
    };

    /*
     * ---------------------------------------------
     * Close modal
     * ---------------------------------------------
     */

    const closeModal = () => {
        if (saving) return;

        setModalOpen(false);
        setEditingCategory(null);

        setForm({
            name: "",
            slug: "",
            description: "",
        });
    };

    /*
     * ---------------------------------------------
     * Form change
     * ---------------------------------------------
     */

    const handleNameChange = (event) => {
        const name = event.target.value;

        setForm((previous) => ({
            ...previous,
            name,
            slug:
                editingCategory &&
                previous.slug !==
                    generateSlug(
                        previous.name
                    )
                    ? previous.slug
                    : generateSlug(name),
        }));

        setMessage({
            type: "",
            text: "",
        });
    };

    const handleSlugChange = (event) => {
        setForm((previous) => ({
            ...previous,
            slug: generateSlug(
                event.target.value
            ),
        }));

        setMessage({
            type: "",
            text: "",
        });
    };

    const handleDescriptionChange = (
        event
    ) => {
        setForm((previous) => ({
            ...previous,
            description:
                event.target.value,
        }));

        setMessage({
            type: "",
            text: "",
        });
    };

    /*
     * ---------------------------------------------
     * Save category
     * ---------------------------------------------
     */

    const saveCategory = async (event) => {
        event.preventDefault();

        const name = form.name.trim();
        const slug = form.slug.trim();
        const description =
            form.description.trim();

        if (!name) {
            setMessage({
                type: "error",
                text:
                    "Please enter a category name.",
            });

            return;
        }

        if (!slug) {
            setMessage({
                type: "error",
                text:
                    "Please enter a category slug.",
            });

            return;
        }

        setSaving(true);

        try {
            const payload = {
                name,
                slug,
                description: description || null,
            };

            if (editingCategory) {
                const { error } =
                    await supabase
                        .from(
                            "blog_categories"
                        )
                        .update(payload)
                        .eq(
                            "id",
                            editingCategory.id
                        );

                if (error) {
                    console.error(
                        "Error updating category:",
                        error
                    );

                    if (
                        error.code ===
                        "23505"
                    ) {
                        throw new Error(
                            "A category with this slug already exists."
                        );
                    }

                    throw new Error(
                        error.message ||
                            "Unable to update the category."
                    );
                }

                setMessage({
                    type: "success",
                    text:
                        "Category updated successfully.",
                });
            } else {
                const { error } =
                    await supabase
                        .from(
                            "blog_categories"
                        )
                        .insert(payload);

                if (error) {
                    console.error(
                        "Error creating category:",
                        error
                    );

                    if (
                        error.code ===
                        "23505"
                    ) {
                        throw new Error(
                            "A category with this slug already exists."
                        );
                    }

                    throw new Error(
                        error.message ||
                            "Unable to create the category."
                    );
                }

                setMessage({
                    type: "success",
                    text:
                        "Category created successfully.",
                });
            }

            await loadCategories();

            setTimeout(() => {
                setModalOpen(false);
                setEditingCategory(null);

                setForm({
                    name: "",
                    slug: "",
                    description: "",
                });

                setMessage({
                    type: "",
                    text: "",
                });
            }, 700);
        } catch (error) {
            console.error(
                "Save category error:",
                error
            );

            setMessage({
                type: "error",
                text:
                    error.message ||
                    "Something went wrong.",
            });
        } finally {
            setSaving(false);
        }
    };

    /*
     * ---------------------------------------------
     * Open delete confirmation
     * ---------------------------------------------
     */

    const openDeleteModal = (category) => {
        setCategoryToDelete(category);
        setDeleteModalOpen(true);
    };

    /*
     * ---------------------------------------------
     * Delete category
     * ---------------------------------------------
     */

    const deleteCategory = async () => {
        if (!categoryToDelete) return;

        setDeleting(true);

        try {
            /*
             * Don't allow deleting a category
             * that is currently being used by blogs.
             */
            if (
                categoryToDelete.blogCount > 0
            ) {
                throw new Error(
                    `This category is used by ${categoryToDelete.blogCount} blog${
                        categoryToDelete.blogCount ===
                        1
                            ? ""
                            : "s"
                    }. Please move those blogs to another category before deleting it.`
                );
            }

            const { error } =
                await supabase
                    .from("blog_categories")
                    .delete()
                    .eq(
                        "id",
                        categoryToDelete.id
                    );

            if (error) {
                console.error(
                    "Error deleting category:",
                    error
                );

                throw new Error(
                    error.message ||
                        "Unable to delete the category."
                );
            }

            setDeleteModalOpen(false);
            setCategoryToDelete(null);

            setMessage({
                type: "success",
                text:
                    "Category deleted successfully.",
            });

            await loadCategories();
        } catch (error) {
            console.error(
                "Delete category error:",
                error
            );

            setDeleteModalOpen(false);
            setCategoryToDelete(null);

            setMessage({
                type: "error",
                text:
                    error.message ||
                    "Unable to delete the category.",
            });
        } finally {
            setDeleting(false);
        }
    };

    /*
     * ---------------------------------------------
     * Render
     * ---------------------------------------------
     */

    return (
        <div className="sb-blog-categories">
            {/* TOP BAR */}

            <div className="sb-blog-categories-top">
                <button
                    type="button"
                    className="sb-blog-categories-back"
                    onClick={() =>
                        router.push(
                            "/dashboard/blog"
                        )
                    }
                >
                    <ArrowBackIcon />
                    Back to Blogs
                </button>

                <button
                    type="button"
                    className="sb-blog-categories-add"
                    onClick={openAddModal}
                >
                    <AddOutlinedIcon />
                    Add Category
                </button>
            </div>

            {/* MESSAGE */}

            {message.text && (
                <div
                    className={`sb-blog-category-message ${message.type}`}
                >
                    <div>
                        {message.type ===
                            "success" && (
                            <CheckCircleOutlineIcon />
                        )}

                        <span>
                            {message.text}
                        </span>
                    </div>

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

            {/* HEADER CARD */}

            <section className="sb-blog-category-card">
                <div className="sb-blog-category-card-header">
                    <div>
                        <span className="sb-blog-category-label">
                            BLOG MANAGEMENT
                        </span>

                        <h2>
                            Blog Categories
                        </h2>

                        <p>
                            Organize your blog
                            posts with
                            categories that
                            match your content.
                        </p>
                    </div>

                    <div className="sb-blog-category-icon">
                        <CategoryOutlinedIcon />
                    </div>
                </div>

                {/* SEARCH */}

                <div className="sb-blog-category-toolbar">
                    <div className="sb-blog-category-search">
                        <SearchOutlinedIcon />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target
                                        .value
                                )
                            }
                            placeholder="Search categories..."
                        />

                        {searchTerm && (
                            <button
                                type="button"
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

                    <div className="sb-blog-category-count">
                        {filteredCategories.length}{" "}
                        {filteredCategories.length ===
                        1
                            ? "category"
                            : "categories"}
                    </div>
                </div>

                {/* TABLE */}

                <div className="sb-blog-category-table-wrap">
                    {loading ? (
                        <div className="sb-blog-category-loading">
                            <div className="sb-blog-category-spinner" />
                            Loading categories...
                        </div>
                    ) : filteredCategories.length ===
                      0 ? (
                        <div className="sb-blog-category-empty">
                            <div className="sb-blog-category-empty-icon">
                                <CategoryOutlinedIcon />
                            </div>

                            <h3>
                                {searchTerm
                                    ? "No categories found"
                                    : "No categories yet"}
                            </h3>

                            <p>
                                {searchTerm
                                    ? "Try a different search term."
                                    : "Create your first blog category to get started."}
                            </p>

                            {!searchTerm && (
                                <button
                                    type="button"
                                    onClick={
                                        openAddModal
                                    }
                                >
                                    <AddOutlinedIcon />
                                    Create Category
                                </button>
                            )}
                        </div>
                    ) : (
                        <table className="sb-blog-category-table">
                            <thead>
                                <tr>
                                    <th>
                                        Category
                                    </th>

                                    <th>
                                        Slug
                                    </th>

                                    <th>
                                        Description
                                    </th>

                                    <th>
                                        Blogs
                                    </th>

                                    <th>
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredCategories.map(
                                    (
                                        category
                                    ) => (
                                        <tr
                                            key={
                                                category.id
                                            }
                                        >
                                            <td>
                                                <div className="sb-blog-category-name">
                                                    <div className="sb-blog-category-row-icon">
                                                        <CategoryOutlinedIcon />
                                                    </div>

                                                    <strong>
                                                        {
                                                            category.name
                                                        }
                                                    </strong>
                                                </div>
                                            </td>

                                            <td>
                                                <span className="sb-blog-category-slug">
                                                    /
                                                    {
                                                        category.slug
                                                    }
                                                </span>
                                            </td>

                                            <td>
                                                <span className="sb-blog-category-description">
                                                    {category.description ||
                                                        "—"}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="sb-blog-category-blog-count">
                                                    {
                                                        category.blogCount
                                                    }
                                                </span>
                                            </td>

                                            <td>
                                                <div className="sb-blog-category-actions">
                                                    <button
                                                        type="button"
                                                        className="edit"
                                                        onClick={() =>
                                                            openEditModal(
                                                                category
                                                            )
                                                        }
                                                        title="Edit category"
                                                    >
                                                        <EditOutlinedIcon />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="delete"
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                category
                                                            )
                                                        }
                                                        title="Delete category"
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
            </section>

            {/* ADD / EDIT MODAL */}

            {modalOpen && (
                <div className="sb-blog-category-modal-backdrop">
                    <div className="sb-blog-category-modal">
                        <div className="sb-blog-category-modal-header">
                            <div>
                                <span className="sb-blog-category-label">
                                    {editingCategory
                                        ? "EDIT CATEGORY"
                                        : "NEW CATEGORY"}
                                </span>

                                <h2>
                                    {editingCategory
                                        ? "Edit Category"
                                        : "Create Category"}
                                </h2>

                                <p>
                                    {editingCategory
                                        ? "Update the category information below."
                                        : "Add a new category for your blog posts."}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    closeModal
                                }
                                disabled={saving}
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        <form
                            className="sb-blog-category-form"
                            onSubmit={
                                saveCategory
                            }
                        >
                            <div className="sb-blog-category-field">
                                <label>
                                    Category Name
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    value={
                                        form.name
                                    }
                                    onChange={
                                        handleNameChange
                                    }
                                    placeholder="e.g. Artificial Intelligence"
                                    autoFocus
                                />
                            </div>

                            <div className="sb-blog-category-field">
                                <label>
                                    Slug
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    value={
                                        form.slug
                                    }
                                    onChange={
                                        handleSlugChange
                                    }
                                    placeholder="artificial-intelligence"
                                />

                                <small>
                                    Used in the
                                    category URL.
                                </small>
                            </div>

                            <div className="sb-blog-category-field">
                                <label>
                                    Description
                                </label>

                                <textarea
                                    value={
                                        form.description
                                    }
                                    onChange={
                                        handleDescriptionChange
                                    }
                                    rows="4"
                                    placeholder="Briefly describe this category..."
                                />
                            </div>

                            {message.text && (
                                <div
                                    className={`sb-blog-category-modal-message ${message.type}`}
                                >
                                    {message.text}
                                </div>
                            )}

                            <div className="sb-blog-category-modal-actions">
                                <button
                                    type="button"
                                    className="cancel"
                                    onClick={
                                        closeModal
                                    }
                                    disabled={
                                        saving
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="save"
                                    disabled={
                                        saving
                                    }
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingCategory
                                        ? "Update Category"
                                        : "Create Category"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DELETE MODAL */}

            {deleteModalOpen &&
                categoryToDelete && (
                    <div className="sb-blog-category-modal-backdrop">
                        <div className="sb-blog-category-delete-modal">
                            <div className="sb-blog-category-delete-icon">
                                <DeleteOutlineIcon />
                            </div>

                            <h2>
                                Delete Category?
                            </h2>

                            <p>
                                Are you sure you
                                want to delete{" "}
                                <strong>
                                    "
                                    {
                                        categoryToDelete.name
                                    }
                                    "
                                </strong>
                                ?
                            </p>

                            {categoryToDelete.blogCount >
                                0 && (
                                <div className="sb-blog-category-delete-warning">
                                    This category is
                                    currently used by{" "}
                                    <strong>
                                        {
                                            categoryToDelete.blogCount
                                        }{" "}
                                        blog
                                        {categoryToDelete.blogCount ===
                                        1
                                            ? ""
                                            : "s"}
                                    </strong>
                                    .
                                </div>
                            )}

                            <div className="sb-blog-category-delete-actions">
                                <button
                                    type="button"
                                    className="cancel"
                                    onClick={() => {
                                        setDeleteModalOpen(
                                            false
                                        );
                                        setCategoryToDelete(
                                            null
                                        );
                                    }}
                                    disabled={
                                        deleting
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="delete"
                                    onClick={
                                        deleteCategory
                                    }
                                    disabled={
                                        deleting ||
                                        categoryToDelete.blogCount >
                                            0
                                    }
                                >
                                    {deleting
                                        ? "Deleting..."
                                        : "Delete Category"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}