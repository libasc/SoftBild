"use client";

import DashboardLayout from "../../../../../dashboard/DashboardLayout";
import EditBlog from "../../../../../dashboard/EditBlog";

export default function EditBlogPage() {
    return (
        <DashboardLayout
            pageTitle="Edit Blog"
            pageDescription="Update and manage your SoftBild blog post."
            activeSection="blog"
        >
            <EditBlog />
        </DashboardLayout>
    );
}