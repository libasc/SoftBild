import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import HomeCta from "../../components/app-components/HomeCta";
import ResourceHeroSection from "../../components/app-components/ResourceHeroSection";
import arrowIcon from "../../assets/icons/arrow-right1.svg";
import "./ResourcePricing.css";

function ResourcePricing() {

    const developerPricing = [
        {
            number: "01",
            label: "ENTRY LEVEL",
            title: "Junior Developer",
            experience: "1–2 Years Experience",
            price: "12",
            range: "$12–$20/hr",
            features: [
                "Frontend & Backend Development",
                "Website Development",
                "API Integration",
                "Bug Fixing & Maintenance",
            ],
        },
        {
            number: "02",
            label: "PROFESSIONAL",
            title: "Mid-Level Developer",
            experience: "2–5 Years Experience",
            price: "20",
            range: "$20–$30/hr",
            features: [
                "Web & Mobile Applications",
                "API & Database Development",
                "Third-Party Integrations",
                "Application Maintenance",
            ],
        },
        {
            number: "03",
            label: "EXPERT",
            title: "Senior Developer",
            experience: "5+ Years Experience",
            price: "30",
            range: "$30–$45/hr",
            popular: true,
            features: [
                "Advanced Software Development",
                "System Architecture",
                "Technical Leadership",
                "Performance & Scalability",
            ],
        },
        {
            number: "04",
            label: "FULL PRODUCT",
            title: "Full-Stack Developer",
            experience: "4+ Years Experience",
            price: "25",
            range: "$25–$40/hr",
            features: [
                "Frontend & Backend Development",
                "Database & API Development",
                "Cloud & Deployment",
                "End-to-End Product Development",
            ],
        },
    ];

    const technologyPricing = [
        {
            icon: "</>",
            title: "Software Development",
            subtitle: "Web & Custom Software",
            description:
                "React.js, Next.js, Node.js, PHP, Laravel, Python, Java and .NET.",
            price: "$15/hr",
        },
        {
            icon: "▣",
            title: "Mobile App Development",
            subtitle: "iOS, Android & Cross Platform",
            description:
                "React Native, Flutter, Android, iOS and cross-platform applications.",
            price: "$18/hr",
        },
        {
            icon: "AI",
            title: "AI & Machine Learning",
            subtitle: "Intelligent Digital Solutions",
            description:
                "Python, Machine Learning, Generative AI, LLM, NLP and Computer Vision.",
            price: "$25/hr",
        },
        {
            icon: "◇",
            title: "Blockchain & Web3",
            subtitle: "Decentralized Solutions",
            description:
                "Smart Contracts, Solidity, DApps, Web3 and blockchain-based applications.",
            price: "$25/hr",
        },
        {
            icon: "✦",
            title: "UI/UX Design",
            subtitle: "Product & Experience Design",
            description:
                "Figma, wireframes, prototypes, design systems and product design.",
            price: "$15/hr",
        },
        {
            icon: "☁",
            title: "Cloud & DevOps",
            subtitle: "Infrastructure & Deployment",
            description:
                "AWS, Azure, Google Cloud, Docker, CI/CD and cloud deployment.",
            price: "$20/hr",
        },
        {
            icon: "●",
            title: "Data & Analytics",
            subtitle: "Data Engineering & BI",
            description:
                "Python, SQL, data engineering, BI and data analytics solutions.",
            price: "$20/hr",
        },
        {
            icon: "✓",
            title: "QA & Testing",
            subtitle: "Quality Engineering",
            description:
                "Manual testing, automation, API testing and performance testing.",
            price: "$15/hr",
        },
        {
            icon: "▰",
            title: "E-Commerce Solutions",
            subtitle: "Online Business Platforms",
            description:
                "Shopify, WooCommerce, Magento and custom e-commerce platforms.",
            price: "$18/hr",
        },
        {
            icon: "▥",
            title: "CRM & ERP Development",
            subtitle: "Business Management Systems",
            description:
                "Custom CRM, ERP and business management solutions.",
            price: "$20/hr",
        },
        {
            icon: "API",
            title: "API & Backend",
            subtitle: "Scalable Backend Systems",
            description:
                "REST API, GraphQL, microservices, databases and backend systems.",
            price: "$20/hr",
        },
        {
            icon: "◆",
            title: "Cybersecurity",
            subtitle: "Application Security",
            description:
                "Application security, security testing and vulnerability assessment.",
            price: "$25/hr",
        },
    ];

    return (
        <>
            <Helmet>
                <title>
                    Resource Pricing - Hire Skilled Developers | SoftBild
                </title>

                <meta
                    name="description"
                    content="Hire skilled developers, designers, AI engineers and technology specialists from SoftBild at flexible hourly rates."
                />

                <meta
                    name="keywords"
                    content="developer pricing, hire developers, software developers, React developers, Node.js developers, AI developers, blockchain developers, mobile developers, SoftBild"
                />

                <meta name="author" content="SoftBild" />
                <meta name="robots" content="index, follow" />

                <meta
                    property="og:title"
                    content="Resource Pricing - Hire Skilled Developers | SoftBild"
                />

                <meta
                    property="og:description"
                    content="Build your development team with skilled developers and technology specialists from SoftBild."
                />

                <meta
                    property="og:url"
                    content="https://softbild.com/ResourcePricing"
                />

                <meta property="og:type" content="website" />
            </Helmet>

            <ResourceHeroSection />

            {/* Developer Pricing */}
            <section className="container-fluid resource-pricing-section">
                <div className="container">

                    <div className="row g-3">

                        {developerPricing.map((developer) => (
                            <div
                                className="col-xl-3 col-md-6"
                                key={developer.number}
                            >
                                <div
                                    className={`developer-card ${
                                        developer.popular
                                            ? "developer-card-popular"
                                            : ""
                                    }`}
                                >

                                    {developer.popular && (
                                        <span className="recommended-badge">
                                            RECOMMENDED
                                        </span>
                                    )}

                                    <div className="developer-card-top">
                                        <span className="developer-number">
                                            {developer.number}
                                        </span>

                                        <span className="developer-label">
                                            {developer.label}
                                        </span>
                                    </div>

                                    <h4>{developer.title}</h4>

                                    <p className="developer-experience">
                                        {developer.experience}
                                    </p>

                                    <div className="developer-price">
                                        <span>$</span>
                                        {developer.price}
                                        <small>/hour</small>
                                    </div>

                                    <p className="developer-range">
                                        Typical range: {developer.range}
                                    </p>

                                    <hr />

                                    <ul>
                                        {developer.features.map(
                                            (feature, index) => (
                                                <li key={index}>
                                                    <span>✓</span>
                                                    {feature}
                                                </li>
                                            )
                                        )}
                                    </ul>

                                    <Link
                                        to="/HireDeveloper"
                                        className="sf-btn1"
                                    >
                                        Hire Developer

                                        <span className="icon-round1 ms-2">
                                            <img
                                                src={arrowIcon}
                                                alt="Hire Developer"
                                            />
                                        </span>
                                    </Link>

                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Technology Pricing */}
                    <div className="technology-section">

                        <div className="technology-heading">
                            <div>
                                <h3>
                                    Technology & Resource Rates
                                </h3>
                            </div>
                        </div>

                        <div className="row g-3">

                            {technologyPricing.map((technology, index) => (
                                <div
                                    className="col-lg-4 col-md-6"
                                    key={index}
                                >
                                    <div className="technology-card">

                                        <div className="technology-icon">
                                            {technology.icon}
                                        </div>

                                        <h5>
                                            {technology.title}
                                        </h5>

                                        <span className="technology-subtitle">
                                            {technology.subtitle}
                                        </span>

                                        <p>
                                            {technology.description}
                                        </p>

                                        <div className="technology-price">
                                            <span>Starting from</span>
                                            <strong>
                                                {technology.price}
                                            </strong>
                                        </div>

                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="container-fluid py-100 bg-img-overlay1 color-overlay1">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-2"></div>

                        <div className="col-lg-8 text-center color-overlay1-content">

                            <h2 className="light-subtitle">
                                Need a dedicated development team?
                            </h2>

                            <Link
                                to="/Contact"
                                className="sf-btn5 mt-20"
                            >
                                Discuss Your Requirement
                            </Link>

                        </div>

                        <div className="col-lg-2"></div>

                    </div>
                </div>
            </section>

            <HomeCta />
        </>
    );
}

export default ResourcePricing;