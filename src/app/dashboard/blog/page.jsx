"use client";

import DashboardLayout from "../../../dashboard/DashboardLayout";
import Blog from "../../../dashboard/Blog";

export default function BlogPage() {
    return (
        <DashboardLayout
            pageTitle="All Blogs"
            pageDescription="Manage your SoftBild blog posts, categories and publishing status."
            activeSection="blog"
        >
            <Blog />
        </DashboardLayout>
    );
}

