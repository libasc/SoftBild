import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import HomeCta from "../../components/app-components/HomeCta";
import ResourceHeroSection from "../../components/app-components/ResourceHeroSection";

function ResourcePricing() {

    // ==========================================
    // Hire Developer Modal State
    // ==========================================

    const [showHireModal, setShowHireModal] = useState(false);
    const [selectedDeveloper, setSelectedDeveloper] = useState("");

    // ==========================================
    // Open Hire Developer Modal
    // ==========================================

    const handleHireDeveloper = (developerType) => {
        setSelectedDeveloper(developerType);
        setShowHireModal(true);

        // Prevent background scrolling
        document.body.style.overflow = "hidden";
    };

    // ==========================================
    // Close Hire Developer Modal
    // ==========================================

    const closeHireModal = () => {
        setShowHireModal(false);
        setSelectedDeveloper("");

        // Restore scrolling
        document.body.style.overflow = "";
    };

    // ==========================================
    // Developer Pricing
    // ==========================================

    const developerPricing = [
        {
            id: 1,
            number: "01",
            label: "ENTRY LEVEL",
            title: "Junior Developer",
            experience: "1–2 Years Experience",
            price: "$12",
            range: "$12–$20/hr",
            features: [
                "Frontend & Backend Development",
                "Website Development",
                "API Integration",
                "Bug Fixing & Maintenance",
            ],
        },
        {
            id: 2,
            number: "02",
            label: "PROFESSIONAL",
            title: "Mid-Level Developer",
            experience: "2–5 Years Experience",
            price: "$20",
            range: "$20–$30/hr",
            features: [
                "Web & Mobile Applications",
                "API & Database Development",
                "Third-Party Integrations",
                "Application Maintenance",
            ],
        },
        {
            id: 3,
            number: "03",
            label: "EXPERT",
            title: "Senior Developer",
            experience: "5+ Years Experience",
            price: "$30",
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
            id: 4,
            number: "04",
            label: "FULL PRODUCT",
            title: "Full-Stack Developer",
            experience: "4+ Years Experience",
            price: "$25",
            range: "$25–$40/hr",
            features: [
                "Frontend & Backend Development",
                "Database & API Development",
                "Cloud & Deployment",
                "End-to-End Product Development",
            ],
        },
    ];

    // ==========================================
    // Technology Pricing
    // ==========================================

    const technologyPricing = [
        {
            id: 1,
            icon: "</>",
            title: "Software Development",
            subtitle: "Web & Custom Software",
            description:
                "React.js, Next.js, Node.js, PHP, Laravel, Python, Java and .NET.",
            price: "$15/hr",
        },
        {
            id: 2,
            icon: "▣",
            title: "Mobile App Development",
            subtitle: "iOS, Android & Cross Platform",
            description:
                "React Native, Flutter, Android, iOS and cross-platform mobile applications.",
            price: "$18/hr",
        },
        {
            id: 3,
            icon: "AI",
            title: "AI & Machine Learning",
            subtitle: "Intelligent Digital Solutions",
            description:
                "Python, Machine Learning, Generative AI, LLM, NLP and Computer Vision.",
            price: "$25/hr",
        },
        {
            id: 4,
            icon: "◇",
            title: "Blockchain & Web3",
            subtitle: "Decentralized Solutions",
            description:
                "Smart Contracts, Solidity, DApps, Web3 and blockchain-based applications.",
            price: "$25/hr",
        },
        {
            id: 5,
            icon: "✦",
            title: "UI/UX Design",
            subtitle: "Product & Experience Design",
            description:
                "Figma, wireframes, prototypes, design systems and product design.",
            price: "$15/hr",
        },
        {
            id: 6,
            icon: "☁",
            title: "Cloud & DevOps",
            subtitle: "Infrastructure & Deployment",
            description:
                "AWS, Azure, Google Cloud, Docker, CI/CD and cloud deployment.",
            price: "$20/hr",
        },
        {
            id: 7,
            icon: "●",
            title: "Data & Analytics",
            subtitle: "Data Engineering & BI",
            description:
                "Python, SQL, data engineering, BI and data analytics solutions.",
            price: "$20/hr",
        },
        {
            id: 8,
            icon: "✓",
            title: "QA & Testing",
            subtitle: "Quality Engineering",
            description:
                "Manual testing, automation, API testing and performance testing.",
            price: "$15/hr",
        },
        {
            id: 9,
            icon: "▰",
            title: "E-Commerce Solutions",
            subtitle: "Online Business Platforms",
            description:
                "Shopify, WooCommerce, Magento and custom e-commerce platforms.",
            price: "$18/hr",
        },
        {
            id: 10,
            icon: "▥",
            title: "CRM & ERP Development",
            subtitle: "Business Management Systems",
            description:
                "Custom CRM, ERP and business management solutions.",
            price: "$20/hr",
        },
        {
            id: 11,
            icon: "API",
            title: "API & Backend",
            subtitle: "Scalable Backend Systems",
            description:
                "REST API, GraphQL, microservices, databases and backend systems.",
            price: "$20/hr",
        },
        {
            id: 12,
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
            {/* ==========================================
                SEO
            ========================================== */}

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

                <meta
                    name="author"
                    content="SoftBild"
                />

                <meta
                    name="robots"
                    content="index, follow"
                />

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

                <meta
                    property="og:type"
                    content="website"
                />
            </Helmet>


            {/* ==========================================
                HERO SECTION
            ========================================== */}

            <ResourceHeroSection />


            {/* ==========================================
                RESOURCE PRICING SECTION
            ========================================== */}

            <section className="container-fluid py-80 bg-blue2">

                <div className="container">

                    {/* Section Heading */}

                    <div className="row justify-content-center text-center mb-50">

                        <div className="col-lg-8">

                            <span
                                className="text-uppercase"
                                style={{
                                    color: "#00b9c8",
                                    fontSize: "11px",
                                    fontWeight: "700",
                                    letterSpacing: "1.5px",
                                }}
                            >
                                Resource Pricing
                            </span>

                            <h2
                                className="mt-10 mb-15"
                                style={{
                                    fontWeight: "700",
                                    color: "#1d2c3a",
                                }}
                            >
                                Hire The Right{" "}
                                <span style={{ color: "#00b9c8" }}>
                                    Tech Talent
                                </span>
                                <br />
                                For Your Next Project
                            </h2>

                            <p className="mb-0 text-muted">
                                Scale your development team with skilled
                                developers, designers, engineers, and
                                technology specialists. Choose the expertise
                                that fits your project and budget.
                            </p>

                        </div>

                    </div>


                    {/* ==========================================
                        DEVELOPER PRICING CARDS
                    ========================================== */}

                    <div className="row g-3">

                        {developerPricing.map((developer) => (

                            <div
                                className="col-xl-3 col-md-6"
                                key={developer.id}
                            >

                                <div
                                    className={`h-100 position-relative bg-white rounded-4 p-4 ${
                                        developer.popular
                                            ? "border border-2 border-info"
                                            : "border"
                                    }`}
                                    style={{
                                        borderColor: developer.popular
                                            ? "#00b9c8"
                                            : "#e5edf0",
                                        transition:
                                            "all 0.3s ease",
                                    }}
                                >

                                    {/* Popular Badge */}

                                    {developer.popular && (
                                        <div
                                            className="position-absolute top-0 end-0 px-3 py-1"
                                            style={{
                                                background:
                                                    "linear-gradient(90deg, #08b8c8, #18d39e)",
                                                color: "#fff",
                                                fontSize: "9px",
                                                fontWeight: "700",
                                                borderRadius:
                                                    "0 14px 0 10px",
                                            }}
                                        >
                                            RECOMMENDED
                                        </div>
                                    )}


                                    {/* Number */}

                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                        <span
                                            className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                background:
                                                    "#eafafa",
                                                color: "#00b9c8",
                                                fontSize: "11px",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {developer.number}
                                        </span>

                                        <span
                                            style={{
                                                fontSize: "9px",
                                                color: "#9aa7ad",
                                                fontWeight: "600",
                                            }}
                                        >
                                            {developer.label}
                                        </span>

                                    </div>


                                    {/* Title */}

                                    <h5
                                        className="mb-2"
                                        style={{
                                            color: "#1d2c3a",
                                            fontWeight: "700",
                                        }}
                                    >
                                        {developer.title}
                                    </h5>


                                    {/* Experience */}

                                    <p
                                        className="mb-3"
                                        style={{
                                            fontSize: "11px",
                                            color: "#667780",
                                        }}
                                    >
                                        {developer.experience}
                                    </p>


                                    {/* Price */}

                                    <div className="mb-2">

                                        <span
                                            style={{
                                                color: "#00b9c8",
                                                fontSize: "16px",
                                                fontWeight: "700",
                                                verticalAlign: "top",
                                            }}
                                        >
                                            $
                                        </span>

                                        <span
                                            style={{
                                                color: "#1d2c3a",
                                                fontSize: "38px",
                                                lineHeight: "1",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {developer.price.replace(
                                                "$",
                                                ""
                                            )}
                                        </span>

                                        <span
                                            style={{
                                                fontSize: "12px",
                                                color: "#89969c",
                                            }}
                                        >
                                            /hour
                                        </span>

                                    </div>


                                    {/* Typical Range */}

                                    <p
                                        style={{
                                            fontSize: "12px",
                                            color: "#89969c",
                                        }}
                                    >
                                        Typical range:{" "}
                                        {developer.range}
                                    </p>


                                    <hr
                                        style={{
                                            borderColor: "#edf1f2",
                                        }}
                                    />


                                    {/* Features */}

                                    <ul
                                        className="list-unstyled mb-4"
                                        style={{
                                            minHeight: "105px",
                                        }}
                                    >

                                        {developer.features.map(
                                            (feature, index) => (

                                                <li
                                                    key={index}
                                                    className="d-flex align-items-start mb-2"
                                                    style={{
                                                        fontSize: "12px",
                                                        color: "#56656d",
                                                    }}
                                                >

                                                    <span
                                                        className="me-2"
                                                        style={{
                                                            color: "#00b9c8",
                                                            fontWeight:
                                                                "700",
                                                        }}
                                                    >
                                                        ✓
                                                    </span>

                                                    {feature}

                                                </li>

                                            )
                                        )}

                                    </ul>


                                    {/* Hire Button */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleHireDeveloper(
                                                developer.title
                                            )
                                        }
                                        className={`btn w-100 ${
                                            developer.popular
                                                ? "text-white"
                                                : ""
                                        }`}
                                        style={{
                                            minHeight: "40px",
                                            fontSize: "11px",
                                            fontWeight: "600",
                                            borderRadius: "6px",
                                            border: developer.popular
                                                ? "none"
                                                : "1px solid #dfe7e9",
                                            background:
                                                developer.popular
                                                    ? "linear-gradient(90deg, #08b8c8, #18d39e)"
                                                    : "#fff",
                                            color: developer.popular
                                                ? "#fff"
                                                : "#263746",
                                        }}
                                    >
                                        Hire Developer
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* ==========================================
                        TECHNOLOGY SECTION
                    ========================================== */}

                    <div className="row mt-70">

                        <div className="col-lg-12">

                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-25">

                                <div>

                                    <span
                                        className="text-uppercase"
                                        style={{
                                            color: "#00b9c8",
                                            fontSize: "10px",
                                            fontWeight: "700",
                                            letterSpacing: "1.3px",
                                        }}
                                    >
                                        Technology Expertise
                                    </span>

                                    <h3
                                        className="mt-2 mb-0"
                                        style={{
                                            color: "#1d2c3a",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Technology & Resource Rates
                                    </h3>

                                </div>


                                <p
                                    className="mb-0 mt-3 mt-md-0"
                                    style={{
                                        maxWidth: "360px",
                                        fontSize: "11px",
                                        color: "#718087",
                                    }}
                                >
                                    Access skilled professionals across
                                    modern technologies to build, scale,
                                    and maintain your digital products.
                                </p>

                            </div>


                            {/* Technology Cards */}

                            <div className="row g-3">

                                {technologyPricing.map(
                                    (technology) => (

                                        <div
                                            className="col-lg-4 col-md-6"
                                            key={technology.id}
                                        >

                                            <div
                                                className="bg-white h-100 rounded-4 p-4 border"
                                                style={{
                                                    borderColor:
                                                        "#e5edf0",
                                                    transition:
                                                        "all 0.3s ease",
                                                }}
                                            >

                                                {/* Icon */}

                                                <div
                                                    className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                                                    style={{
                                                        width: "38px",
                                                        height: "38px",
                                                        background:
                                                            "#eafafa",
                                                        color: "#00b9c8",
                                                        fontSize:
                                                            "11px",
                                                        fontWeight:
                                                            "700",
                                                    }}
                                                >
                                                    {technology.icon}
                                                </div>


                                                {/* Title */}

                                                <h6
                                                    className="mb-1"
                                                    style={{
                                                        color:
                                                            "#1d2c3a",
                                                        fontWeight:
                                                            "700",
                                                    }}
                                                >
                                                    {technology.title}
                                                </h6>


                                                {/* Subtitle */}

                                                <div
                                                    className="mb-2"
                                                    style={{
                                                        color:
                                                            "#00aebc",
                                                        fontSize:
                                                            "9px",
                                                        fontWeight:
                                                            "600",
                                                    }}
                                                >
                                                    {
                                                        technology.subtitle
                                                    }
                                                </div>


                                                {/* Description */}

                                                <p
                                                    className="mb-4"
                                                    style={{
                                                        color:
                                                            "#718087",
                                                        fontSize:
                                                            "10px",
                                                        lineHeight:
                                                            "1.6",
                                                        minHeight:
                                                            "34px",
                                                    }}
                                                >
                                                    {
                                                        technology.description
                                                    }
                                                </p>


                                                {/* Price */}

                                                <div className="d-flex justify-content-between align-items-center pt-3 border-top">

                                                    <span
                                                        style={{
                                                            fontSize:
                                                                "9px",
                                                            color:
                                                                "#9aa7ad",
                                                        }}
                                                    >
                                                        Starting from
                                                    </span>

                                                    <strong
                                                        style={{
                                                            color:
                                                                "#00b9c8",
                                                            fontSize:
                                                                "12px",
                                                        }}
                                                    >
                                                        {
                                                            technology.price
                                                        }
                                                    </strong>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>


                    {/* ==========================================
                        DEDICATED TEAM CTA
                    ========================================== */}

                    <div className="row mt-30">

                        <div className="col-lg-12">

                            <div
                                className="rounded-3 p-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3"
                                style={{
                                    background:
                                        "#1c2b39",
                                }}
                            >

                                <div>

                                    <h6
                                        className="text-white mb-1"
                                        style={{
                                            fontWeight:
                                                "700",
                                        }}
                                    >
                                        Need a dedicated development
                                        team?
                                    </h6>

                                    <p
                                        className="mb-0"
                                        style={{
                                            color:
                                                "#b7c2c8",
                                            fontSize:
                                                "10px",
                                        }}
                                    >
                                        Build your team with developers,
                                        designers, QA engineers and
                                        technology specialists.
                                    </p>

                                </div>


                                <button
                                    type="button"
                                    onClick={() =>
                                        handleHireDeveloper(
                                            ""
                                        )
                                    }
                                    className="btn text-white px-4"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #08b8c8, #18d39e)",
                                        border: "none",
                                        borderRadius: "6px",
                                        fontSize: "10px",
                                        fontWeight: "600",
                                        whiteSpace:
                                            "nowrap",
                                    }}
                                >
                                    Discuss Your Requirement →
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                EXISTING CTA
            ========================================== */}

            <section className="container-fluid py-100 bg-img-overlay1 color-overlay1">

                <div className="container">

                    <div className="row">

                        <div className="col-lg-3"></div>

                        <div className="col-lg-6 text-center color-overlay1-content">

                            <h2 className="light-subtitle">
                                We provide best tech solutions for
                                your <span>business</span>
                            </h2>

                            <Link
                                to="/Contact"
                                className="sf-btn5 mt-20"
                            >
                                Enquire
                            </Link>

                        </div>

                        <div className="col-lg-3"></div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                NEWSLETTER / EXISTING HOME CTA
            ========================================== */}

            <HomeCta />


            {/* ==========================================
                HIRE DEVELOPER MODAL
            ========================================== */}

            {showHireModal && (

                <>
                    {/* Modal Backdrop */}

                    <div
                        className="modal-backdrop fade show"
                        onClick={closeHireModal}
                    ></div>


                    {/* Modal */}

                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="hireDeveloperModalLabel"
                    >

                        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">

                            <div className="modal-content border-0 rounded-4 shadow-lg">

                                {/* ==================================
                                    Modal Header
                                ================================== */}

                                <div className="modal-header border-0 px-4 px-md-5 pt-4 pb-2">

                                    <div>

                                        <span
                                            style={{
                                                color:
                                                    "#00b9c8",
                                                fontSize:
                                                    "10px",
                                                fontWeight:
                                                    "700",
                                                letterSpacing:
                                                    "1.5px",
                                                textTransform:
                                                    "uppercase",
                                            }}
                                        >
                                            Hire A Developer
                                        </span>

                                        <h4
                                            id="hireDeveloperModalLabel"
                                            className="modal-title mt-1 mb-1"
                                            style={{
                                                color:
                                                    "#1d2c3a",
                                                fontWeight:
                                                    "700",
                                            }}
                                        >
                                            Tell Us About Your Project
                                        </h4>

                                        <p
                                            className="mb-0 text-muted"
                                            style={{
                                                fontSize:
                                                    "12px",
                                            }}
                                        >
                                            Share your requirements and
                                            our team will get back to
                                            you shortly.
                                        </p>

                                    </div>


                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={
                                            closeHireModal
                                        }
                                    ></button>

                                </div>


                                {/* ==================================
                                    Modal Body
                                ================================== */}

                                <div className="modal-body px-4 px-md-5 pb-4">

                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();

                                            alert(
                                                "Thank you! Your requirement has been submitted."
                                            );

                                            closeHireModal();
                                        }}
                                    >

                                        {/* ==================================
                                            Developer Requirement
                                        ================================== */}

                                        <div className="mb-4">

                                            <div className="d-flex align-items-center mb-3">

                                                <span
                                                    className="d-flex align-items-center justify-content-center rounded-circle me-2"
                                                    style={{
                                                        width:
                                                            "28px",
                                                        height:
                                                            "28px",
                                                        background:
                                                            "#eafafa",
                                                        color:
                                                            "#00b9c8",
                                                        fontSize:
                                                            "11px",
                                                        fontWeight:
                                                            "700",
                                                    }}
                                                >
                                                    01
                                                </span>

                                                <h6
                                                    className="mb-0"
                                                    style={{
                                                        color:
                                                            "#1d2c3a",
                                                        fontWeight:
                                                            "700",
                                                    }}
                                                >
                                                    Developer Requirement
                                                </h6>

                                            </div>


                                            <div className="row g-3">

                                                {/* Developer Type */}

                                                <div className="col-md-6">

                                                    <label className="form-label">
                                                        Developer Type
                                                        <span className="text-danger">
                                                            {" "}*
                                                        </span>
                                                    </label>

                                                    <select
                                                        className="form-select"
                                                        value={
                                                            selectedDeveloper
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedDeveloper(
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        required
                                                    >

                                                        <option value="">
                                                            Select developer
                                                            type
                                                        </option>

                                                        <option value="Junior Developer">
                                                            Junior Developer
                                                        </option>

                                                        <option value="Mid-Level Developer">
                                                            Mid-Level Developer
                                                        </option>

                                                        <option value="Senior Developer">
                                                            Senior Developer
                                                        </option>

                                                        <option value="Full-Stack Developer">
                                                            Full-Stack Developer
                                                        </option>

                                                    </select>

                                                </div>


                                                {/* Technology */}

                                                <div className="col-md-6">

                                                    <label className="form-label">
                                                        Technology / Expertise
                                                        <span className="text-danger">
                                                            {" "}*
                                                        </span>
                                                    </label>

                                                    <select
                                                        className="form-select"
                                                        required
                                                    >

                                                        <option value="">
                                                            Select technology
                                                        </option>

                                                        <option>
                                                            React.js
                                                        </option>

                                                        <option>
                                                            Next.js
                                                        </option>

                                                        <option>
                                                            Node.js
                                                        </option>

                                                        <option>
                                                            PHP / Laravel
                                                        </option>

                                                        <option>
                                                            Python
                                                        </option>

                                                        <option>
                                                            Java
                                                        </option>

                                                        <option>
                                                            .NET
                                                        </option>

                                                        <option>
                                                            Flutter
                                                        </option>

                                                        <option>
                                                            React Native
                                                        </option>

                                                        <option>
                                                            AI / Machine Learning
                                                        </option>

                                                        <option>
                                                            Blockchain / Web3
                                                        </option>

                                                        <option>
                                                            UI/UX Design
                                                        </option>

                                                        <option>
                                                            Cloud / DevOps
                                                        </option>

                                                        <option>
                                                            QA & Testing
                                                        </option>

                                                        <option>
                                                            Other
                                                        </option>

                                                    </select>

                                                </div>


                                                {/* Number of Developers */}

                                                <div className="col-md-6">

                                                    <label className="form-label">
                                                        Number of Developers
                                                    </label>

                                                    <select className="form-select">

                                                        <option>
                                                            1 Developer
                                                        </option>

                                                        <option>
                                                            2 Developers
                                                        </option>

                                                        <option>
                                                            3 Developers
                                                        </option>

                                                        <option>
                                                            4 Developers
                                                        </option>

                                                        <option>
                                                            5+ Developers
                                                        </option>

                                                    </select>

                                                </div>


                                                {/* Engagement */}

                                                <div className="col-md-6">

                                                    <label className="form-label">
                                                        Engagement Type
                                                    </label>

                                                    <select className="form-select">

                                                        <option value="">
                                                            Select engagement
                                                        </option>

                                                        <option>
                                                            Hourly
                                                        </option>

                                                        <option>
                                                            Part-Time
                                                        </option>

                                                        <option>
                                                            Full-Time
                                                        </option>

                                                        <option>
                                                            Dedicated Team
                                                        </option>

                                                        <option>
                                                            Project Based
                                                        </option>

                                                    </select>

                                                </div>


                                                {/* Start Date */}

                                                <div className="col-md-6">

                                                    <label className="form-label">
                                                        Expected Start Date
                                                    </label>

                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                    />

                                                </div>


                                                {/* Duration */}

                                                <div className="col-md-6">

                                                    <label className="form-label">
                                                        Project Duration
                                                    </label>

                                                    <select className="form-select">

                                                        <option value="">
                                                            Select duration
                                                        </option>

                                                        <option>
                                                            Less than 1 month
                                                        </option>

                                                        <option>
                                                            1–3 months
                                                        </option>

                                                        <option>
                                                            3–6 months
                                                        </option>

                                                        <option>
                                                            6–12 months
                                                        </option>

                                                        <option>
                                                            12+ months
                                                        </option>

                                                        <option>
                                                            Not sure yet
                                                        </option>

                                                    </select>

                                                </div>

                                            </div>

                                        </div>


                                        {/* ==================================
                                            Contact Information
                                        ================================== */}

                                        <div className="mb-4">

                                            <div className="d-flex align-items-center mb-3">

                                                <span
                                                    className="d-flex align-items-center justify-content-center rounded-circle me-2"
                                                    style={{
                                                        width:
                                                            "28px",
                                                        height:
                                                            "28px",
                                                        background:
                                                            "#eafafa",
                                                        color:
                                                            "#00b9c8",
                                                        fontSize:
                                                            "11px",
                                                        fontWeight:
                                                            "700",
                                                    }}
                                                >
                                                    02
                                                </span>

                                                <h6
                                                    className="mb-0"
                                                    style={{
                                                        color:
                                                            "#1d2c3a",
                                                        fontWeight:
                                                            "700",
                                                    }}
                                                >
                                                    Your Information
                                                </h6>

                                            </div>


                                            <div className="row g-3">

                                                {/* Name */}

                                                <div className="col-md-6">

                                                    <label className="form-label">
                                                        Full Name
                                                        <span className="text-danger">
                                                            {" "}*
                                                        </span>
                                                    </label>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter your name"
                                                        required
                                                    />

                                                </div>


                                                {/* Company */}

                                                <div className="col-md-6">

                                                    <label className="form-label">
                                                        Company Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter company name"
                                                    />

                                                </div>


                                                {/* Email */}

                                                <div className="col-md-6">

                                                    <label className="form-label">
                                                        Work Email
                                                        <span className="text-danger">
                                                            {" "}*
                                                        </span>
                                                    </label>

                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="you@company.com"
                                                        required
                                                    />

                                                </div>


                                                {/* Phone */}

                                                <div className="col-md-6">

                                                    <label className="form-label">
                                                        Phone / WhatsApp
                                                    </label>

                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        placeholder="+1 234 567 890"
                                                    />

                                                </div>

                                            </div>

                                        </div>


                                        {/* ==================================
                                            Project Details
                                        ================================== */}

                                        <div className="mb-4">

                                            <div className="d-flex align-items-center mb-3">

                                                <span
                                                    className="d-flex align-items-center justify-content-center rounded-circle me-2"
                                                    style={{
                                                        width:
                                                            "28px",
                                                        height:
                                                            "28px",
                                                        background:
                                                            "#eafafa",
                                                        color:
                                                            "#00b9c8",
                                                        fontSize:
                                                            "11px",
                                                        fontWeight:
                                                            "700",
                                                    }}
                                                >
                                                    03
                                                </span>

                                                <h6
                                                    className="mb-0"
                                                    style={{
                                                        color:
                                                            "#1d2c3a",
                                                        fontWeight:
                                                            "700",
                                                    }}
                                                >
                                                    Project Details
                                                </h6>

                                            </div>


                                            <label className="form-label">
                                                Tell Us About Your Project
                                                <span className="text-danger">
                                                    {" "}*
                                                </span>
                                            </label>

                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                placeholder="Briefly describe your project, requirements, features, technology stack, timeline, or anything else we should know..."
                                                required
                                            ></textarea>

                                        </div>


                                        {/* ==================================
                                            Budget
                                        ================================== */}

                                        <div className="mb-4">

                                            <label className="form-label">
                                                Estimated Budget
                                            </label>

                                            <select className="form-select">

                                                <option value="">
                                                    Select your estimated
                                                    budget
                                                </option>

                                                <option>
                                                    Under $1,000
                                                </option>

                                                <option>
                                                    $1,000 – $5,000
                                                </option>

                                                <option>
                                                    $5,000 – $10,000
                                                </option>

                                                <option>
                                                    $10,000 – $25,000
                                                </option>

                                                <option>
                                                    $25,000+
                                                </option>

                                                <option>
                                                    I'm not sure
                                                </option>

                                            </select>

                                        </div>


                                        {/* ==================================
                                            Submit
                                        ================================== */}

                                        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">

                                            <div>

                                                <small
                                                    className="text-muted"
                                                    style={{
                                                        fontSize:
                                                            "10px",
                                                    }}
                                                >
                                                    We'll review your
                                                    requirements and contact
                                                    you shortly.
                                                </small>

                                            </div>


                                            <div className="d-flex gap-2">

                                                <button
                                                    type="button"
                                                    className="btn btn-light px-4"
                                                    onClick={
                                                        closeHireModal
                                                    }
                                                >
                                                    Cancel
                                                </button>


                                                <button
                                                    type="submit"
                                                    className="btn text-white px-4"
                                                    style={{
                                                        background:
                                                            "linear-gradient(90deg, #08b8c8, #18d39e)",
                                                        border:
                                                            "none",
                                                        borderRadius:
                                                            "7px",
                                                        fontWeight:
                                                            "600",
                                                    }}
                                                >
                                                    Submit Requirement
                                                </button>

                                            </div>

                                        </div>

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>
                </>
            )}

        </>
    );
}

export default ResourcePricing;