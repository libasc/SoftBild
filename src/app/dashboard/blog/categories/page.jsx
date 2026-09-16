"use client";

import DashboardLayout from "../../../../dashboard/DashboardLayout";
import BlogCategories from "../../../../dashboard/BlogCategories";

export default function BlogCategoriesPage() {
    return (
        <DashboardLayout
            pageTitle="Blog Categories"
            pageDescription="Create and manage categories for your SoftBild blog posts."
            activeSection="blog"
        >
            <BlogCategories />
        </DashboardLayout>
    );
}