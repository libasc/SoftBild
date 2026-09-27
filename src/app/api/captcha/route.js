import {
    generateCaptcha,
    encryptCaptcha,
    getCaptchaCookie,
    getCaptchaExpiry,
} from "../../../../utils/captcha.js";

import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
    try {
        const captcha = generateCaptcha();

        const captchaPayload = {
            answer: captcha.answer,
            type: captcha.type,
            expiresAt: getCaptchaExpiry(),
        };

        const encryptedToken = encryptCaptcha(captchaPayload);

        const response = NextResponse.json({
            success: true,
            challenge: captcha.question,
            type: captcha.type,
        });

        response.headers.set(
            "Set-Cookie",
            getCaptchaCookie(encryptedToken)
        );

        return response;
    } catch (error) {
        console.error("CAPTCHA generation error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to generate security verification.",
            },
            { status: 500 }
        );
    }
}