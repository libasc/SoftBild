import {
    randomBytes,
    randomInt,
    createCipheriv,
    createDecipheriv,
    createHash,
    timingSafeEqual
} from "crypto";

const CAPTCHA_TTL_MS = 5 * 60 * 1000;

const CAPTCHA_COOKIE_NAME = "captcha_token";

const ALPHANUMERIC_CHARS =
    "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

/**
 * Get a stable 32-byte encryption key from the environment variable.
 */
const getEncryptionKey = () => {
    const secret = process.env.CAPTCHA_SECRET;

    if (!secret) {
        throw new Error(
            "CAPTCHA_SECRET environment variable is not configured."
        );
    }

    return createHash("sha256")
        .update(secret)
        .digest();
};


/**
 * Generate a random 6-character alphanumeric CAPTCHA.
 *
 * Example:
 * K7M2XP
 */
const generateAlphaCaptcha = () => {
    let answer = "";

    for (let i = 0; i < 6; i++) {
        answer +=
            ALPHANUMERIC_CHARS[
                randomInt(0, ALPHANUMERIC_CHARS.length)
            ];
    }

    return {
        type: "alphanumeric",
        question: answer,
        answer
    };
};


/**
 * Generate a simple addition/subtraction CAPTCHA.
 *
 * Examples:
 * 15 - 7 = ?
 * 5 + 8 = ?
 */
const generateMathCaptcha = () => {
    let first = randomInt(3, 21);
    let second = randomInt(1, 16);

    const operation =
        randomInt(0, 2) === 0 ? "+" : "-";

    // Never allow negative subtraction.
    if (operation === "-" && second > first) {
        [first, second] = [second, first];
    }

    const answer =
        operation === "+"
            ? first + second
            : first - second;

    return {
        type: "math",
        question: `${first} ${operation} ${second} = ?`,
        answer: String(answer)
    };
};


/**
 * Randomly choose between:
 * - 6-character alphanumeric CAPTCHA
 * - mathematical CAPTCHA
 */
export const generateCaptcha = () => {
    return randomInt(0, 2) === 0
        ? generateAlphaCaptcha()
        : generateMathCaptcha();
};


/**
 * Encrypt CAPTCHA information before storing it
 * inside the HttpOnly browser cookie.
 */
export const encryptCaptcha = (payload) => {
    const key = getEncryptionKey();

    const iv = randomBytes(12);

    const cipher = createCipheriv(
        "aes-256-gcm",
        key,
        iv
    );

    const encrypted = Buffer.concat([
        cipher.update(JSON.stringify(payload), "utf8"),
        cipher.final()
    ]);

    const authTag = cipher.getAuthTag();

    return [
        iv.toString("base64url"),
        authTag.toString("base64url"),
        encrypted.toString("base64url")
    ].join(".");
};


/**
 * Decrypt the CAPTCHA cookie.
 */
export const decryptCaptcha = (token) => {
    try {
        if (!token) {
            return null;
        }

        const parts = token.split(".");

        if (parts.length !== 3) {
            return null;
        }

        const [ivEncoded, authTagEncoded, encryptedEncoded] =
            parts;

        const key = getEncryptionKey();

        const iv = Buffer.from(ivEncoded, "base64url");
        const authTag = Buffer.from(
            authTagEncoded,
            "base64url"
        );
        const encrypted = Buffer.from(
            encryptedEncoded,
            "base64url"
        );

        const decipher = createDecipheriv(
            "aes-256-gcm",
            key,
            iv
        );

        decipher.setAuthTag(authTag);

        const decrypted = Buffer.concat([
            decipher.update(encrypted),
            decipher.final()
        ]);

        return JSON.parse(
            decrypted.toString("utf8")
        );
    } catch (error) {
        console.error(
            "CAPTCHA decryption error:",
            error.message
        );

        return null;
    }
};


/**
 * Normalize CAPTCHA answers.
 *
 * Alphanumeric CAPTCHA is case-insensitive.
 */
export const normalizeCaptchaAnswer = (value) => {
    return String(value || "")
        .trim()
        .toUpperCase();
};


/**
 * Compare two CAPTCHA answers safely.
 */
export const captchaAnswersMatch = (
    submittedAnswer,
    correctAnswer
) => {
    const submitted =
        normalizeCaptchaAnswer(submittedAnswer);

    const correct =
        normalizeCaptchaAnswer(correctAnswer);

    if (!submitted || !correct) {
        return false;
    }

    if (submitted.length !== correct.length) {
        return false;
    }

    return timingSafeEqual(
        Buffer.from(submitted),
        Buffer.from(correct)
    );
};


/**
 * CAPTCHA cookie.
 */
export const getCaptchaCookie = (token) => {
    const secure =
        process.env.NODE_ENV === "production"
            ? "; Secure"
            : "";

    return `${CAPTCHA_COOKIE_NAME}=${token}; Path=/; Max-Age=300; HttpOnly; SameSite=Lax${secure}`;
};


/**
 * Clear CAPTCHA cookie.
 */
export const clearCaptchaCookie = () => {
    const secure =
        process.env.NODE_ENV === "production"
            ? "; Secure"
            : "";

    return `${CAPTCHA_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${secure}`;
};


/**
 * Cookie name export.
 */
export const getCaptchaCookieName = () => {
    return CAPTCHA_COOKIE_NAME;
};


/**
 * CAPTCHA lifetime.
 */
export const getCaptchaExpiry = () => {
    return Date.now() + CAPTCHA_TTL_MS;
};