import PortfolioDetail from "../../../components/app-components/portfolio/PortfolioDetail";

const slugs = [
  "e-learning-platform",
  "dental-healthcare-imaging-data-systems",
  "sharefarm-digital-agriculture-marketplace",
  "artinals-digital-asset-tokenization-platform",
];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default function Page() {
  return <PortfolioDetail />;
}
