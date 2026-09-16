import { Suspense } from "react";
import Blog from "../../components/app-components/blog/Blog";

export const metadata = {
  title: "Software Development Blog",
  description:
    "Insights on software development, web and mobile applications, UI/UX, eCommerce, AI and digital solutions from SoftBild.",
  alternates: {
    canonical: "https://softbild.com/blog",
  },
  openGraph: {
    title: "Software Development Blog",
    description:
      "Insights on software development, web and mobile applications, UI/UX, eCommerce, AI and digital solutions from SoftBild.",
    url: "https://softbild.com/blog",
    siteName: "SoftBild",
    type: "website",
  },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Blog />
    </Suspense>
  );
}