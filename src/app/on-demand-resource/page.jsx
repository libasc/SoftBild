import OnDemandResource from "../../pages/on-demand-resource/OnDemandResource";

export const metadata = {
  title: 'On-Demand Developers',
  description: 'Access experienced developers for web, mobile and custom software development projects with SoftBild.',
  alternates: { canonical: 'https://softbild.com/on-demand-resource' },
  openGraph: { title: 'On-Demand Developers', description: 'Access experienced developers for web, mobile and custom software development projects with SoftBild.', url: 'https://softbild.com/on-demand-resource', siteName: "SoftBild", type: "website" },
};

export default function Page() {
  return <OnDemandResource />;
}
