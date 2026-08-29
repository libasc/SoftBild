import React, { useEffect, useState } from "react";
import "./HireDeveloperModal.css";

function HireDeveloperModal({
    isOpen,
    onClose,
    selectedDeveloper = ""
}) {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        projectType: "",
        developerType: selectedDeveloper,
        experience: "",
        engagement: "",
        technologies: "",
        duration: "",
        startDate: "",
        description: "",
        file: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (selectedDeveloper) {
            setFormData((prev) => ({
                ...prev,
                developerType: selectedDeveloper
            }));
        }
    }, [selectedDeveloper]);

    // Prevent background scrolling
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // ESC key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);


    const handleChange = (e) => {

        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setIsSubmitting(true);

        // Connect your API/email service here
        console.log("Hire Developer Request:", formData);

        // Temporary simulation
        setTimeout(() => {

            setIsSubmitting(false);

            alert(
                "Thank you! Your requirement has been submitted successfully."
            );

            onClose();

        }, 1200);
    };


    if (!isOpen) {
        return null;
    }


    return (
        <div
            className="hire-modal-overlay"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >

            <div className="hire-modal">

                {/* Close Button */}
                <button
                    type="button"
                    className="hire-modal-close"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    ×
                </button>


                <div className="hire-modal-content">


                    {/* =================================
                        LEFT PANEL
                    ================================= */}

                    <div className="hire-modal-left">

                        <div className="hire-modal-icon">
                            &lt;/&gt;
                        </div>

                        <span className="hire-modal-small-title">
                            SOFTBILD TALENT
                        </span>

                        <h2>
                            Hire Top
                            <br />
                            <span>Developers</span>
                        </h2>

                        <p className="hire-modal-description">
                            Tell us about your project and our team
                            will help you find the right developer
                            for your business.
                        </p>


                        {/* Benefits */}

                        <div className="hire-benefits">

                            <div className="hire-benefit">
                                <div className="benefit-icon">
                                    ✓
                                </div>

                                <div>
                                    <strong>
                                        Skilled Developers
                                    </strong>

                                    <span>
                                        Pre-vetted technical talent
                                    </span>
                                </div>
                            </div>


                            <div className="hire-benefit">
                                <div className="benefit-icon">
                                    ◈
                                </div>

                                <div>
                                    <strong>
                                        Flexible Engagement
                                    </strong>

                                    <span>
                                        Choose a model that fits
                                    </span>
                                </div>
                            </div>


                            <div className="hire-benefit">
                                <div className="benefit-icon">
                                    ◷
                                </div>

                                <div>
                                    <strong>
                                        Time Zone Aligned
                                    </strong>

                                    <span>
                                        Convenient collaboration
                                    </span>
                                </div>
                            </div>


                            <div className="hire-benefit">
                                <div className="benefit-icon">
                                    $
                                </div>

                                <div>
                                    <strong>
                                        Competitive Pricing
                                    </strong>

                                    <span>
                                        Flexible rates for your budget
                                    </span>
                                </div>
                            </div>

                        </div>


                        <div className="hire-left-bottom">

                            <div className="code-decoration">
                                {"{ }"}
                            </div>

                            <div className="code-decoration code-decoration-2">
                                &lt;/&gt;
                            </div>

                        </div>

                    </div>



                    {/* =================================
                        RIGHT FORM
                    ================================= */}

                    <div className="hire-modal-right">

                        <div className="hire-form-header">

                            <span className="hire-form-line"></span>

                            <h3>
                                Submit Your Requirement
                            </h3>

                            <p>
                                Tell us what you're looking for.
                                We'll get back to you shortly.
                            </p>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="hire-form-grid">


                                {/* Full Name */}

                                <div className="hire-field">

                                    <label>
                                        Full Name <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* Email */}

                                <div className="hire-field">

                                    <label>
                                        Work Email <span>*</span>
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your work email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* Company */}

                                <div className="hire-field">

                                    <label>
                                        Company Name
                                    </label>

                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Enter your company name"
                                        value={formData.company}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* Phone */}

                                <div className="hire-field">

                                    <label>
                                        Phone / WhatsApp <span>*</span>
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* Project Type */}

                                <div className="hire-field">

                                    <label>
                                        Project Type <span>*</span>
                                    </label>

                                    <select
                                        name="projectType"
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select project type
                                        </option>

                                        <option value="Website">
                                            Website
                                        </option>

                                        <option value="Web Application">
                                            Web Application
                                        </option>

                                        <option value="Mobile Application">
                                            Mobile Application
                                        </option>

                                        <option value="Custom Software">
                                            Custom Software
                                        </option>

                                        <option value="E-commerce">
                                            E-commerce
                                        </option>

                                        <option value="ERP / CRM">
                                            ERP / CRM
                                        </option>

                                        <option value="AI / ML">
                                            AI / Machine Learning
                                        </option>

                                        <option value="Blockchain">
                                            Blockchain / Web3
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                </div>


                                {/* Developer Type */}

                                <div className="hire-field">

                                    <label>
                                        Developer Type <span>*</span>
                                    </label>

                                    <select
                                        name="developerType"
                                        value={formData.developerType}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select developer type
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

                                        <option value="Team">
                                            Dedicated Development Team
                                        </option>

                                    </select>

                                </div>


                                {/* Experience */}

                                <div className="hire-field">

                                    <label>
                                        Experience Level <span>*</span>
                                    </label>

                                    <select
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select experience
                                        </option>

                                        <option value="1-2 Years">
                                            1–2 Years
                                        </option>

                                        <option value="2-5 Years">
                                            2–5 Years
                                        </option>

                                        <option value="5+ Years">
                                            5+ Years
                                        </option>

                                        <option value="Flexible">
                                            Flexible / Need Guidance
                                        </option>

                                    </select>

                                </div>


                                {/* Engagement */}

                                <div className="hire-field">

                                    <label>
                                        Engagement Model <span>*</span>
                                    </label>

                                    <select
                                        name="engagement"
                                        value={formData.engagement}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select engagement model
                                        </option>

                                        <option value="Hourly">
                                            Hourly
                                        </option>

                                        <option value="Part-Time">
                                            Part-Time
                                        </option>

                                        <option value="Full-Time">
                                            Full-Time
                                        </option>

                                        <option value="Dedicated Team">
                                            Dedicated Team
                                        </option>

                                        <option value="Project Based">
                                            Project Based
                                        </option>

                                    </select>

                                </div>


                                {/* Technologies */}

                                <div className="hire-field full-width">

                                    <label>
                                        Technologies / Skills Required <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="technologies"
                                        placeholder="e.g. React, Node.js, Python, AI, AWS"
                                        value={formData.technologies}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* Duration */}

                                <div className="hire-field">

                                    <label>
                                        Estimated Project Duration <span>*</span>
                                    </label>

                                    <select
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select duration
                                        </option>

                                        <option value="Less than 1 Month">
                                            Less than 1 Month
                                        </option>

                                        <option value="1-3 Months">
                                            1–3 Months
                                        </option>

                                        <option value="3-6 Months">
                                            3–6 Months
                                        </option>

                                        <option value="6-12 Months">
                                            6–12 Months
                                        </option>

                                        <option value="12+ Months">
                                            12+ Months
                                        </option>

                                        <option value="Ongoing">
                                            Ongoing
                                        </option>

                                    </select>

                                </div>


                                {/* Start Date */}

                                <div className="hire-field">

                                    <label>
                                        Expected Start Date
                                    </label>

                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* Description */}

                                <div className="hire-field full-width">

                                    <label>
                                        Project Description <span>*</span>
                                    </label>

                                    <textarea
                                        name="description"
                                        rows="4"
                                        maxLength="1000"
                                        placeholder="Tell us about your project, requirements and goals..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />

                                    <small className="character-count">
                                        {formData.description.length}/1000
                                    </small>

                                </div>


                                {/* File */}

                                <div className="hire-field full-width">

                                    <label>
                                        Upload Project Brief
                                        <small> (Optional)</small>
                                    </label>

                                    <label className="hire-file-upload">

                                        <input
                                            type="file"
                                            name="file"
                                            accept=".pdf,.doc,.docx,.zip"
                                            onChange={handleChange}
                                        />

                                        <div className="upload-icon">
                                            ↑
                                        </div>

                                        <div>

                                            <strong>
                                                Click to upload or drag and drop
                                            </strong>

                                            <span>
                                                PDF, DOC, DOCX or ZIP
                                                (Max 10MB)
                                            </span>

                                        </div>

                                    </label>

                                    {formData.file && (
                                        <div className="selected-file">
                                            {formData.file.name}
                                        </div>
                                    )}

                                </div>

                            </div>


                            {/* Form Footer */}

                            <div className="hire-form-footer">

                                <div className="security-message">

                                    <div className="security-icon">
                                        🔒
                                    </div>

                                    <span>
                                        Your information is secure and
                                        will never be shared.
                                    </span>

                                </div>


                                <button
                                    type="submit"
                                    className="submit-requirement-btn"
                                    disabled={isSubmitting}
                                >

                                    {isSubmitting
                                        ? "Submitting..."
                                        : "Submit Requirement"
                                    }

                                    {!isSubmitting && (
                                        <span>→</span>
                                    )}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default HireDeveloperModal;