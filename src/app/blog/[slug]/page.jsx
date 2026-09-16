import { Suspense } from "react";
import BlogDetails from "../../../components/app-components/blog/BlogDetails";
import { createClient } from "../../../lib/supabase/server";

export const dynamic = "force-dynamic";

/*
 * Generate dynamic SEO metadata for each published CMS blog.
 */
export async function generateMetadata({ params }) {
    const { slug } = await params;

    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from("blogs")
        .select(`
            id,
            title,
            slug,
            description,
            featured_image_url,
            author_name,
            published_at,
            updated_at,
            blog_categories (
                id,
                name,
                slug
            )
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

    /*
     * Blog not found
     */
    if (error || !post) {
        return {
            title: "Blog Not Found",
            description:
                "The requested blog article could not be found.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const canonicalUrl =
        `https://softbild.com/blog/${post.slug}`;

    const description =
        post.description ||
        "Read the latest insights and articles from SoftBild.";

    const metadata = {
        /*
         * Do not add "| SoftBild" here.
         * layout.jsx already has:
         * template: "%s | SoftBild"
         */
        title: post.title,

        description,

        /*
         * Canonical URL
         */
        alternates: {
            canonical: canonicalUrl,
        },

        /*
         * Search engine indexing
         */
        robots: {
            index: true,
            follow: true,
        },

        /*
         * Open Graph
         */
        openGraph: {
            title: post.title,
            description,
            url: canonicalUrl,
            siteName: "SoftBild",
            type: "article",
        },

        /*
         * Twitter / X
         */
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description,
        },
    };

    /*
     * CMS featured image
     * for social sharing.
     */
    if (post.featured_image_url) {
        metadata.openGraph.images = [
            {
                url: post.featured_image_url,
                alt: post.title,
            },
        ];

        metadata.twitter.images = [
            post.featured_image_url,
        ];
    }

    /*
     * Published date
     */
    if (post.published_at) {
        metadata.openGraph.publishedTime =
            post.published_at;
    }

    /*
     * Author
     */
    if (post.author_name) {
        metadata.openGraph.authors = [
            post.author_name,
        ];
    }

    /*
     * Blog category
     */
    if (post.blog_categories?.name) {
        metadata.openGraph.section =
            post.blog_categories.name;
    }

    return metadata;
}

/*
 * Generate Article JSON-LD structured data
 * for the current published CMS blog.
 */
async function ArticleSchema({ slug }) {
    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from("blogs")
        .select(`
            id,
            title,
            slug,
            description,
            featured_image_url,
            author_name,
            published_at,
            updated_at,
            blog_categories (
                id,
                name,
                slug
            )
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

    /*
     * Do not output structured data
     * if the blog does not exist.
     */
    if (error || !post) {
        return null;
    }

    const canonicalUrl =
        `https://softbild.com/blog/${post.slug}`;

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",

        headline: post.title,

        description:
            post.description ||
            "Read the latest insights and articles from SoftBild.",

        url: canonicalUrl,

        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
        },

        publisher: {
            "@type": "Organization",
            name: "SoftBild",
            url: "https://softbild.com",
        },

        author: {
            "@type": post.author_name
                ? "Person"
                : "Organization",
            name: post.author_name || "SoftBild",
        },
    };

    /*
     * Featured image
     */
    if (post.featured_image_url) {
        articleSchema.image = [
            post.featured_image_url,
        ];
    }

    /*
     * Published date
     */
    if (post.published_at) {
        articleSchema.datePublished =
            post.published_at;
    }

    /*
     * Last modified date
     */
    if (post.updated_at) {
        articleSchema.dateModified =
            post.updated_at;
    } else if (post.published_at) {
        articleSchema.dateModified =
            post.published_at;
    }

    /*
     * Blog category
     */
    if (post.blog_categories?.name) {
        articleSchema.articleSection =
            post.blog_categories.name;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(articleSchema)
                    .replace(/</g, "\\u003c")
                    .replace(/>/g, "\\u003e")
                    .replace(/&/g, "\\u0026"),
            }}
        />
    );
}

/*
 * Generate BreadcrumbList JSON-LD.
 *
 * The visible page already has:
 * Home → Blog → Category → Article
 *
 * Since the category is currently only a filter
 * and does not have its own dedicated URL,
 * the structured-data hierarchy uses:
 *
 * Home → Blog → Article
 */
async function BreadcrumbSchema({ slug }) {
    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from("blogs")
        .select(`
            title,
            slug
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

    /*
     * Do not output breadcrumb schema
     * if the blog does not exist.
     */
    if (error || !post) {
        return null;
    }

    const canonicalUrl =
        `https://softbild.com/blog/${post.slug}`;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",

        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://softbild.com/",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://softbild.com/blog",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: canonicalUrl,
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(breadcrumbSchema)
                    .replace(/</g, "\\u003c")
                    .replace(/>/g, "\\u003e")
                    .replace(/&/g, "\\u0026"),
            }}
        />
    );
}

export default async function Page({ params }) {
    const { slug } = await params;

    return (
        <>
            <ArticleSchema slug={slug} />

            <BreadcrumbSchema slug={slug} />

            <Suspense fallback={null}>
                <BlogDetails />
            </Suspense>
        </>
    );
}