import HireDeveloper from "../../pages/pricing/HireDeveloper";

export const metadata = {
  title: 'Hire Developers',
  description: 'Hire experienced developers and dedicated technology professionals for your next software project.',
  alternates: { canonical: 'https://softbild.com/hire-developer' },
  openGraph: { title: 'Hire Developers', description: 'Hire experienced developers and dedicated technology professionals for your next software project.', url: 'https://softbild.com/hire-developer', siteName: "SoftBild", type: "website" },
};

export default function Page() {
  return <HireDeveloper />;
}
