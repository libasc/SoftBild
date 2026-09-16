import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";

import "./globals.css";
import "../assets/css/Style.css";
import "../assets/css/responsive.css";
import "../components/app-components/blog/blog.css";
import "../pages/pricing/HireDeveloper.css";
import "../pages/pricing/ResourcePricing.css";
import "../components/app-components/header/header.css";

import Script from "next/script";
import BootstrapClient from "./BootstrapClient";
import SiteLayout from "./SiteLayout";

export const metadata = {
  metadataBase: new URL("https://softbild.com"),
  title: {
    default: "SoftBild | Software Development Company",
    template: "%s | SoftBild",
  },
  description:
    "SoftBild provides custom software development, web and mobile applications, CRM, ERP, eCommerce and digital solutions.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BootstrapClient />
        <SiteLayout>{children}</SiteLayout>

        {/* Google Analytics 4 */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;

            gtag('js', new Date());
            gtag('config', 'G-L5SB9G3FEW');
          `}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L5SB9G3FEW"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}