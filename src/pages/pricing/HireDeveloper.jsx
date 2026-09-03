import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
    FaCode,
    FaUsers,
    FaGlobe,
    FaClock,
    FaPhoneAlt,
    FaEnvelope,
    FaComments,
    FaCheck,
    FaArrowRight,
    FaLaptopCode,
    FaLayerGroup,
    FaHeadset,
    FaCalendarAlt,
    FaShieldAlt
} from "react-icons/fa";

import HomeCta from "../../components/app-components/HomeCta";

import "./HireDeveloper.css";
import HomeCta2 from "../../components/app-components/HomeCta2";


function HireDeveloper() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        developers: "",
        requirements: "",
        consultation: false,
        dateTime: "",
        timezone: "New York, Washington (UTC-05:00)"
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    };


const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
        const response = await fetch("/api/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to send form");
        }

        console.log("Form submitted successfully:", result);

        // Reset form
        setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            projectType: "",
            developers: "",
            requirements: "",
            consultation: false,
            dateTime: "",
            timezone: "New York, Washington (UTC-05:00)"
        });

        // Show custom success modal
        setShowSuccessModal(true);

    } catch (error) {
        console.error("Form submission error:", error);

        alert(
            "Sorry, something went wrong while submitting the form. Please try again."
        );

    } finally {
        setIsSubmitting(false);
    }
};


    return (
        <>

            <Helmet>

                <title>
                    Hire Developers & Technology Experts | SoftBild
                </title>

                <meta
                    name="description"
                    content="Hire experienced developers, designers and technology specialists from SoftBild. Build your dedicated development team based on your project requirements."
                />

                <meta
                    name="keywords"
                    content="hire developers, hire software developers, dedicated developers, dedicated development team, software development team, hire technology experts"
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
                    content="Hire Developers & Technology Experts | SoftBild"
                />

                <meta
                    property="og:description"
                    content="Build your development team with experienced developers and technology specialists from SoftBild."
                />

                <meta
                    property="og:type"
                    content="website"
                />

            </Helmet>


            {/* =========================================
                HERO / HIRE SECTION
            ========================================== */}

            <section className="hire-developer-section">

                <div className="hire-bg-circle hire-bg-circle-one"></div>
                <div className="hire-bg-circle hire-bg-circle-two"></div>


                <div className="container">

                    <div className="row align-items-start g-5">


                        {/* =================================
                            LEFT CONTENT
                        ================================= */}

                        <div className="col-lg-6">

                            <div className="hire-left-content">


                                <h1 className="dark-subtitle">

                                    Build Your Team With
                                    <span> The Right <span className="text-gradient1">Technology Experts</span></span>

                                </h1>


                                <p className="hire-main-description">

                                    Get experienced developers, designers and
                                    technology specialists who understand your
                                    business goals and can become an extension
                                    of your team.

                                </p>


                                {/* VALUE PROPOSITIONS */}

                                <div className="hire-benefits">

                                    <div className="hire-benefit">

                                        <div className="hire-benefit-icon">
                                            <FaLaptopCode />
                                        </div>

                                        <div>
                                            <h4>Skilled Technology Experts</h4>

                                            <p>
                                                Access experienced professionals
                                                across modern technologies.
                                            </p>
                                        </div>

                                    </div>


                                    <div className="hire-benefit">

                                        <div className="hire-benefit-icon">
                                            <FaLayerGroup />
                                        </div>

                                        <div>
                                            <h4>Flexible Engagement</h4>

                                            <p>
                                                Hire an individual developer,
                                                specialist or complete team.
                                            </p>
                                        </div>

                                    </div>


                                    <div className="hire-benefit">

                                        <div className="hire-benefit-icon">
                                            <FaHeadset />
                                        </div>

                                        <div>
                                            <h4>Dedicated Support</h4>

                                            <p>
                                                Work with a reliable team from
                                                planning through delivery.
                                            </p>
                                        </div>

                                    </div>

                                </div>


                                {/* TRUST NUMBERS */}

                                <div className="hire-trust-strip">


                                    <div className="hire-trust-item">

                                        <strong>7+</strong>

                                        <span>Years Experience</span>

                                    </div>


                                    <div className="hire-trust-divider"></div>


                                    <div className="hire-trust-item">

                                        <strong>100+</strong>

                                        <span>Projects Delivered</span>

                                    </div>


                                    <div className="hire-trust-divider"></div>


                                    <div className="hire-trust-item">

                                        <strong>15+</strong>

                                        <span>Countries Served</span>

                                    </div>


                                    <div className="hire-trust-divider"></div>


                                    <div className="hire-trust-item">

                                        <strong>24h</strong>

                                        <span>Response Time</span>

                                    </div>


                                </div>


                                {/* WHAT HAPPENS NEXT */}

                                <div className="hire-process-wrapper">


                                    <div className="hire-process-header">

                                        <span className="hire-small-label">
                                            SIMPLE PROCESS
                                        </span>

                                        <h2>
                                            What Happens Next?
                                        </h2>

                                        <p>
                                            From your first conversation to
                                            building the right development team.
                                        </p>

                                    </div>


                                    <div className="hire-process-list">


                                        <div className="hire-process-item">

                                            <div className="hire-process-number">
                                                01
                                            </div>

                                            <div className="hire-process-content">

                                                <h4>
                                                    We Review Your Request
                                                </h4>

                                                <p>
                                                    Our technology experts review
                                                    your requirements and identify
                                                    the right skills for your project.
                                                </p>

                                            </div>

                                        </div>


                                        <div className="hire-process-item">

                                            <div className="hire-process-number">
                                                02
                                            </div>

                                            <div className="hire-process-content">

                                                <h4>
                                                    We Contact You
                                                </h4>

                                                <p>
                                                    We get in touch within 24 hours
                                                    to understand your project,
                                                    timeline and technical needs.
                                                </p>

                                            </div>

                                        </div>


                                        <div className="hire-process-item">

                                            <div className="hire-process-number">
                                                03
                                            </div>

                                            <div className="hire-process-content">

                                                <h4>
                                                    We Build Your Team
                                                </h4>

                                                <p>
                                                    Get matched with developers and
                                                    technology specialists suited to
                                                    your project.
                                                </p>

                                            </div>

                                        </div>


                                    </div>

                                </div>


                                {/* CONTACT OPTIONS */}

                                {/* <div className="hire-contact-row">


                                    <a
                                        href="tel:+919000000000"
                                        className="hire-contact-box"
                                    >

                                        <div className="hire-contact-icon">
                                            <FaPhoneAlt />
                                        </div>

                                        <div>
                                            <small>CALL US</small>
                                            <strong>+91 90000 00000</strong>
                                        </div>

                                    </a>


                                    <a
                                        href="mailto:info@softbild.com"
                                        className="hire-contact-box"
                                    >

                                        <div className="hire-contact-icon">
                                            <FaEnvelope />
                                        </div>

                                        <div>
                                            <small>EMAIL US</small>
                                            <strong>info@softbild.com</strong>
                                        </div>

                                    </a>


                                    <div className="hire-contact-box">

                                        <div className="hire-contact-icon">
                                            <FaComments />
                                        </div>

                                        <div>
                                            <small>CHAT WITH US</small>
                                            <strong>Let's discuss your project</strong>
                                        </div>

                                    </div>


                                </div> */}
                            </div>
                        </div>


                        {/* =================================
                            RIGHT FORM
                        ================================= */}

                        <div className="col-lg-6">

                            <div className="hire-form-wrapper">


                                <div className="hire-form-card">
                                    {/* FORM HEADER */}
                                    <div className="hire-form-header">
                                        <h2>
                                            Tell Us About Your
                                            <span className="text-gradient1"> Development Needs</span>

                                        </h2>
                                        <p>
                                            Share a few details about your project
                                            and we'll help you find the right
                                            technology experts.
                                        </p>
                                    </div>


                                    <form onSubmit={handleSubmit}>


                                        {/* NAME + EMAIL */}

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
                                                    placeholder="e.g. John Smith"
                                                    value={formData.name}
                                                    onChange={handleChange}
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
                                                    placeholder="e.g. you@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>


                                            {/* PHONE */}

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
                                                    placeholder="e.g. +91 98765 43210"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>


                                            {/* COMPANY */}

                                            <div className="col-md-6">

                                                <label htmlFor="company">

                                                    Company Name

                                                    <small>
                                                        Optional
                                                    </small>

                                                </label>

                                                <input
                                                    type="text"
                                                    id="company"
                                                    name="company"
                                                    className="form-control"
                                                    placeholder="e.g. Acme Corp"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                />

                                            </div>


                                            {/* PROJECT TYPE */}

                                            <div className="col-md-6">

                                                <label htmlFor="projectType">
                                                    What do you need?
                                                </label>

                                                <select
                                                    id="projectType"
                                                    name="projectType"
                                                    className="form-select"
                                                    value={formData.projectType}
                                                    onChange={handleChange}
                                                >

                                                    <option value="">
                                                        Select service
                                                    </option>

                                                    <option value="Dedicated Developer">
                                                        Dedicated Developer
                                                    </option>

                                                    <option value="Development Team">
                                                        Dedicated Development Team
                                                    </option>

                                                    <option value="Web Development">
                                                        Web Development
                                                    </option>

                                                    <option value="Mobile Development">
                                                        Mobile App Development
                                                    </option>

                                                    <option value="UI UX">
                                                        UI/UX Design
                                                    </option>

                                                    <option value="AI">
                                                        AI & Machine Learning
                                                    </option>

                                                    <option value="Other">
                                                        Other
                                                    </option>

                                                </select>

                                            </div>


                                            {/* NUMBER OF DEVELOPERS */}

                                            <div className="col-md-6">

                                                <label htmlFor="developers">
                                                    Team Size
                                                </label>

                                                <select
                                                    id="developers"
                                                    name="developers"
                                                    className="form-select"
                                                    value={formData.developers}
                                                    onChange={handleChange}
                                                >

                                                    <option value="">
                                                        Select team size
                                                    </option>

                                                    <option value="1">
                                                        1 Developer
                                                    </option>

                                                    <option value="2-3">
                                                        2–3 Developers
                                                    </option>

                                                    <option value="4-6">
                                                        4–6 Developers
                                                    </option>

                                                    <option value="7+">
                                                        7+ Developers
                                                    </option>

                                                </select>

                                            </div>


                                            {/* REQUIREMENTS */}

                                            <div className="col-12">

                                                <label htmlFor="requirements">
                                                    Tell Us About Your Project
                                                    <span>*</span>
                                                </label>

                                                <textarea
                                                    id="requirements"
                                                    name="requirements"
                                                    className="form-control hire-textarea"
                                                    placeholder="Tell us about your project, required developers, technologies, timeline or any other requirements..."
                                                    value={formData.requirements}
                                                    onChange={handleChange}
                                                    required
                                                ></textarea>

                                            </div>

                                        </div>


                                        {/* CONSULTATION */}

                                        <div className="hire-consultation">


                                            <div className="hire-consultation-heading">

                                                <div>

                                                    <span className="hire-consultation-icon">
                                                        <FaCalendarAlt />
                                                    </span>

                                                    <div>

                                                        <h3>
                                                            Schedule a Consultation
                                                        </h3>

                                                        <p>
                                                            Prefer to discuss your
                                                            project directly?
                                                        </p>

                                                    </div>

                                                </div>


                                                <label className="hire-consultation-check">

                                                    <input
                                                        type="checkbox"
                                                        name="consultation"
                                                        checked={formData.consultation}
                                                        onChange={handleChange}
                                                    />

                                                    <span></span>

                                                    <strong>
                                                        Book a 20 min call
                                                    </strong>

                                                </label>

                                            </div>


                                            <div className="row g-3">


                                                {/* DATE TIME */}

                                                <div className="col-md-7">

                                                    <label htmlFor="dateTime">
                                                        Preferred Date & Time
                                                    </label>

                                                    <div className="hire-input-icon">

                                                        <FaCalendarAlt />

                                                        <input
                                                            type="datetime-local"
                                                            id="dateTime"
                                                            name="dateTime"
                                                            className="form-control"
                                                            value={formData.dateTime}
                                                            onChange={handleChange}
                                                        />

                                                    </div>

                                                </div>


                                                {/* TIMEZONE */}

                                                <div className="col-md-5">

                                                    <label htmlFor="timezone">
                                                        Time Zone
                                                    </label>

                                                    <select
                                                        id="timezone"
                                                        name="timezone"
                                                        className="form-select"
                                                        value={formData.timezone}
                                                        onChange={handleChange}
                                                    >

                                                        <option>
                                                            New York, Washington (UTC-05:00)
                                                        </option>

                                                        <option>
                                                            Los Angeles (UTC-08:00)
                                                        </option>

                                                        <option>
                                                            Chicago (UTC-06:00)
                                                        </option>

                                                        <option>
                                                            London (UTC+00:00)
                                                        </option>

                                                        <option>
                                                            Dubai (UTC+04:00)
                                                        </option>

                                                        <option>
                                                            India Standard Time (UTC+05:30)
                                                        </option>

                                                        <option>
                                                            Singapore (UTC+08:00)
                                                        </option>

                                                    </select>

                                                </div>


                                            </div>

                                        </div>


                                        {/* SUBMIT */}

                                        {/* <button
                                            type="submit"
                                            className="hire-submit-btn"
                                        >

                                            Book Your Consultation Now

                                            <FaArrowRight />

                                        </button> */}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="hire-submit-btn"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="submit-spinner"></span>
                                                    Sending Request...
                                                </>
                                            ) : (
                                                <>
                                                    Book Your Consultation Now
                                                    <FaArrowRight />
                                                </>
                                            )}
                                        </button>


                                        {/* TRUST NOTE */}

                                        {/* <div className="hire-form-trust">

                                            <div className="hire-trust-icon">
                                                <FaShieldAlt />
                                            </div>

                                            <div>

                                                <strong>
                                                    Your information is safe with us.
                                                </strong>

                                                <p>
                                                    We respect your privacy and will
                                                    never share your information with
                                                    third parties.
                                                </p>

                                            </div>

                                        </div> */}


                                        <p className="hire-response-note">
                                            <FaClock />
                                            We typically respond within 24 hours.
                                        </p>


                                        <p className="hire-privacy-note">

                                            By submitting this form, you agree to
                                            SoftBild's privacy policy and terms of service.

                                        </p>


                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                CTA
            ========================================== */}

            {/* <HomeCta2 /> */}


            {/* <HomeCta /> */}

        </>
    );
}


export default HireDeveloper;