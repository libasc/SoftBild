"use client";

import Link from "next/link";

const footerLogo = "/assets/images/softbild-logo-white.svg";
const fbicon = "/assets/icons/social-facebook.svg";
const instaicon = "/assets/icons/social-instagram.svg";
const twittericon = "/assets/icons/social-twitter.svg";
const linkedinicon = "/assets/icons/social-linkedin.svg";
const email = "/assets/icons/email1.svg";
const mapIcon = "/assets/icons/map.svg";

function Footer() {
    return (
        <>
            <footer className="container-fluid">
                <div className="container py-80">
                    <div className="row">

                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="footer-col-section">

                                <div className="footer-logo">
                                    <img src={footerLogo} alt="Footer Logo" />
                                </div>

                                <div className="footer-info my-20 pr-60">
                                    <p className="mb-0">
                                        SoftBild is a provider of innovative tech solutions,
                                        specializing in UI/UX design, web and mobile app
                                        development, e-commerce, ERP, and CRM systems. We help
                                        businesses thrive in the digital world with customized,
                                        scalable solutions that drive growth and efficiency.
                                    </p>
                                </div>

                                <div className="footer-social-media">
                                    <ul>
                                        <li>
                                            <a
                                                href="https://www.facebook.com/softbild"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Facebook"
                                            >
                                                <img src={fbicon} alt="facebook" />
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href="https://www.instagram.com/softbild/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Instagram"
                                            >
                                                <img src={instaicon} alt="instagram" />
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href="https://x.com/SoftBild"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="X"
                                            >
                                                <img src={twittericon} alt="twitter" />
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href="https://www.linkedin.com/company/softbild/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="LinkedIn"
                                            >
                                                <img src={linkedinicon} alt="linkedin" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-3 col-xs-5 col-5 mt-md-3 phone-mt-20">
                            <div className="footer-col-section">
                                <p className="footer-menu-heading">Explore</p>

                                <ul className="footer-menu-list">
                                    <li>
                                        <Link href="/about">About Us</Link>
                                    </li>

                                    <li>
                                        <Link href="/services">Services</Link>
                                    </li>

                                    <li>
                                        <Link href="/on-demand-resource">
                                            On-Demand Resource
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/contact">Contact</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-7 col-7 mt-md-3 phone-mt-20">
                            <div className="footer-col-section">
                                <p className="footer-menu-heading">Services</p>

                                <ul className="footer-menu-list">
                                    <li>
                                        <Link href="/services">UI/UX</Link>
                                    </li>

                                    <li>
                                        <Link href="/services">
                                            Web Application Development
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/services">
                                            Mobile Application Development
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/services">
                                            Explore All Services
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5 mt-md-3 phone-mt-20">
                            <div className="footer-col-section">
                                <p className="footer-menu-heading">Contact</p>

                                <ul className="footer-menu-list">
                                    <li>
                                        <img src={email} alt="email" /> :{" "}
                                        <a href="mailto:info@softbild.com">
                                            info@softbild.com
                                        </a>
                                    </li>

                                    <li>
                                        <img src={email} alt="email" /> :{" "}
                                        <a href="mailto:sales@softbild.com">
                                            sales@softbild.com
                                        </a>
                                    </li>

                                    <li>
                                        <img src={mapIcon} alt="location" /> : New Delhi,
                                        India - 110025
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row footer-copyright">
                    <div className="col-lg-12">
                        <p>
                            &copy; Copyright 2026 by{" "}
                            <a href="#">SoftBild</a> | Privacy Policy
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;