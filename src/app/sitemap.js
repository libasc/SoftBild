import { createClient } from "../lib/supabase/server";

const siteUrl = "https://softbild.com";

export default async function sitemap() {
    const supabase = await createClient();

    /*
     * Static website pages
     */
    const routes = [
        "/",
        "/about",
        "/services",
        "/on-demand-resource",
        "/blog",
        "/portfolio",
        "/contact",
        "/hire-developer",
        "/resource-pricing",
    ];

    /*
     * Get only published blogs from the CMS.
     * Draft blogs will not be included.
     */
    const { data: blogs, error } = await supabase
        .from("blogs")
        .select(`
            slug,
            published_at,
            updated_at
        `)
        .eq("status", "published")
        .order("published_at", {
            ascending: false,
        });

    if (error) {
        console.error(
            "Sitemap blog query error:",
            error
        );
    }

    /*
     * Existing portfolio URLs.
     * These will be replaced with CMS data
     * when the Portfolio CMS is connected.
     */
    const portfolios = [
        "e-learning-platform",
        "dental-healthcare-imaging-data-systems",
        "sharefarm-digital-agriculture-marketplace",
        "artinals-digital-asset-tokenization-platform",
    ];

    /*
     * Static pages
     */
    const staticRoutes = routes.map((url) => ({
        url: `${siteUrl}${url}`,
        changeFrequency: "monthly",
        priority: url === "/" ? 1 : 0.7,
    }));

    /*
     * Published CMS blogs
     */
    const blogRoutes = (blogs || []).map((blog) => ({
        url: `${siteUrl}/blog/${blog.slug}`,
        lastModified:
            blog.updated_at ||
            blog.published_at ||
            undefined,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    /*
     * Existing portfolio pages
     */
    const portfolioRoutes = portfolios.map((slug) => ({
        url: `${siteUrl}/portfolio/${slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [
        ...staticRoutes,
        ...blogRoutes,
        ...portfolioRoutes,
    ];
}