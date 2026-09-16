import ResourcePricing from "../../pages/pricing/ResourcePricing";

export const metadata = {
  title: 'Resource Pricing',
  description: 'Explore SoftBild resource and dedicated developer pricing options.',
  alternates: { canonical: 'https://softbild.com/resource-pricing' },
  openGraph: { title: 'Resource Pricing', description: 'Explore SoftBild resource and dedicated developer pricing options.', url: 'https://softbild.com/resource-pricing', siteName: "SoftBild", type: "website" },
};

export default function Page() {
  return <ResourcePricing />;
}
