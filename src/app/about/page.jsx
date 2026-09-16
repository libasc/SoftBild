import About from "../../pages/about/About";

export const metadata = {
  title: 'About SoftBild | Software Development Company',
  description: 'Learn about SoftBild, our software development expertise, delivery approach and experience building digital solutions for businesses worldwide.',
  alternates: { canonical: 'https://softbild.com/about' },
  openGraph: { title: 'About SoftBild | Software Development Company', description: 'Learn about SoftBild, our software development expertise, delivery approach and experience building digital solutions for businesses worldwide.', url: 'https://softbild.com/about', siteName: "SoftBild", type: "website" },
};

export default function Page() {
  return <About />;
}
