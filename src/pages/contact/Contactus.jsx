import { useCallback, useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../pricing/HireDeveloper.css"

import ContactHeroSection from "../../components/app-components/ContactHeroSection";
import contactImage from "../../assets/images/SoftBild-contact-img-01.png";
import HomeCta from "../../components/app-components/HomeCta";
import { Link } from "react-router-dom";

import supportIcon from "../../assets/icons/email2.svg";
import salesIcon from "../../assets/icons/services-icon1.svg";
import phoneIcon from "../../assets/icons/call1.svg";
import supportIconWhite from "../../assets/icons/services-icon-white1.svg";

import { Helmet } from "react-helmet-async";
import { FaCheck } from "react-icons/fa";


function Contactus() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    description: "",
  });

const [errors, setErrors] = useState({});
const [isLoading, setIsLoading] = useState(false);
const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Consultation states
  const [consultationRequired, setConsultationRequired] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const [selectedTimezone, setSelectedTimezone] = useState(
    "New York, Washington (UTC-05:00)"
  );


  // CAPTCHA states
  const [captcha, setCaptcha] = useState(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);


  /*
   * ==========================================
   * LOAD CAPTCHA
   * ==========================================
   */

  const loadCaptcha = useCallback(async () => {
    try {
      setIsCaptchaLoading(true);

      const response = await fetch("/api/captcha", {
        method: "GET",
        credentials: "same-origin",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load CAPTCHA.");
      }

      setCaptcha({
        challenge: result.challenge,
        type: result.type,
      });

      setCaptchaAnswer("");
    } catch (error) {
      console.error("Failed to load CAPTCHA:", error);

      setErrors((prev) => ({
        ...prev,
        captchaAnswer: "Unable to load CAPTCHA. Please refresh the page.",
      }));
    } finally {
      setIsCaptchaLoading(false);
    }
  }, []);


  /*
   * ==========================================
   * LOAD CAPTCHA WHEN PAGE OPENS
   * ==========================================
   */

  useEffect(() => {
    loadCaptcha();
  }, [loadCaptcha]);


  /*
   * ==========================================
   * PHONE NUMBER
   * ==========================================
   */

const handleCountryChange = (value) => {
  setData({
    ...data,
    phone: value,
  });

  if (errors.phone) {
    setErrors((prev) => ({
      ...prev,
      phone: "",
    }));
  }
};


  /*
   * ==========================================
   * FORM VALIDATION
   * ==========================================
   */

const validateForm = () => {
  const newErrors = {};

  // Name Validation
  if (!data.name.trim()) {
    newErrors.name = "Your Name is required.";
  } else if (!/^[a-zA-Z\s]+$/.test(data.name)) {
    newErrors.name = "Please enter a valid name.";
  } else if (data.name.length < 2) {
    newErrors.name = "Your Name must be at least 2 characters.";
  } else if (data.name.length > 50) {
    newErrors.name = "Your Name cannot exceed 50 characters.";
  }

  // Email Validation
  if (!data.email.trim()) {
    newErrors.email = "Contact Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    newErrors.email = "Please enter a valid email.";
  }

  // Phone Number Validation
  if (!data.phone.trim()) {
    newErrors.phone = "Phone is required.";
  } else {
    const phoneWithoutCountryCode = data.phone.replace(
      /^\+?\d{1,4}\s?/,
      ""
    );

    if (!/^\d+$/.test(phoneWithoutCountryCode)) {
      newErrors.phone = "Phone must contain only digits.";
    } else if (
      phoneWithoutCountryCode.length < 4 ||
      phoneWithoutCountryCode.length > 12
    ) {
      newErrors.phone = "Enter a valid Phone Number.";
    }
  }

  // Message Validation
  const wordCount = data.description.trim()
    ? data.description.trim().split(/\s+/).length
    : 0;

  if (!data.description.trim()) {
    newErrors.description = "Message is required.";
  } else if (wordCount < 6) {
    newErrors.description = "Message must contain at least 6 words.";
  } else if (data.description.length > 250) {
    newErrors.description = "Message cannot exceed 250 characters.";
  }

  // CAPTCHA Validation
  if (!captchaAnswer.trim()) {
    newErrors.captchaAnswer = "Please enter the CAPTCHA answer.";
  }

  // Consultation Validation
  if (consultationRequired && !selectedDateTime) {
    newErrors.dateTime =
      "Please select a date and time for the consultation.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


  /*
   * ==========================================
   * FORM SUBMIT
   * ==========================================
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);


    /*
     * Send Contact Form to NodeMailer API
     */

    const submissionData = {
  formType: "contact",

  firstName: data.name,
  lastName: "",
  email: data.email,
  phone: data.phone,
  company: data.company,
  message: data.description,

  consultation: consultationRequired,

  dateTime: selectedDateTime
    ? selectedDateTime.toLocaleString()
    : "",

  timezone: selectedTimezone,

  captchaAnswer: captchaAnswer,
};


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


      /*
       * ==========================================
       * HANDLE API ERROR
       * ==========================================
       */

      if (!response.ok) {

        // CAPTCHA error
        if (
          result.message &&
          result.message.toLowerCase().includes("captcha")
        ) {
          setErrors((prev) => ({
            ...prev,
            captchaAnswer:
              result.message || "Invalid CAPTCHA. Please try again.",
          }));

          setCaptchaAnswer("");

          // Generate a new CAPTCHA
          await loadCaptcha();

        } else {
          setErrors((prev) => ({
            ...prev,
            submit:
              result.message ||
              "Failed to send your message. Please try again.",
          }));
        }

        return;
      }


      /*
       * ==========================================
       * SUCCESS
       * ==========================================
       */

      setShowSuccessModal(true);


      // Reset form
      setData({
        name: "",
        email: "",
        phone: "",
        company: "",
        description: "",
      });

      setConsultationRequired(false);
      setSelectedDateTime(null);

      setErrors({});
      setCaptchaAnswer("");

      // Generate a fresh CAPTCHA
      await loadCaptcha();

    } catch (error) {
      console.error("Failed to send contact form:", error);

      setErrors((prev) => ({
        ...prev,
        submit:
          "Something went wrong while sending your message. Please try again.",
      }));

    } finally {
      setIsLoading(false);
    }
  };


  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (
    <>
      <Helmet>
        <title>Contact SoftBild - Let's Connect and Collaborate</title>

        <meta
          name="description"
          content="Get in touch with SoftBild for innovative IT solutions. Contact us to discuss your project requirements or for business inquiries."
        />

        <meta
          name="keywords"
          content="contact SoftBild, get in touch, business inquiries, IT solutions, custom app development, collaboration"
        />

        <meta name="author" content="SoftBild" />
        <meta name="robots" content="index, follow" />

        <meta
          property="og:title"
          content="Contact SoftBild - Let's Connect and Collaborate"
        />

        <meta
          property="og:description"
          content="Contact SoftBild today to discuss your project or partnership opportunities. We're here to help."
        />

        <meta
          property="og:image"
          content="https://softbild.com/src/assets/images/SoftBild-contact-img-01.png"
        />

        <meta
          property="og:url"
          content="https://softbild.com/Contact"
        />

        <meta property="og:type" content="website" />
      </Helmet>


      <ContactHeroSection />


      {/* ==========================================
          CONTACT FORM SECTION
          ========================================== */}

      <section className="container-fluid py-80 position-relative bg-img-top">
        <div className="container">

          <div className="contact-section-wrapper">

            <div className="row">

              {/* LEFT SIDE */}
              <div className="col-lg-6">

                <h2 className="dark-subtitle">
                  Get in touch
                </h2>

                <p>
                  Our friendly team would love to hear from you.
                </p>


                {/* SUBMIT ERROR */}
                {errors.submit && (
                  <div
                    className="alert alert-danger mt-3"
                    role="alert"
                  >
                    {errors.submit}
                  </div>
                )}


                <form
                  className="row g-3 mt-3"
                  onSubmit={handleSubmit}
                >

                  {/* YOUR NAME */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Your Name<span className="text-danger">*</span>
                    </label>

                    <input
                      type="text"
                      className={`form-control borderInput ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      onChange={(e) => {
                        setData({
                          ...data,
                          name: e.target.value,
                        });

                        if (errors.name) {
                          setErrors((prev) => ({
                            ...prev,
                            name: "",
                          }));
                        }
                      }}
                      value={data.name}
                      maxLength="50"
                    />

                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name}
                      </div>
                    )}
                  </div>



                  {/* CONTACT EMAIL */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Contact Email<span className="text-danger">*</span>
                    </label>

                    <input
                      type="email"
                      className={`form-control borderInput ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      onChange={(e) => {
                        setData({
                          ...data,
                          email: e.target.value,
                        });

                        if (errors.email) {
                          setErrors((prev) => ({
                            ...prev,
                            email: "",
                          }));
                        }
                      }}
                      value={data.email}
                    />

                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email}
                      </div>
                    )}
                  </div>


                  {/* PHONE */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Phone<span className="text-danger">*</span>
                    </label>

                    <PhoneInput
                      country={"us"}
                      value={data.phone}
                      onChange={handleCountryChange}
                      inputClass={`form-control ${
                        errors.phone ? "is-invalid" : ""
                      }`}
                      inputStyle={{
                        width: "100%",
                        borderColor: errors.phone
                          ? "#dc3545"
                          : "#ced4da",
                      }}
                      enableSearch={true}
                      placeholder="Enter phone number"
                    />

                    {errors.phone && (
                      <div className="invalid-feedback d-block">
                        {errors.phone}
                      </div>
                    )}
                  </div>

                  {/* COMPANY */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Company
                    </label>

                    <input
                      type="text"
                      className={`form-control borderInput ${
                        errors.company ? "is-invalid" : ""
                      }`}
                      onChange={(e) => {
                        setData({
                          ...data,
                          company: e.target.value,
                        });

                        if (errors.company) {
                          setErrors((prev) => ({
                            ...prev,
                            company: "",
                          }));
                        }
                      }}
                      value={data.company}
                      maxLength="100"
                    />

                    {errors.company && (
                      <div className="invalid-feedback">
                        {errors.company}
                      </div>
                    )}
                  </div>


                  {/* MESSAGE */}
                  <div className="col-12">

                    <label className="form-label">
                      Message
                    </label>

                    <textarea
                      className={`form-control borderInput ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      onChange={(e) =>
                        setData({
                          ...data,
                          description: e.target.value,
                        })
                      }
                      value={data.description}
                      maxLength="250"
                      rows="3"
                    />

                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}

                  </div>


                  {/* ==========================================
                      SCHEDULE CONSULTATION
                      ========================================== */}

                  <div className="col-12">

                    <div className="form-check">

                      <input
                        type="checkbox"
                        id="contactConsultation"
                        className="form-check-input"
                        checked={consultationRequired}
                        onChange={(e) => {
                          setConsultationRequired(
                            e.target.checked
                          );

                          if (!e.target.checked) {
                            setSelectedDateTime(null);

                            setErrors((prev) => ({
                              ...prev,
                              dateTime: "",
                            }));
                          }
                        }}
                      />

                      <label
                        htmlFor="contactConsultation"
                        className="form-check-label"
                      >
                        I would like to schedule a consultation
                      </label>

                    </div>

                  </div>


                  {/* DATE & TIME */}
                  {consultationRequired && (
  <div className="col-12">

    <div className="row g-3">

      {/* PREFERRED DATE & TIME */}
      <div className="col-md-6">

        <label
          htmlFor="dateTime"
          className="form-label"
        >
          Preferred Date & Time
        </label>

        <DatePicker
          selected={selectedDateTime}
          onChange={(date) => {
            setSelectedDateTime(date);

            if (date) {
              setErrors((prev) => ({
                ...prev,
                dateTime: "",
              }));
            }
          }}
          showTimeSelect
          timeIntervals={30}
          timeFormat="hh:mm aa"
          dateFormat="dd-MM-yyyy hh:mm aa"
          minDate={new Date()}
          placeholderText="dd-mm-yyyy --:--"
          id="dateTime"
          name="dateTime"
          className={`form-control ${
            errors.dateTime ? "is-invalid" : ""
          }`}
          wrapperClassName="hire-date-picker"
          autoComplete="off"
          showPopperArrow={false}
          popperPlacement="bottom-start"
        />

        {errors.dateTime && (
          <div className="invalid-feedback d-block">
            {errors.dateTime}
          </div>
        )}

      </div>


      {/* TIME ZONE */}
      <div className="col-md-6">

        <label
          htmlFor="timezone"
          className="form-label"
        >
          Time Zone
        </label>

        <select
          id="timezone"
          name="timezone"
          className="form-select"
          value={selectedTimezone}
          onChange={(e) =>
            setSelectedTimezone(e.target.value)
          }
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
)}


                  {/* ==========================================
                      CAPTCHA
                      ========================================== */}

                 {/* CAPTCHA */}
<div className="col-12">

    <div className="form-group captcha-group mt-3">

        <label htmlFor="captchaAnswer">
            Security Verification <span>*</span>
        </label>

        <div className="captcha-row">

            {/* CAPTCHA QUESTION */}
            <div className="captcha-question form-control">
                {isCaptchaLoading
                    ? "Loading..."
                    : captcha?.challenge || ""}
            </div>


            {/* CAPTCHA ANSWER */}
            <input
                type="text"
                id="captchaAnswer"
                name="captchaAnswer"
                value={captchaAnswer}
                onChange={(e) => {
                    setCaptchaAnswer(e.target.value);

                    if (errors.captchaAnswer) {
                        setErrors((prev) => ({
                            ...prev,
                            captchaAnswer: "",
                        }));
                    }
                }}
                placeholder="Enter the answer"
                autoComplete="off"
                required
                disabled={
                    isCaptchaLoading ||
                    !captcha?.challenge
                }
                className={`captcha-answer form-control ${
                    errors.captchaAnswer
                        ? "is-invalid"
                        : ""
                }`}
            />


            {/* REFRESH BUTTON */}
            <button
                type="button"
                className="captcha-refresh"
                onClick={loadCaptcha}
                disabled={isCaptchaLoading || isLoading}
                aria-label="Refresh CAPTCHA"
                title="Refresh CAPTCHA"
            >
                ↻
            </button>

        </div>


        {errors.captchaAnswer && (
            <div className="field-error">
                {errors.captchaAnswer}
            </div>
        )}

    </div>

</div>


                  {/* SUBMIT BUTTON */}
                  <div className="col-12">

                    <button
                      type="submit"
                      className="btn btn-primary sf-btn6 mt-20"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Sending..."
                        : "Send Message"}
                    </button>

                  </div>

                </form>

              </div>


              {/* SPACER */}
              <div className="col-lg-1"></div>


              {/* RIGHT IMAGE */}
              <div className="col-lg-5 ipad-mt-30 phone-mt-20">

                <div className="contact-image-wrpr">

                  <img
                    src={contactImage}
                    alt="Contact Us"
                    className="img-fluid"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ==========================================
          CONTACT INFORMATION CARDS
          ========================================== */}

      <section className="container-fluid py-80 contact-bg-1">

        <div className="container">

          <div className="row sb-contact-wrapper">

            <div className="col-lg-1"></div>

            <div className="col-lg-10">

              <div className="row">

                {/* SUPPORT */}
                <div className="col-xl-4 col-lg-4 col-md-4 mb-20">

                  <div className="sb-contact-card1">

                    <div className="sb-contact-card1-content">

                      <div className="sb-contact-card1-inner-content text-center">

                        <div className="contact-icon">
                          <img
                            src={supportIcon}
                            alt="Service Icon"
                          />
                        </div>

                        <h3 className="dark-title mb-20">
                          Support
                        </h3>

                        <h4 className="mb-10">
                          Our friendly team is here to help.
                        </h4>

                        <p>
                          <Link to="mailto:support@softbild.com">
                            support@softbild.com
                          </Link>
                        </p>

                      </div>

                    </div>

                  </div>

                </div>


                {/* SALES */}
                <div className="col-xl-4 col-lg-4 col-md-4 mb-20">

                  <div className="sb-contact-card1 bg-gradient3">

                    <div className="sb-contact-card1-content">

                      <div className="sb-contact-card1-inner-content text-center">

                        <div className="contact-icon">
                          <img
                            src={supportIconWhite}
                            alt="Service Icon"
                          />
                        </div>

                        <h3 className="dark-title mb-20">
                          Sales
                        </h3>

                        <h4 className="mb-10 text-white">
                          Questions or queries? Get in touch!
                        </h4>

                        <p>
                          <Link
                            to="mailto:sales@softbild.com"
                            className="text-white"
                          >
                            sales@softbild.com
                          </Link>
                        </p>

                      </div>

                    </div>

                  </div>

                </div>


                {/* PHONE */}
                <div className="col-xl-4 col-lg-4 col-md-4 mb-20 phone-mb-0">

                  <div className="sb-contact-card1">

                    <div className="sb-contact-card1-content">

                      <div className="sb-contact-card1-inner-content text-center">

                        <div className="contact-icon">
                          <img
                            src={phoneIcon}
                            alt="Service Icon"
                          />
                        </div>

                        <h3 className="dark-title mb-20">
                          Phone
                        </h3>

                        <h4 className="mb-10">
                          Mon-Fri from 8am to 5pm.
                        </h4>

                        <p>
                          <Link to="tel:+971527535786">
                            +971 (527) 535-786
                          </Link>
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="col-lg-1"></div>

          </div>

        </div>

      </section>


      <HomeCta />


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


export default Contactus;


















// import { useState } from "react";
// import "react-phone-input-2/lib/style.css";
// import PhoneInput from "react-phone-input-2";
// import ContactHeroSection from "../../components/app-components/ContactHeroSection";
// import contactImage from "../../assets/images/SoftBild-contact-img-01.png";
// import HomeCta from "../../components/app-components/HomeCta";
// import emailjs from "@emailjs/browser";
// import { Link } from "react-router-dom";
// import supportIcon from "../../assets/icons/email2.svg";
// import salesIcon from "../../assets/icons/services-icon1.svg";
// import phoneIcon from "../../assets/icons/call1.svg"
// import supportIconWhite from "../../assets/icons/services-icon-white1.svg";

// import { Helmet } from "react-helmet-async";

// function Contactus() {
//   const [data, setData] = useState({
//     fName: "",
//     lName: "",
//     eMail: "",
//     phoneNumber: "",
//     description: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleCountryChange = (value) => {
//     setData({ ...data, phoneNumber: value });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // First Name Validation
//     if (!data.fName.trim()) {
//       newErrors.fName = "First Name is required.";
//     } else if (!/^[a-zA-Z\s]+$/.test(data.fName)) {
//       newErrors.fName = "Please enter a valid name.";
//     } else if (data.fName.length < 2) {
//       newErrors.fName = "First Name must be at least 2 characters.";
//     } else if (data.fName.length > 25) {
//       newErrors.fName = "First Name cannot exceed 25 characters.";
//     }

//     // Last Name Validation (optional, but must be valid if provided)
//     if (data.lName.trim()) {
//       if (!/^[a-zA-Z\s]+$/.test(data.lName)) {
//         newErrors.lName = "Last Name can only contain letters.";
//       } else if (data.lName.length < 2) {
//         newErrors.lName = "Last Name must be at least 2 characters.";
//       } else if (data.lName.length > 20) {
//         newErrors.lName = "Last Name cannot exceed 20 characters.";
//       }
//     }

//     // Email Validation
//     if (!data.eMail.trim()) {
//       newErrors.eMail = "Email is required.";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.eMail)) {
//       newErrors.eMail = "Please enter a valid email.";
//     }

//     // Phone Number Validation
//     if (!data.phoneNumber.trim()) {
//       newErrors.phoneNumber = "Phone Number is required.";
//     } else {
//       const phoneWithoutCountryCode = data.phoneNumber.replace(/^\+?\d{1,4}\s?/, "");

//       if (!/^\d+$/.test(phoneWithoutCountryCode)) {
//         newErrors.phoneNumber = "Phone Number must contain only digits.";
//       } else if (phoneWithoutCountryCode.length < 4 || phoneWithoutCountryCode.length > 12) {
//         newErrors.phoneNumber = "Enter a valid Phone Number.";
//       }
//     }

//     // Description Validation
//     const wordCount = data.description.trim().split(/\s+/).length;
//     if (!data.description.trim()) {
//       newErrors.description = "Message is required.";
//     } else if (wordCount < 6) {
//       newErrors.description = "Message must contain at least 6 words.";
//     } else if (data.description.length > 250) {
//       newErrors.description = "Message cannot exceed 250 characters.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       console.log("Form validation failed:", errors);
//       return;
//     }

//     setIsLoading(true); // Set loading to true when submission starts

//     const templateParams = {
//       first_name: data.fName,
//       last_name: data.lName,
//       email: data.eMail,
//       phone: data.phoneNumber,
//       message: data.description,
//       to_name: "SoftBild",
//     };

//     try {
//       await emailjs.send(
//         "service_pgc5itj", // Your EmailJS Service ID
//         "template_6fea5xe", // Your EmailJS Template ID
//         templateParams,
//         "TnJXWXTiQ9YvKpFnx" // Your EmailJS Public Key
//       );

//       console.log("Email sent successfully!");
//       setSuccessMessage("Your message has been successfully sent to SoftBild. We appreciate your inquiry!");
//       setIsLoading(false); // Set loading to false once the email is sent

//       // Reset the form
//       setData({
//         fName: "",
//         lName: "",
//         eMail: "",
//         phoneNumber: "",
//         description: "",
//       });
//       setErrors({});
//     } catch (error) {
//       console.error("Failed to send email:", error);
//       setIsLoading(false); // Stop loading in case of error
//     }
//   };

//   return (
//     <>
//     <Helmet>
//       <title>Contact SoftBild - Let's Connect and Collaborate</title>
//       <meta name="description" content="Get in touch with SoftBild for innovative IT solutions. Contact us to discuss your project requirements or for business inquiries." />
//       <meta name="keywords" content="contact SoftBild, get in touch, business inquiries, IT solutions, custom app development, collaboration" />
//       <meta name="author" content="SoftBild" />
//       <meta name="robots" content="index, follow" />
//       <meta property="og:title" content="Contact SoftBild - Let's Connect and Collaborate" />
//       <meta property="og:description" content="Contact SoftBild today to discuss your project or partnership opportunities. We're here to help." />
//       <meta property="og:image" content="https://softbild.com/src/assets/images/SoftBild-contact-img-01.png" />
//       <meta property="og:url" content="https://softbild.com/Contact" />
//       <meta property="og:type" content="website" />
//     </Helmet>
//       <ContactHeroSection />
//       <section className="container-fluid py-80 position-relative bg-img-top">
//         <div className="container">
//           <div className="contact-section-wrapper">
//             <div className="row">
//               <div className="col-lg-6">
//                 <h2 className="dark-subtitle">Get in touch</h2>
//                 <p>Our friendly team would love to hear from you.</p>
//                 {successMessage && (
//                   <div className="alert alert-success mt-3" role="alert">
//                     {successMessage}
//                   </div>
//                 )}
//                 {isLoading && (
//                   <div className="spinner-border" role="status">
//                     <span className="sr-only">Loading...</span>
//                   </div>
//                 )}
//                 <form className="row g-3 mt-3" onSubmit={handleSubmit}>
//                   <div className="col-md-6">
//                     <label className="form-label">First Name</label>
//                     <input
//                       type="text"
//                       className={`form-control borderInput ${errors.fName ? "is-invalid" : ""}`}
//                       onChange={(e) => setData({ ...data, fName: e.target.value })}
//                       value={data.fName}
//                       maxLength="25"
//                     />
//                     {errors.fName && <div className="invalid-feedback">{errors.fName}</div>}
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">Last Name</label>
//                     <input
//                       type="text"
//                       className={`form-control borderInput ${errors.lName ? "is-invalid" : ""}`}
//                       onChange={(e) => setData({ ...data, lName: e.target.value })}
//                       value={data.lName}
//                       maxLength="20"
//                     />
//                     {errors.lName && <div className="invalid-feedback">{errors.lName}</div>}
//                   </div>
//                   <div className="col-12">
//                     <label className="form-label">Email</label>
//                     <input
//                       type="email"
//                       className={`form-control borderInput ${errors.eMail ? "is-invalid" : ""}`}
//                       onChange={(e) => setData({ ...data, eMail: e.target.value })}
//                       value={data.eMail}
//                     />
//                     {errors.eMail && <div className="invalid-feedback">{errors.eMail}</div>}
//                   </div>
//                   <div className="col-12">
//                     <label className="form-label">Phone Number</label>
//                     <PhoneInput
//                       country={"us"}
//                       value={data.phoneNumber}
//                       onChange={handleCountryChange}
//                       inputClass={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
//                       inputStyle={{
//                         width: "100%",
//                         borderColor: errors.phoneNumber ? "#dc3545" : "#ced4da",
//                       }}
//                       enableSearch={true}
//                       placeholder="Enter phone number"
//                     />
//                     {errors.phoneNumber && <div className="invalid-feedback d-block">{errors.phoneNumber}</div>}
//                   </div>
//                   <div className="col-12">
//                     <label className="form-label">Message</label>
//                     <textarea
//                       className={`form-control borderInput ${errors.description ? "is-invalid" : ""}`}
//                       onChange={(e) => setData({ ...data, description: e.target.value })}
//                       value={data.description}
//                       maxLength="250"
//                     />
//                     {errors.description && <div className="invalid-feedback">{errors.description}</div>}
//                   </div>
//                   <div className="col-12">
//                     <button type="submit" className="btn btn-primary sf-btn6 mt-20">
//                       Send Message
//                     </button>
//                   </div>
//                 </form>
//               </div>
//               <div className="col-lg-1"></div>
//               <div className="col-lg-5 ipad-mt-30 phone-mt-20">
//                 <div className="contact-image-wrpr">
//                   <img src={contactImage} alt="Contact Us" className="img-fluid" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="container-fluid py-80 contact-bg-1">
//         <div className="container">
//           <div className="row sb-contact-wrapper">
//             <div className="col-lg-1"></div>
//             <div className="col-lg-10">
//               <div className="row">
//                 <div className="col-xl-4 col-lg-4 col-md-4 mb-20">
//                 <div className="sb-contact-card1">
//                   <div className="sb-contact-card1-content">
//                     <div className="sb-contact-card1-inner-content text-center">
//                       <div className="contact-icon">
//                         <img src={supportIcon} alt="Service Icon" />
//                       </div>
//                       <h3 className="dark-title mb-20">Support</h3>
//                       <h4 className="mb-10">Our friendly team is here to help.</h4>
//                       <p><Link to="mailto:support@softbild.com">support@softbild.com</Link></p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-xl-4 col-lg-4 col-md-4 mb-20">
//                 <div className="sb-contact-card1 bg-gradient3">
//                   <div className="sb-contact-card1-content">
//                     <div className="sb-contact-card1-inner-content text-center">
//                       <div className="contact-icon">
//                         <img src={supportIconWhite} alt="Service Icon" />
//                       </div>
//                       <h3 className="dark-title mb-20">Sales</h3>
//                       <h4 className="mb-10 text-white">Questions or queries? Get in touch!</h4>
//                       <p><Link to="mailto:sales@softbild.com" className="text-white">sales@softbild.com</Link></p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-xl-4 col-lg-4 col-md-4 mb-20 phone-mb-0">
//                 <div className="sb-contact-card1">
//                   <div className="sb-contact-card1-content">
//                     <div className="sb-contact-card1-inner-content text-center">
//                       <div className="contact-icon">
//                         <img src={phoneIcon} alt="Service Icon" />
//                       </div>
//                       <h3 className="dark-title mb-20">Phone</h3>
//                       <h4 className="mb-10">Mon-Fri from 8am to 5pm.</h4>
//                       <p><Link to="tel:+971527535786">+971 (527) 535-786</Link></p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               </div>
//             </div>
//             <div className="col-lg-1"></div>
//           </div>
//         </div>
//       </section>
//       <HomeCta />
//     </>
//   );
// }

// export default Contactus;