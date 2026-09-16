import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;

  // --------------------------------------------------
  // 1. Allow dashboard login page
  // --------------------------------------------------

  if (pathname === "/dashboard/login") {
    return response;
  }

  // --------------------------------------------------
  // 2. Protect all dashboard routes
  // --------------------------------------------------

  if (!pathname.startsWith("/dashboard")) {
    return response;
  }

  // --------------------------------------------------
  // 3. Get authenticated Supabase user
  // --------------------------------------------------

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // --------------------------------------------------
  // 4. Not authenticated
  // --------------------------------------------------

  if (!user) {
    const loginUrl = request.nextUrl.clone();

    loginUrl.pathname = "/dashboard/login";

    // Remove any existing redirect parameter.
    loginUrl.searchParams.delete("redirect");

    return NextResponse.redirect(loginUrl);
  }

  // --------------------------------------------------
  // 5. Check admin role
  // --------------------------------------------------

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

  // --------------------------------------------------
  // 6. Authenticated but not an admin
  // --------------------------------------------------

  if (profileError || profile?.role !== "admin") {
    await supabase.auth.signOut();

    const loginUrl = request.nextUrl.clone();

    loginUrl.pathname = "/dashboard/login";
    loginUrl.searchParams.delete("redirect");

    return NextResponse.redirect(loginUrl);
  }

  // --------------------------------------------------
  // 7. Authenticated admin
  // --------------------------------------------------

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};