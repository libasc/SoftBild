"use client";

import DashboardLayout from "../../../dashboard/DashboardLayout";
import AddBlog from "../../../dashboard/AddBlog";

export default function AddBlogPage() {
    return (
        <DashboardLayout
            pageTitle="Add Blog"
            pageDescription="Create and publish a new SoftBild blog post."
            activeSection="blog"
        >
            <AddBlog />
        </DashboardLayout>
    );
}