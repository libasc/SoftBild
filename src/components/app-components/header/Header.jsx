"use client";

import React, { useRef } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";

const logoMain = "/assets/images/softbild-logo.svg";
const fbicon = "/assets/icons/social-facebook.svg";
const instaicon = "/assets/icons/social-instagram.svg";
const twittericon = "/assets/icons/social-twitter.svg";
const linkedinicon = "/assets/icons/social-linkedin.svg";
const email = "/assets/icons/email1.svg";
const phoneIcon = "/assets/icons/call3.svg";

function Header() {
    const navbarRef = useRef(null);

    const handleNavClick = () => {
        if (
            navbarRef.current &&
            navbarRef.current.classList.contains("show")
        ) {
            navbarRef.current.classList.remove("show");
        }
    };

    return (
        <>
            <div className="container-fluid bg-blue1 text-white py-10">
                <div className="container px-0">
                    <div className="small-header">
                        <div className="small-hdr-phoneemail">

                            <div className="sh-email">
                                <span>
                                    <img src={email} alt="email" /> &nbsp;:
                                </span>

                                <a href="mailto:info@softbild.com">
                                    info@softbild.com
                                </a>
                            </div>

                            <div className="sh-email">
                                <span>
                                    <img src={phoneIcon} alt="phone" /> &nbsp;:
                                </span>

                                <a href="tel:+971527535786">
                                    +971 (527) 535-786
                                </a>
                            </div>

                        </div>

                        <div className="sh-social">
                            <ul>
                                <li>
                                    <a
                                        href="https://www.facebook.com/softbild"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={fbicon}
                                            alt="Facebook"
                                        />
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://www.instagram.com/softbild/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={instaicon}
                                            alt="Instagram"
                                        />
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://x.com/SoftBild"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={twittericon}
                                            alt="X"
                                        />
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://www.linkedin.com/company/softbild/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={linkedinicon}
                                            alt="LinkedIn"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid bg-white py-10 shadow1 main-header-wrapper sticky-top">
                <div className="container px-0">

                    <header>
                        <nav className="navbar navbar-expand-lg">

                            <div className="container-fluid px-0">

                                {/* Logo */}
                                <Link
                                    href="/"
                                    className="navbar-brand"
                                    onClick={handleNavClick}
                                >
                                    <div className="main-logo">
                                        <img
                                            src={logoMain}
                                            alt="SoftBild"
                                        />
                                    </div>
                                </Link>

                                {/* Mobile Menu Button */}
                                <button
                                    className="navbar-toggler border-0"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="hamberger-icon">
                                        <MenuIcon />
                                    </span>
                                </button>

                                {/* Navigation */}
                                <div
                                    className="collapse navbar-collapse main-header-menu-wrapper"
                                    id="navbarSupportedContent"
                                    ref={navbarRef}
                                >
                                    <ul className="navbar-nav m-auto">

                                        <li>
                                            <Link
                                                href="/"
                                                onClick={handleNavClick}
                                            >
                                                Home
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href="/about"
                                                onClick={handleNavClick}
                                            >
                                                About Us
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href="/services"
                                                onClick={handleNavClick}
                                            >
                                                Services
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href="/portfolio"
                                                onClick={handleNavClick}
                                            >
                                                Portfolio
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href="/on-demand-resource"
                                                onClick={handleNavClick}
                                            >
                                                On-Demand Resource
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href="/contact"
                                                onClick={handleNavClick}
                                            >
                                                Contact Us
                                            </Link>
                                        </li>

                                    </ul>
                                </div>

                                {/* Start a Project */}
                                <div className="header-btn-wrpr">
                                    <Link
                                        href="/hire-developer"
                                        className="sf-btn1"
                                    >
                                        Start a Project
                                    </Link>
                                </div>

                            </div>
                        </nav>
                    </header>

                </div>
            </div>
        </>
    );
}

export default Header;