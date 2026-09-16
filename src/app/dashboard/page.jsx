import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import Index from "../../dashboard/Index";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // No authenticated user
  if (!user) {
    redirect("/dashboard/login");
  }

  // Check admin role
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // Authenticated but not an admin
  if (error || profile?.role !== "admin") {
    redirect("/dashboard/login");
  }

  return <Index />;
}