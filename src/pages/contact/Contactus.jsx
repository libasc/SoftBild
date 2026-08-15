import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import ContactHeroSection from "../../components/app-components/ContactHeroSection";
import contactImage from "../../assets/images/SoftBild-contact-img-01.png";
import HomeCta from "../../components/app-components/HomeCta";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import supportIcon from "../../assets/icons/services-icon1.svg";
import supportIconWhite from "../../assets/icons/services-icon-white1.svg";

import { Helmet } from "react-helmet-async";

function Contactus() {
  const [data, setData] = useState({
    fName: "",
    lName: "",
    eMail: "",
    phoneNumber: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCountryChange = (value) => {
    setData({ ...data, phoneNumber: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name Validation
    if (!data.fName.trim()) {
      newErrors.fName = "First Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(data.fName)) {
      newErrors.fName = "Please enter a valid name.";
    } else if (data.fName.length < 2) {
      newErrors.fName = "First Name must be at least 2 characters.";
    } else if (data.fName.length > 25) {
      newErrors.fName = "First Name cannot exceed 25 characters.";
    }

    // Last Name Validation (optional, but must be valid if provided)
    if (data.lName.trim()) {
      if (!/^[a-zA-Z\s]+$/.test(data.lName)) {
        newErrors.lName = "Last Name can only contain letters.";
      } else if (data.lName.length < 2) {
        newErrors.lName = "Last Name must be at least 2 characters.";
      } else if (data.lName.length > 20) {
        newErrors.lName = "Last Name cannot exceed 20 characters.";
      }
    }

    // Email Validation
    if (!data.eMail.trim()) {
      newErrors.eMail = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.eMail)) {
      newErrors.eMail = "Please enter a valid email.";
    }

    // Phone Number Validation
    if (!data.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required.";
    } else {
      const phoneWithoutCountryCode = data.phoneNumber.replace(/^\+?\d{1,4}\s?/, "");

      if (!/^\d+$/.test(phoneWithoutCountryCode)) {
        newErrors.phoneNumber = "Phone Number must contain only digits.";
      } else if (phoneWithoutCountryCode.length < 4 || phoneWithoutCountryCode.length > 12) {
        newErrors.phoneNumber = "Enter a valid Phone Number.";
      }
    }

    // Description Validation
    const wordCount = data.description.trim().split(/\s+/).length;
    if (!data.description.trim()) {
      newErrors.description = "Message is required.";
    } else if (wordCount < 6) {
      newErrors.description = "Message must contain at least 6 words.";
    } else if (data.description.length > 250) {
      newErrors.description = "Message cannot exceed 250 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    setIsLoading(true); // Set loading to true when submission starts

    const templateParams = {
      first_name: data.fName,
      last_name: data.lName,
      email: data.eMail,
      phone: data.phoneNumber,
      message: data.description,
      to_name: "SoftBild",
    };

    try {
      await emailjs.send(
        "service_pgc5itj", // Your EmailJS Service ID
        "template_6fea5xe", // Your EmailJS Template ID
        templateParams,
        "TnJXWXTiQ9YvKpFnx" // Your EmailJS Public Key
      );

      console.log("Email sent successfully!");
      setSuccessMessage("Your message has been successfully sent to SoftBild. We appreciate your inquiry!");
      setIsLoading(false); // Set loading to false once the email is sent

      // Reset the form
      setData({
        fName: "",
        lName: "",
        eMail: "",
        phoneNumber: "",
        description: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Failed to send email:", error);
      setIsLoading(false); // Stop loading in case of error
    }
  };

  return (
    <>
    <Helmet>
      <title>Contact SoftBild - Let's Connect and Collaborate</title>
      <meta name="description" content="Get in touch with SoftBild for innovative IT solutions. Contact us to discuss your project requirements or for business inquiries." />
      <meta name="keywords" content="contact SoftBild, get in touch, business inquiries, IT solutions, custom app development, collaboration" />
      <meta name="author" content="SoftBild" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Contact SoftBild - Let's Connect and Collaborate" />
      <meta property="og:description" content="Contact SoftBild today to discuss your project or partnership opportunities. We're here to help." />
      <meta property="og:image" content="https://softbild.com/src/assets/images/SoftBild-contact-img-01.png" />
      <meta property="og:url" content="https://softbild.com/Contact" />
      <meta property="og:type" content="website" />
    </Helmet>
      <ContactHeroSection />
      <section className="container-fluid py-80 position-relative bg-img-top">
        <div className="container">
          <div className="contact-section-wrapper">
            <div className="row">
              <div className="col-lg-6">
                <h2 className="dark-subtitle">Get in touch</h2>
                <p>Our friendly team would love to hear from you.</p>
                {successMessage && (
                  <div className="alert alert-success mt-3" role="alert">
                    {successMessage}
                  </div>
                )}
                {isLoading && (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                <form className="row g-3 mt-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className={`form-control borderInput ${errors.fName ? "is-invalid" : ""}`}
                      onChange={(e) => setData({ ...data, fName: e.target.value })}
                      value={data.fName}
                      maxLength="25"
                    />
                    {errors.fName && <div className="invalid-feedback">{errors.fName}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className={`form-control borderInput ${errors.lName ? "is-invalid" : ""}`}
                      onChange={(e) => setData({ ...data, lName: e.target.value })}
                      value={data.lName}
                      maxLength="20"
                    />
                    {errors.lName && <div className="invalid-feedback">{errors.lName}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control borderInput ${errors.eMail ? "is-invalid" : ""}`}
                      onChange={(e) => setData({ ...data, eMail: e.target.value })}
                      value={data.eMail}
                    />
                    {errors.eMail && <div className="invalid-feedback">{errors.eMail}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label">Phone Number</label>
                    <PhoneInput
                      country={"us"}
                      value={data.phoneNumber}
                      onChange={handleCountryChange}
                      inputClass={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                      inputStyle={{
                        width: "100%",
                        borderColor: errors.phoneNumber ? "#dc3545" : "#ced4da",
                      }}
                      enableSearch={true}
                      placeholder="Enter phone number"
                    />
                    {errors.phoneNumber && <div className="invalid-feedback d-block">{errors.phoneNumber}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea
                      className={`form-control borderInput ${errors.description ? "is-invalid" : ""}`}
                      onChange={(e) => setData({ ...data, description: e.target.value })}
                      value={data.description}
                      maxLength="250"
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary sf-btn6 mt-20">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-lg-1"></div>
              <div className="col-lg-5 ipad-mt-30 phone-mt-20">
                <div className="contact-image-wrpr">
                  <img src={contactImage} alt="Contact Us" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid py-80 contact-bg-1">
        <div className="container">
          <div className="row sb-contact-wrapper">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 mb-20">
                <div className="sb-contact-card1">
                  <div className="sb-contact-card1-content">
                    <div className="sb-contact-card1-inner-content text-center">
                      <div className="contact-icon">
                        <img src={supportIcon} alt="Service Icon" />
                      </div>
                      <h3 className="dark-title mb-20">Support</h3>
                      <h4 className="mb-10">Our friendly team is here to help.</h4>
                      <p><Link to="mailto:support@softbild.com">support@softbild.com</Link></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 mb-20">
                <div className="sb-contact-card1 bg-gradient3">
                  <div className="sb-contact-card1-content">
                    <div className="sb-contact-card1-inner-content text-center">
                      <div className="contact-icon">
                        <img src={supportIconWhite} alt="Service Icon" />
                      </div>
                      <h3 className="dark-title mb-20">Sales</h3>
                      <h4 className="mb-10 text-white">Questions or queries? Get in touch!</h4>
                      <p><Link to="mailto:sales@softbild.com" className="text-white">sales@softbild.com</Link></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 mb-20 phone-mb-0">
                <div className="sb-contact-card1">
                  <div className="sb-contact-card1-content">
                    <div className="sb-contact-card1-inner-content text-center">
                      <div className="contact-icon">
                        <img src={supportIcon} alt="Service Icon" />
                      </div>
                      <h3 className="dark-title mb-20">Phone</h3>
                      <h4 className="mb-10">Mon-Fri from 8am to 5pm.</h4>
                      <p><Link to="tel:+919990311235">+91 (999) 031-1235</Link></p>
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
//     }
//   };

//   return (
//     <>
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
//       <HomeCta />
//     </>
//   );
// }

// export default Contactus;
