import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary/server";
import { createClient } from "../../../../lib/supabase/server";

export const runtime = "nodejs";

const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_FOLDERS = [
    "SoftBild/Blog/Featured",
    "SoftBild/Common/Misc",
];

export async function POST(request) {
    try {
        // -----------------------------------------
        // 1. Check authenticated user
        // -----------------------------------------
        const supabase = await createClient();

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        // -----------------------------------------
        // 2. Check admin role
        // -----------------------------------------
        const { data: profile, error: profileError } =
            await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

        if (
            profileError ||
            profile?.role !== "admin"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Admin access required",
                },
                { status: 403 }
            );
        }

        // -----------------------------------------
        // 3. Read uploaded file
        // -----------------------------------------
        const formData = await request.formData();

        const file = formData.get("file");
        const folder = formData.get("folder");

        if (!file || typeof file === "string") {
            return NextResponse.json(
                {
                    success: false,
                    message: "No image file provided",
                },
                { status: 400 }
            );
        }

        // -----------------------------------------
        // 4. Validate file type
        // -----------------------------------------
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid image type. Only JPG, PNG, WEBP and GIF are allowed.",
                },
                { status: 400 }
            );
        }

        // -----------------------------------------
        // 5. Validate file size
        // -----------------------------------------
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Image size must be 10 MB or smaller.",
                },
                { status: 400 }
            );
        }

        // -----------------------------------------
        // 6. Validate Cloudinary folder
        // -----------------------------------------
        const requestedFolder =
            typeof folder === "string" &&
            folder.trim()
                ? folder.trim()
                : "SoftBild/Common/Misc";

        if (!ALLOWED_FOLDERS.includes(requestedFolder)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid upload folder.",
                },
                { status: 400 }
            );
        }

        // -----------------------------------------
        // 7. Convert file to Buffer
        // -----------------------------------------
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // -----------------------------------------
        // 8. Upload to Cloudinary
        // -----------------------------------------
        const result = await new Promise(
            (resolve, reject) => {
                const uploadStream =
                    cloudinary.uploader.upload_stream(
                        {
                            folder: requestedFolder,
                            resource_type: "image",
                        },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );

                uploadStream.end(buffer);
            }
        );

        // -----------------------------------------
        // 9. Return safe Cloudinary information
        // -----------------------------------------
        return NextResponse.json({
            success: true,
            message: "Image uploaded successfully",
            image: {
                url: result.secure_url,
                publicId: result.public_id,
                width: result.width,
                height: result.height,
                format: result.format,
                bytes: result.bytes,
            },
        });
    } catch (error) {
        // Detailed error stays on the server only.
        console.error(
            "Cloudinary upload error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Image upload failed",
            },
            { status: 500 }
        );
    }
}