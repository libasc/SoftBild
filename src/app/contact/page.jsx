import Contactus from "../../pages/contact/Contactus";

export const metadata = {
  title: 'Contact SoftBild | Start a Software Project',
  description: 'Contact SoftBild to discuss custom software development, web, mobile, CRM, ERP and digital product projects.',
  alternates: { canonical: 'https://softbild.com/contact' },
  openGraph: { title: 'Contact SoftBild | Start a Software Project', description: 'Contact SoftBild to discuss custom software development, web, mobile, CRM, ERP and digital product projects.', url: 'https://softbild.com/contact', siteName: "SoftBild", type: "website" },
};

export default function Page() {
  return <Contactus />;
}
