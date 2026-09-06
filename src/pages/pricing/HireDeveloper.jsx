import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

    const formatDateTimeLocal = (date) => {
        if (!date) return "";

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };


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

const [captcha, setCaptcha] = useState({
    challenge: "",
    type: ""
});

const [captchaAnswer, setCaptchaAnswer] = useState("");
const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);

const loadCaptcha = useCallback(async () => {
    setIsCaptchaLoading(true);
    setCaptchaAnswer("");

    try {
        const response = await fetch("/api/captcha", {
            method: "GET",
            credentials: "same-origin",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message ||
                "Unable to load security verification."
            );
        }

        setCaptcha({
            challenge: result.challenge,
            type: result.type
        });
    } catch (error) {
        console.error("CAPTCHA loading error:", error);

        setCaptcha({
            challenge: "",
            type: ""
        });

        alert(
            "Unable to load security verification. Please refresh the page and try again."
        );
    } finally {
        setIsCaptchaLoading(false);
    }
}, []);
useEffect(() => {
    loadCaptcha();
}, [loadCaptcha]);


const [formErrors, setFormErrors] = useState({});


    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [phoneCountry, setPhoneCountry] = useState({
    countryCode: "us",
    dialCode: "1",
    name: "United States"
});


const [selectedDateTime, setSelectedDateTime] = useState(null);

useEffect(() => {
    setFormData((prev) => ({
        ...prev,
        dateTime: formatDateTimeLocal(selectedDateTime),
    }));
}, [selectedDateTime]);

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
    }));

    setFormErrors((prev) => ({
        ...prev,
        [name]: ""
    }));
};

const validatePhoneNumber = (value, country) => {
    if (!value || !country?.countryCode) {
        return false;
    }

    try {
        const phoneNumber = parsePhoneNumberFromString(`+${value}`);

        if (!phoneNumber) {
            return false;
        }

        // Make sure the number belongs
        // to the selected country.
        if (
            phoneNumber.country &&
            phoneNumber.country.toLowerCase() !==
                country.countryCode.toLowerCase()
        ) {
            return false;
        }

        return phoneNumber.isValid();
    } catch {
        return false;
    }
};


const handlePhoneChange = (value, country) => {
    setPhoneCountry(country);

    setFormData((prev) => ({
        ...prev,
        phone: value
    }));

    setFormErrors((prev) => ({
        ...prev,
        phone: ""
    }));
};


const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    // Clear previous errors
    setFormErrors({});

    const errors = {};

    // =========================================
    // NAME VALIDATION
    // =========================================

    if (!formData.name.trim()) {
        errors.name = "Your Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
        errors.name = "Please enter a valid name.";
    } else if (formData.name.trim().length < 2) {
        errors.name = "Your Name must be at least 2 characters.";
    } else if (formData.name.trim().length > 50) {
        errors.name = "Your Name cannot exceed 50 characters.";
    }


    // =========================================
    // EMAIL VALIDATION
    // =========================================

    if (!formData.email.trim()) {
        errors.email = "Contact Email is required.";
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            formData.email.trim()
        )
    ) {
        errors.email = "Please enter a valid email.";
    }


    // =========================================
    // PHONE VALIDATION
    // =========================================

    if (!formData.phone) {
        errors.phone = "Phone is required.";
    } else {
        const phoneNumber = parsePhoneNumberFromString(
            `+${formData.phone}`
        );

        if (!phoneNumber) {
            errors.phone = "Please enter a valid phone number.";
        } else if (
            phoneNumber.country &&
            phoneCountry?.countryCode &&
            phoneNumber.country.toLowerCase() !==
                phoneCountry.countryCode.toLowerCase()
        ) {
            errors.phone = `Please enter a valid ${phoneCountry.name} phone number.`;
        } else if (!phoneNumber.isValid()) {
            errors.phone = "Please enter a valid phone number.";
        }
    }


    // =========================================
    // PROJECT REQUIREMENTS VALIDATION
    // =========================================

    if (!formData.requirements.trim()) {
        errors.requirements =
            "Project requirements are required.";
    }


    // =========================================
    // CAPTCHA VALIDATION
    // =========================================

    if (!captchaAnswer.trim()) {
        errors.captchaAnswer =
            "Please complete the security verification.";
    }


    // =========================================
    // CONSULTATION DATE/TIME VALIDATION
    // =========================================

    if (formData.consultation && !selectedDateTime) {
        errors.dateTime =
            "Please select a preferred date and time.";
    }


    // =========================================
    // SHOW VALIDATION ERRORS
    // =========================================

    if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
    }


    // =========================================
    // START SUBMISSION
    // =========================================

    setIsSubmitting(true);


    // =========================================
    // PREPARE SUBMISSION DATA
    // =========================================

    const submissionData = {
        formType: "hire-developer",

        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,

        projectType: formData.projectType,
        developers: formData.developers,

        requirements: formData.requirements,

        consultation: formData.consultation,

        dateTime: selectedDateTime
            ? selectedDateTime.toLocaleString()
            : "",

        timezone: formData.timezone,

        captchaAnswer: captchaAnswer,
    };


    // =========================================
    // SEND TO NODEMAILER API
    // =========================================

    try {
        const response = await fetch("/api/send-email", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            credentials: "same-origin",

            body: JSON.stringify(submissionData),
        });


        const result = await response.json();


        // =========================================
        // HANDLE API ERROR
        // =========================================

        if (!response.ok) {

            // CAPTCHA ERROR
            if (
                result.message &&
                result.message
                    .toLowerCase()
                    .includes("captcha")
            ) {
                setFormErrors((prev) => ({
                    ...prev,
                    captchaAnswer:
                        result.message ||
                        "Invalid CAPTCHA. Please try again.",
                }));

                // Clear entered CAPTCHA
                setCaptchaAnswer("");

                // Generate new CAPTCHA
                await loadCaptcha();

            } else {
                setFormErrors((prev) => ({
                    ...prev,
                    submit:
                        result.message ||
                        "Failed to send your request. Please try again.",
                }));
            }

            return;
        }


        // =========================================
        // SUCCESS
        // =========================================

        setShowSuccessModal(true);


        // =========================================
        // RESET FORM
        // =========================================

        setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            projectType: "",
            developers: "",
            requirements: "",
            consultation: false,
            timezone: "New York, Washington (UTC-05:00)",
        });

        setSelectedDateTime(null);

        setFormErrors({});

        setCaptchaAnswer("");

        // Load fresh CAPTCHA
        await loadCaptcha();


    } catch (error) {

        console.error(
            "Failed to send Hire Developer form:",
            error
        );

        setFormErrors((prev) => ({
            ...prev,
            submit:
                "Something went wrong while sending your request. Please try again.",
        }));

    } finally {
        setIsSubmitting(false);
    }
};

useEffect(() => {
    if (!showSuccessModal) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
        document.body.style.overflow = originalOverflow;
    };
}, [showSuccessModal]);



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

            <section className="container-fluid py-80 position-relative bg-img-top">

                {/* <div className="hire-bg-circle hire-bg-circle-one"></div>
                <div className="hire-bg-circle hire-bg-circle-two"></div> */}


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
                            </div>
                        </div>


                        {/* =================================
                            RIGHT FORM
                        ================================= */}

                        <div className="col-lg-6 phone-mt-0">

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
                                                    <span class="text-danger">*</span>
                                                </label>

                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="e.g. John Smith"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />

                                                {formErrors.name && (
                                                    <div className="field-error">
                                                        {formErrors.name}
                                                    </div>
                                                )}

                                            </div>


                                            <div className="col-md-6">

                                                <label htmlFor="email">
                                                    Contact Email
                                                    <span class="text-danger">*</span>
                                                </label>

                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="e.g. you@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                {formErrors.email && (
                                                    <div className="field-error">
                                                        {formErrors.email}
                                                    </div>
                                                )}

                                            </div>


                                            {/* PHONE */}

                                            <div className="col-md-6">

                                                <label htmlFor="phone">
                                                    Phone
                                                    <span class="text-danger">*</span>
                                                </label>

                                                
{/* <PhoneInput
    country={"us"}
    value={formData.phone}
    onChange={handlePhoneChange}
    inputClass="form-control"
    inputStyle={{
        width: "100%"
    }}
    enableSearch={true}
    placeholder="Enter phone number"
/> */}

<PhoneInput
    country="us"
    value={formData.phone}
    onChange={handlePhoneChange}
    inputClass="form-control hiredevphone"
    inputStyle={{
        width: "100%",
    }}
    enableSearch={true}
    autoFormat={true}
    countryCodeEditable={false}
    placeholder="Enter phone number"
    inputProps={{
        name: "phone",
        autoComplete: "tel",
    }}
/>

{formErrors.phone && (
    <div className="field-error">
        {formErrors.phone}
    </div>
)}

                                            </div>


                                            {/* COMPANY */}

                                            <div className="col-md-6">

                                                <label htmlFor="company">
                                                    Company Name
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
                                                    <span class="text-danger">*</span>
                                                </label>

                                                <textarea
                                                    id="requirements"
                                                    name="requirements"
                                                    className="form-control hire-textarea"
                                                    placeholder="Tell us about your project, required developers, technologies, timeline or any other requirements..."
                                                    value={formData.requirements}
                                                    onChange={handleChange}
                                                ></textarea>

                                                {formErrors.requirements && (
                                                    <div className="field-error">
                                                        {formErrors.requirements}
                                                    </div>
                                                )}

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
                                                    <div className="hire-date-picker-wrapper">
                                                        <FaCalendarAlt className="hire-date-picker-icon" />
                                                        <DatePicker
                                                            selected={selectedDateTime}
                                                            onChange={(date) => {
                                                                setSelectedDateTime(date);
                                                            }}
                                                            showTimeSelect
                                                            timeIntervals={30}
                                                            timeFormat="hh:mm aa"
                                                            dateFormat="dd-MM-yyyy hh:mm aa"
                                                            minDate={new Date()}
                                                            placeholderText="dd-mm-yyyy --:--"
                                                            id="dateTime"
                                                            name="dateTime"
                                                            className="form-control hire-date-picker-input"
                                                            wrapperClassName="hire-date-picker"
                                                            autoComplete="off"
                                                            showPopperArrow={false}
                                                            popperPlacement="bottom-start"
                                                        />

                                                        {formErrors.dateTime && (
                                                            <div className="field-error">
                                                                {formErrors.dateTime}
                                                            </div>
                                                        )}
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





                                        {/* CAPTCHA */}
<div className="form-group captcha-group mt-3">
    <label htmlFor="captchaAnswer">
        Security Verification <span class="text-danger">*</span>
    </label>

    <div className="captcha-row">
        <div className="captcha-question form-control">
            {isCaptchaLoading
                ? "Loading..."
                : captcha.challenge}
        </div>

        <button
            type="button"
            className="captcha-refresh form-control"
            onClick={loadCaptcha}
            disabled={isCaptchaLoading}
            aria-label="Refresh CAPTCHA"
            title="Refresh CAPTCHA"
        >
            ⟳
        </button>

        <input
            type="text"
            id="captchaAnswer"
            name="captchaAnswer"
            value={captchaAnswer}
            onChange={(e) =>
                setCaptchaAnswer(e.target.value)
            }
            placeholder="Enter the answer"
            autoComplete="off"
            disabled={
                isCaptchaLoading ||
                !captcha.challenge
            }
            className="captcha-answer form-control"
        />
    </div>

    {formErrors.captchaAnswer && (
        <div className="field-error">
            {formErrors.captchaAnswer}
        </div>
    )}
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
                                            className="btn btn-primary sf-btn6 mt-20 w-100"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="submit-spinner"></span>
                                                    Sending Request...
                                                </>
                                            ) : (
                                                <>
                                                    Book Your Consultation Now
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


{showSuccessModal && (
    <div
        className="hire-success-overlay"
        onClick={() => setShowSuccessModal(false)}
    >
        <div
            className="hire-success-modal"
            onClick={(e) => e.stopPropagation()}
        >

            {/* Close */}
            <button
                type="button"
                className="hire-success-close"
                onClick={() => setShowSuccessModal(false)}
                aria-label="Close"
            >
                ×
            </button>


            {/* Success Icon */}
            <div className="hire-success-icon">
                <FaCheck />
            </div>


            {/* Message */}
            <div className="hire-success-content">
                <h2>
                    Thank You!
                </h2>

                <p className="hire-success-main-text">
                    We've received your request successfully.
                </p>

                <p className="hire-success-description">
                    Thank you for reaching out to us. Our team will
                    review your requirements and get in touch with you
                    shortly to discuss your project and the next steps.
                </p>

            </div>


            {/* Footer */}
            {/* <div className="hire-success-footer">

                <div className="hire-success-response">
                    <FaClock />
                    <span>
                        Our team typically responds within 24 hours.
                    </span>
                </div>

                <button
                    type="button"
                    className="hire-success-done-btn"
                    onClick={() => setShowSuccessModal(false)}
                >
                    Done
                    <FaArrowRight />
                </button>

            </div> */}

        </div>
    </div>
)}
            

        </>
    );
}


export default HireDeveloper;