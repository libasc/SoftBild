import {
    generateCaptcha,
    encryptCaptcha,
    getCaptchaCookie,
    getCaptchaExpiry
} from "../utils/captcha.js";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {
        const captcha = generateCaptcha();

        const captchaPayload = {
            answer: captcha.answer,
            type: captcha.type,
            expiresAt: getCaptchaExpiry()
        };

        const encryptedToken =
            encryptCaptcha(captchaPayload);

        res.setHeader(
            "Set-Cookie",
            getCaptchaCookie(encryptedToken)
        );

        return res.status(200).json({
            success: true,
            challenge: captcha.question,
            type: captcha.type
        });
    } catch (error) {
        console.error(
            "CAPTCHA generation error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to generate security verification."
        });
    }
}