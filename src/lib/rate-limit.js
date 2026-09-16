import { createClient } from "./supabase/server";

export async function checkRateLimit(
    key,
    limit,
    windowSeconds
) {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc(
        "check_rate_limit",
        {
            p_key: key,
            p_limit: limit,
            p_window_seconds: windowSeconds,
        }
    );

    if (error) {
        console.error(
            "Rate limit check failed:",
            error
        );

        // Do not block legitimate users if the
        // rate-limit service temporarily fails.
        return true;
    }

    return data === true;
}