import Home from "../pages/home/Home";

export const metadata = {
  title: 'SoftBild | Software Development Company',
  description: 'Custom software development, web and mobile applications, CRM, ERP, eCommerce and digital solutions from SoftBild.',
  alternates: { canonical: 'https://softbild.com/' },
  openGraph: { title: 'SoftBild | Software Development Company', description: 'Custom software development, web and mobile applications, CRM, ERP, eCommerce and digital solutions from SoftBild.', url: 'https://softbild.com/', siteName: "SoftBild", type: "website" },
};

export default function Page() {
  return <Home />;
}
