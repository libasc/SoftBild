import Portfolio from "../../pages/portfolio/Portfolio";

export const metadata = {
  title: 'Software Development Portfolio',
  description: 'Explore SoftBild software development projects across education, healthcare, agriculture and digital platforms.',
  alternates: { canonical: 'https://softbild.com/portfolio' },
  openGraph: { title: 'Software Development Portfolio', description: 'Explore SoftBild software development projects across education, healthcare, agriculture and digital platforms.', url: 'https://softbild.com/portfolio', siteName: "SoftBild", type: "website" },
};

export default function Page() {
  return <Portfolio />;
}
