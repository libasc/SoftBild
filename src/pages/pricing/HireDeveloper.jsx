import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import HomeCta from "../../components/app-components/HomeCta";

import "./HireDeveloper.css";

function HireDeveloper() {
    return (
        <>
            <Helmet>
                <title>Hire Developers | SoftBild</title>

                <meta
                    name="description"
                    content="Hire skilled developers and technology specialists from SoftBild. Get the right development resources for your web, mobile, AI, cloud, and software development projects."
                />

                <meta
                    name="keywords"
                    content="hire developers, hire software developers, dedicated developers, web developers, mobile developers, AI developers, SoftBild"
                />

                <meta name="author" content="SoftBild" />
                <meta name="robots" content="index, follow" />

                <meta
                    property="og:title"
                    content="Hire Developers | SoftBild"
                />

                <meta
                    property="og:description"
                    content="Hire experienced developers and technology specialists for your next project with SoftBild."
                />

                <meta
                    property="og:url"
                    content="https://softbild.com/HireDeveloper"
                />

                <meta
                    property="og:type"
                    content="website"
                />
            </Helmet>


            {/* =========================================
                MAIN HIRE DEVELOPER SECTION
            ========================================= */}

            <section className="hire-developer-section">

                <div className="container">

                    <div className="row align-items-start g-5">

                        {/* =================================
                            LEFT CONTENT
                        ================================= */}

                        <div className="col-lg-6">

                            <div className="hire-left-content">

                                <span className="hire-eyebrow">
                                    HIRE DEVELOPERS
                                </span>

                                <h1>
                                    Let's Build the Right
                                    <span> Technology Solution</span>
                                    <br />
                                    for Your Business
                                </h1>

                                <p className="hire-intro">
                                    Tell us about your development requirements
                                    and our technology experts will help you
                                    find the right team for your project.
                                </p>

                                <p className="hire-description">
                                    Whether you need a single developer, a
                                    dedicated development team, or specialized
                                    technology expertise, SoftBild can help you
                                    find the right resources based on your
                                    project requirements.
                                </p>


                                {/* =================================
                                    CONTACT + PROCESS
                                ================================= */}

                                <div className="hire-contact-process">

                                    {/* Contact */}

                                    <div className="hire-contact">

                                        <div className="contact-item">

                                            <div className="contact-icon">
                                                ☎
                                            </div>

                                            <div>
                                                <span>CALL US</span>
                                                <strong>
                                                    +91 00000 00000
                                                </strong>
                                            </div>

                                        </div>


                                        <div className="contact-item">

                                            <div className="contact-icon">
                                                ✉
                                            </div>

                                            <div>
                                                <span>EMAIL US</span>
                                                <strong>
                                                    info@softbild.com
                                                </strong>
                                            </div>

                                        </div>


                                        <div className="contact-item">

                                            <div className="contact-icon">
                                                💬
                                            </div>

                                            <div>
                                                <span>CHAT WITH US</span>
                                                <strong>
                                                    Let's discuss your project
                                                </strong>
                                            </div>

                                        </div>


                                        <div className="contact-item">

                                            <div className="contact-icon">
                                                ✓
                                            </div>

                                            <div>
                                                <span>RESPONSE TIME</span>
                                                <strong>
                                                    Within 24 hours
                                                </strong>
                                            </div>

                                        </div>

                                    </div>


                                    {/* Process */}

                                    <div className="hire-process">

                                        <h3>
                                            What Happens Next
                                        </h3>


                                        <div className="process-item">

                                            <div className="process-number">
                                                1
                                            </div>

                                            <div>
                                                <h4>
                                                    We Review Your Request
                                                </h4>

                                                <p>
                                                    Our technology expert
                                                    reviews your requirements
                                                    and identifies the right
                                                    developer or team for your
                                                    project.
                                                </p>
                                            </div>

                                        </div>


                                        <div className="process-item">

                                            <div className="process-number">
                                                2
                                            </div>

                                            <div>
                                                <h4>
                                                    We Contact You
                                                </h4>

                                                <p>
                                                    We'll reach out within
                                                    24 hours to understand your
                                                    project, timeline, and
                                                    technical needs.
                                                </p>
                                            </div>

                                        </div>


                                        <div className="process-item">

                                            <div className="process-number">
                                                3
                                            </div>

                                            <div>
                                                <h4>
                                                    We Build Your Team
                                                </h4>

                                                <p>
                                                    Get matched with the right
                                                    developers and technology
                                                    specialists for your project.
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =========================================
                            RIGHT FORM
                        ========================================= */}

                        <div className="col-lg-6">

                            <div className="hire-form-card">

                                <div className="hire-form-header">

                                    <h2>
                                        Tell Us About Your
                                        <span> Development Needs</span>
                                    </h2>

                                    <p>
                                        Fill out the form and our team will
                                        get back to you within 24 hours.
                                    </p>

                                </div>


                                <form>

                                    {/* Name + Email */}

                                    <div className="row g-3">

                                        <div className="col-md-6">

                                            <label htmlFor="name">
                                                Your Name
                                                <span>*</span>
                                            </label>

                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                placeholder="E.g. John Smith"
                                                required
                                            />

                                        </div>


                                        <div className="col-md-6">

                                            <label htmlFor="email">
                                                Contact Email
                                                <span>*</span>
                                            </label>

                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="E.g. you@example.com"
                                                required
                                            />

                                        </div>


                                        {/* Phone + Company */}

                                        <div className="col-md-6">

                                            <label htmlFor="phone">
                                                Phone
                                                <span>*</span>
                                            </label>

                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className="form-control"
                                                placeholder="E.g. +91 98765 43210"
                                                required
                                            />

                                        </div>


                                        <div className="col-md-6">

                                            <label htmlFor="company">
                                                Company Name
                                                <small>
                                                    [Optional]
                                                </small>
                                            </label>

                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                className="form-control"
                                                placeholder="E.g. Acme Corp"
                                            />

                                        </div>


                                        {/* Requirements */}

                                        <div className="col-12">

                                            <label htmlFor="message">
                                                How can we help?
                                                <span>*</span>
                                            </label>

                                            <textarea
                                                id="message"
                                                name="message"
                                                className="form-control"
                                                rows="5"
                                                placeholder="Tell us about your project, required developers, technologies, timeline, or any other requirements..."
                                                required
                                            ></textarea>

                                        </div>

                                    </div>


                                    {/* =================================
                                        CONSULTATION
                                    ================================= */}

                                    <div className="consultation-section">

                                        <h3>
                                            Schedule Your Consultation
                                        </h3>


                                        <label className="booking-check">

                                            <input
                                                type="checkbox"
                                                name="bookCall"
                                            />

                                            <span>
                                                Click here to book a 20 min call
                                            </span>

                                        </label>


                                        {/* Date & Time + Time Zone */}

                                        <div className="row g-3">

                                            <div className="col-md-6">

                                                <label htmlFor="preferredDateTime">
                                                    Preferred Date & Time
                                                </label>

                                                <input
                                                    type="datetime-local"
                                                    id="preferredDateTime"
                                                    name="preferredDateTime"
                                                    className="form-control"
                                                />

                                            </div>


                                            <div className="col-md-6">

                                                <label htmlFor="timeZone">
                                                    Time Zone
                                                </label>

                                                <select
                                                    id="timeZone"
                                                    name="timeZone"
                                                    className="form-select"
                                                    defaultValue="America/New_York"
                                                >

                                                    <option value="America/New_York">
                                                        New York, Washington (UTC-05:00)
                                                    </option>

                                                    <option value="America/Chicago">
                                                        Chicago (UTC-06:00)
                                                    </option>

                                                    <option value="America/Denver">
                                                        Denver (UTC-07:00)
                                                    </option>

                                                    <option value="America/Los_Angeles">
                                                        Los Angeles (UTC-08:00)
                                                    </option>

                                                    <option value="Asia/Kolkata">
                                                        India Standard Time (UTC+05:30)
                                                    </option>

                                                    <option value="Europe/London">
                                                        London (UTC+00:00)
                                                    </option>

                                                    <option value="Europe/Berlin">
                                                        Berlin (UTC+01:00)
                                                    </option>

                                                    <option value="Asia/Dubai">
                                                        Dubai (UTC+04:00)
                                                    </option>

                                                    <option value="Asia/Singapore">
                                                        Singapore (UTC+08:00)
                                                    </option>

                                                </select>

                                            </div>

                                        </div>


                                        {/* Submit */}

                                        <button
                                            type="submit"
                                            className="hire-submit-btn"
                                        >
                                            Book Your Consultation Now
                                        </button>


                                        <p className="response-note">
                                            We respond within 24 hours.
                                        </p>


                                        <p className="privacy-note">
                                            <span>*</span> By requesting a
                                            consultation, you agree to the
                                            terms of SoftBild's privacy policy.
                                        </p>


                                        <p className="captcha-note">
                                            This site is protected by reCAPTCHA
                                            and the Google
                                            <a href="#">
                                                Privacy Policy
                                            </a>
                                            and
                                            <a href="#">
                                                Terms of Service
                                            </a>
                                            apply.
                                        </p>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                CTA
            ========================================= */}

            <section className="container-fluid py-100 bg-img-overlay1 color-overlay1">

                <div className="container">

                    <div className="row">

                        <div className="col-lg-3"></div>

                        <div className="col-lg-6 text-center color-overlay1-content">

                            <h2 className="light-subtitle">
                                Need The Right Developers For
                                <span> Your Project?</span>
                            </h2>

                            <Link
                                to="/Contact"
                                className="sf-btn5 mt-20"
                            >
                                Let's Talk
                            </Link>

                        </div>

                        <div className="col-lg-3"></div>

                    </div>

                </div>

            </section>


            {/* =========================================
                NEWSLETTER
            ========================================= */}

            <HomeCta />

        </>
    );
}

export default HireDeveloper;