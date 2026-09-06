import nodemailer from "nodemailer";
import {
    decryptCaptcha,
    captchaAnswersMatch,
    getCaptchaCookieName,
    clearCaptchaCookie
} from "../utils/captcha.js";


// Escape user input before putting it inside HTML email
const escapeHtml = (value = "") => {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};


export default async function handler(req, res) {

    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }


    try {

        // const {
        //     name,
        //     email,
        //     phone,
        //     company,
        //     projectType,
        //     developers,
        //     requirements,
        //     consultation,
        //     dateTime,
        //     timezone,
        //     captchaAnswer
        // } = req.body;

        const {
            formType = "hire-developer",
            name,
            email,
            phone,
            company,
            projectType,
            developers,
            requirements,
            consultation,
            dateTime,
            timezone,
            firstName,
            lastName,
            message,
            captchaAnswer
        } = req.body;


        // Validate required fields
        // Validate required fields

// Validate required fields

if (formType === "contact") {

    if (!name || !email || !phone || !message) {

        return res.status(400).json({
            success: false,
            message: "Please fill in all required fields.",
        });

    }

} else {

    if (!name || !email || !phone || !requirements) {

        return res.status(400).json({
            success: false,
            message: "Please fill in all required fields.",
        });

    }

}

        // CAPTCHA VALIDATION
        const cookies = req.headers.cookie || "";

        const captchaCookie = cookies
            .split(";")
            .map((cookie) => cookie.trim())
            .find((cookie) =>
                cookie.startsWith(
                    `${getCaptchaCookieName()}=`
                )
            );

        const captchaToken = captchaCookie
            ? captchaCookie.substring(
                `${getCaptchaCookieName()}=`.length
            )
            : null;

        const captchaData = decryptCaptcha(captchaToken);

        // Clear CAPTCHA after every verification attempt.
        // This makes the challenge one-time use.
        res.setHeader(
            "Set-Cookie",
            clearCaptchaCookie()
        );

        if (!captchaData) {
            return res.status(400).json({
                success: false,
                message:
                    "Your CAPTCHA has expired or is invalid. Please refresh the CAPTCHA and try again."
            });
        }

        if (
            !captchaData.expiresAt ||
            Date.now() > captchaData.expiresAt
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Your CAPTCHA has expired. Please refresh the CAPTCHA and try again."
            });
        }

        if (
            !captchaAnswersMatch(
                captchaAnswer,
                captchaData.answer
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Incorrect CAPTCHA answer. Please try again."
            });
        }


        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address.",
            });
        }


        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === "true",

            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });


        // Escape all user-provided values
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone);
        const safeCompany = escapeHtml(company || "Not provided");
        const safeProjectType = escapeHtml(projectType || "Not provided");
        const safeDevelopers = escapeHtml(developers || "Not provided");
        const safeRequirements = escapeHtml(requirements || "");
        const safeDateTime = escapeHtml(dateTime || "Not provided");
        const safeTimezone = escapeHtml(timezone || "Not provided");

        const safeConsultation = consultation
            ? "Yes"
            : "No";

        const safeFirstName = escapeHtml(firstName || "");
        const safeLastName = escapeHtml(lastName || "");
        const safeMessage = escapeHtml(message || "");


       




        // Send email
if (formType === "contact") {
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.CONTACT_EMAIL,
        replyTo: email,
        subject: `New Contact Form Inquiry - ${name}`,
        html: `
            <div style="
                margin: 0;
                padding: 20px;
                background-color: #f4f6f8;
                font-family: Arial, Helvetica, sans-serif;
                color: #1f2937;
            ">
                <div style="
                    max-width: 720px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    overflow: hidden;
                ">

                    <!-- Header -->
                    <div style="
                        background-color: #111827;
                        padding: 28px 30px;
                    ">
                        <h1 style="
                            margin: 0 0 8px;
                            color: #ffffff;
                            font-size: 24px;
                            line-height: 1.3;
                        ">
                            New Contact Form Inquiry
                        </h1>

                        <p style="
                            margin: 0;
                            color: #d1d5db;
                            font-size: 15px;
                            line-height: 1.5;
                        ">
                            A new inquiry has been submitted through your website.
                        </p>
                    </div>

                    <!-- Content -->
                    <div style="padding: 30px;">

                        <!-- Contact Information -->
                        <h2 style="
                            margin: 0 0 24px;
                            font-size: 19px;
                            color: #111827;
                        ">
                            Contact Information
                        </h2>

                        <table
                            role="presentation"
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            style="
                                border-collapse: collapse;
                                font-size: 15px;
                            "
                        >
                            <tr>
                                <td style="
                                    width: 180px;
                                    padding: 0 0 18px;
                                    color: #4b5563;
                                    font-weight: 600;
                                    vertical-align: top;
                                ">
                                    Name
                                </td>

                                <td style="
                                    padding: 0 0 18px;
                                    color: #374151;
                                    vertical-align: top;
                                ">
                                    ${safeName || "Not provided"}
                                </td>
                            </tr>

                            <tr>
                                <td style="
                                    padding: 0 0 18px;
                                    color: #4b5563;
                                    font-weight: 600;
                                    vertical-align: top;
                                ">
                                    Contact Email
                                </td>

                                <td style="
                                    padding: 0 0 18px;
                                    vertical-align: top;
                                ">
                                    <a
                                        href="mailto:${safeEmail}"
                                        style="
                                            color: #2563eb;
                                            text-decoration: underline;
                                        "
                                    >
                                        ${safeEmail}
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td style="
                                    padding: 0 0 18px;
                                    color: #4b5563;
                                    font-weight: 600;
                                    vertical-align: top;
                                ">
                                    Phone
                                </td>

                                <td style="
                                    padding: 0 0 18px;
                                    vertical-align: top;
                                ">
                                    <a
                                        href="tel:${safePhone}"
                                        style="
                                            color: #2563eb;
                                            text-decoration: underline;
                                        "
                                    >
                                        ${safePhone}
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td style="
                                    padding: 0;
                                    color: #4b5563;
                                    font-weight: 600;
                                    vertical-align: top;
                                ">
                                    Company
                                </td>

                                <td style="
                                    padding: 0;
                                    color: #374151;
                                    vertical-align: top;
                                ">
                                    ${safeCompany}
                                </td>
                            </tr>
                        </table>

                        <!-- Divider -->
                        <div style="
                            height: 1px;
                            background-color: #e5e7eb;
                            margin: 30px 0;
                        "></div>

                        <!-- Message -->
                        <h2 style="
                            margin: 0 0 18px;
                            font-size: 19px;
                            color: #111827;
                        ">
                            Message
                        </h2>

                        <div style="
                            padding: 22px;
                            background-color: #f8fafc;
                            border: 1px solid #e2e8f0;
                            border-radius: 8px;
                            color: #374151;
                            font-size: 15px;
                            line-height: 1.7;
                            white-space: pre-wrap;
                        ">
                            ${safeMessage || "No message provided."}
                        </div>

                        <!-- Divider -->
                        <div style="
                            height: 1px;
                            background-color: #e5e7eb;
                            margin: 30px 0;
                        "></div>

                        <!-- Consultation -->
                        <h2 style="
                            margin: 0 0 24px;
                            font-size: 19px;
                            color: #111827;
                        ">
                            Consultation Schedule
                        </h2>

                        <table
                            role="presentation"
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            style="
                                border-collapse: collapse;
                                font-size: 15px;
                            "
                        >
                            <tr>
                                <td style="
                                    width: 180px;
                                    padding: 0 0 18px;
                                    color: #4b5563;
                                    font-weight: 600;
                                ">
                                    Consultation
                                </td>

                                <td style="
                                    padding: 0 0 18px;
                                    color: #374151;
                                ">
                                    ${safeConsultation}
                                </td>
                            </tr>

                            <tr>
                                <td style="
                                    padding: 0 0 18px;
                                    color: #4b5563;
                                    font-weight: 600;
                                ">
                                    Date &amp; Time
                                </td>

                                <td style="
                                    padding: 0 0 18px;
                                    color: #374151;
                                ">
                                    ${safeDateTime}
                                </td>
                            </tr>

                            <tr>
                                <td style="
                                    padding: 0;
                                    color: #4b5563;
                                    font-weight: 600;
                                ">
                                    Timezone
                                </td>

                                <td style="
                                    padding: 0;
                                    color: #374151;
                                ">
                                    ${safeTimezone}
                                </td>
                            </tr>
                        </table>

                    </div>

                    <!-- Footer -->
                    <div style="
                        padding: 18px 30px;
                        background-color: #f8fafc;
                        border-top: 1px solid #e5e7eb;
                        color: #6b7280;
                        font-size: 13px;
                        line-height: 1.5;
                    ">
                        This email was automatically generated from your website's
                        Contact form.
                    </div>

                </div>
            </div>
        `
    });
} else {
             // Send email
            await transporter.sendMail({

                from: process.env.SMTP_FROM,

                to: process.env.CONTACT_EMAIL,

                replyTo: email,

                subject: `New Hire Developer Consultation Request - ${name}`,

                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Hire Developer Consultation Request</title>
                    </head>

                    <body style="
                        margin: 0;
                        padding: 30px 15px;
                        background-color: #f5f7fa;
                        font-family: Arial, Helvetica, sans-serif;
                        color: #333333;
                    ">

                        <div style="
                            max-width: 700px;
                            margin: 0 auto;
                            background: #ffffff;
                            border-radius: 12px;
                            overflow: hidden;
                            border: 1px solid #e5e7eb;
                        ">

                            <!-- Header -->
                            <div style="
                                padding: 25px 30px;
                                background: #111827;
                                color: #ffffff;
                            ">

                                <h2 style="
                                    margin: 0 0 8px;
                                    font-size: 22px;
                                ">
                                    New Hire Developer Consultation Request
                                </h2>

                                <p style="
                                    margin: 0;
                                    font-size: 14px;
                                    color: #d1d5db;
                                ">
                                    A new consultation request has been submitted through your website.
                                </p>

                            </div>


                            <!-- Content -->
                            <div style="padding: 30px;">

                                <h3 style="
                                    margin: 0 0 18px;
                                    font-size: 18px;
                                    color: #111827;
                                ">
                                    Contact Information
                                </h3>


                                <table style="
                                    width: 100%;
                                    border-collapse: collapse;
                                    font-size: 14px;
                                ">

                                    <tr>
                                        <td style="
                                            padding: 10px 0;
                                            width: 180px;
                                            font-weight: bold;
                                            color: #555555;
                                        ">
                                            Name
                                        </td>

                                        <td style="padding: 10px 0;">
                                            ${safeName}
                                        </td>
                                    </tr>


                                    <tr>
                                        <td style="
                                            padding: 10px 0;
                                            font-weight: bold;
                                            color: #555555;
                                        ">
                                            Email
                                        </td>

                                        <td style="padding: 10px 0;">
                                            ${safeEmail}
                                        </td>
                                    </tr>


                                    <tr>
                                        <td style="
                                            padding: 10px 0;
                                            font-weight: bold;
                                            color: #555555;
                                        ">
                                            Phone
                                        </td>

                                        <td style="padding: 10px 0;">
                                            ${safePhone}
                                        </td>
                                    </tr>


                                    <tr>
                                        <td style="
                                            padding: 10px 0;
                                            font-weight: bold;
                                            color: #555555;
                                        ">
                                            Company
                                        </td>

                                        <td style="padding: 10px 0;">
                                            ${safeCompany}
                                        </td>
                                    </tr>

                                </table>


                                <hr style="
                                    margin: 25px 0;
                                    border: 0;
                                    border-top: 1px solid #eeeeee;
                                ">


                                <h3 style="
                                    margin: 0 0 18px;
                                    font-size: 18px;
                                    color: #111827;
                                ">
                                    Project Information
                                </h3>


                                <table style="
                                    width: 100%;
                                    border-collapse: collapse;
                                    font-size: 14px;
                                ">

                                    <tr>
                                        <td style="
                                            padding: 10px 0;
                                            width: 180px;
                                            font-weight: bold;
                                            color: #555555;
                                        ">
                                            Project Type
                                        </td>

                                        <td style="padding: 10px 0;">
                                            ${safeProjectType}
                                        </td>
                                    </tr>


                                    <tr>
                                        <td style="
                                            padding: 10px 0;
                                            font-weight: bold;
                                            color: #555555;
                                        ">
                                            Developers Required
                                        </td>

                                        <td style="padding: 10px 0;">
                                            ${safeDevelopers}
                                        </td>
                                    </tr>


                                    <tr>
                                        <td style="
                                            padding: 10px 0;
                                            font-weight: bold;
                                            color: #555555;
                                        ">
                                            Consultation Required
                                        </td>

                                        <td style="padding: 10px 0;">
                                            ${safeConsultation}
                                        </td>
                                    </tr>

                                </table>


                                <hr style="
                                    margin: 25px 0;
                                    border: 0;
                                    border-top: 1px solid #eeeeee;
                                ">


                                <h3 style="
                                    margin: 0 0 12px;
                                    font-size: 18px;
                                    color: #111827;
                                ">
                                    Project Requirements
                                </h3>


                                <div style="
                                    padding: 18px;
                                    background: #f9fafb;
                                    border: 1px solid #e5e7eb;
                                    border-radius: 8px;
                                    line-height: 1.7;
                                    font-size: 14px;
                                    white-space: pre-wrap;
                                ">
                                    ${safeRequirements}
                                </div>


                                <hr style="
                                    margin: 25px 0;
                                    border: 0;
                                    border-top: 1px solid #eeeeee;
                                ">


                                <h3 style="
                                    margin: 0 0 18px;
                                    font-size: 18px;
                                    color: #111827;
                                ">
                                    Preferred Consultation Schedule
                                </h3>


                                <table style="
                                    width: 100%;
                                    border-collapse: collapse;
                                    font-size: 14px;
                                ">

                                    <tr>
                                        <td style="
                                            padding: 10px 0;
                                            width: 180px;
                                            font-weight: bold;
                                            color: #555555;
                                        ">
                                            Date & Time
                                        </td>

                                        <td style="padding: 10px 0;">
                                            ${safeDateTime}
                                        </td>
                                    </tr>


                                    <tr>
                                        <td style="
                                            padding: 10px 0;
                                            font-weight: bold;
                                            color: #555555;
                                        ">
                                            Timezone
                                        </td>

                                        <td style="padding: 10px 0;">
                                            ${safeTimezone}
                                        </td>
                                    </tr>

                                </table>

                            </div>


                            <!-- Footer -->
                            <div style="
                                padding: 18px 30px;
                                background: #f9fafb;
                                border-top: 1px solid #eeeeee;
                                font-size: 12px;
                                color: #777777;
                            ">

                                This email was automatically generated from your website's Hire Developer form.

                            </div>

                        </div>

                    </body>
                    </html>
                `,
            });
        }


        return res.status(200).json({
            success: true,
            message: "Email sent successfully",
        });


    } catch (error) {
        console.error("Email error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to send email",
        });
    }
}