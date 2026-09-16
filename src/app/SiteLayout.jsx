"use client";

import { usePathname } from "next/navigation";

import Header from "../components/app-components/header/Header";
import Footer from "../components/app-components/Footer";

export default function SiteLayout({ children }) {
  const pathname = usePathname();

  // Admin/CMS pages should not display the public website header/footer
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <div className="main">
      <Header />
      {children}
      <Footer />
    </div>
  );
}