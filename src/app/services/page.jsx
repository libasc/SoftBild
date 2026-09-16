import Services from "../../pages/services/Services";

export const metadata = {
  title: 'Software Development Services',
  description: 'Explore SoftBild software development services including web, mobile, UI/UX, eCommerce, ERP, CRM and custom software development.',
  alternates: { canonical: 'https://softbild.com/services' },
  openGraph: { title: 'Software Development Services', description: 'Explore SoftBild software development services including web, mobile, UI/UX, eCommerce, ERP, CRM and custom software development.', url: 'https://softbild.com/services', siteName: "SoftBild", type: "website" },
};

export default function Page() {
  return <Services />;
}
