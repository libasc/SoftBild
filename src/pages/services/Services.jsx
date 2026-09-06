import HomeCta from "../../components/app-components/HomeCta";
import ServiceCard1 from "../../components/app-components/ServiceCard1";
import ServicesHeroSection from "../../components/app-components/ServicesHeroSection";
import TechnologyCard1 from "../../components/app-components/TechnologyCard1";

import { Helmet } from "react-helmet-async";

function Services(){
    return(
        <>
        <Helmet>
    <title>Software Development Services | SoftBild</title>

    <meta
        name="description"
        content="Explore SoftBild's software development services, including custom software, web and mobile app development, UI/UX design, eCommerce, AI solutions, and dedicated development teams."
    />

    <meta
        name="author"
        content="SoftBild"
    />

    <meta
        name="robots"
        content="index, follow"
    />

    <link
        rel="canonical"
        href="https://softbild.com/Services"
    />

    {/* Open Graph */}
    <meta
        property="og:title"
        content="Software Development Services | SoftBild"
    />

    <meta
        property="og:description"
        content="Explore SoftBild's software development services, including custom software, web and mobile apps, UI/UX design, eCommerce, AI solutions, and dedicated development teams."
    />

    <meta
        property="og:image"
        content="https://softbild.com/assets/softbild-info1-B6ivxKpi.png"
    />

    <meta
        property="og:image:alt"
        content="SoftBild Software Development Services"
    />

    <meta
        property="og:url"
        content="https://softbild.com/Services"
    />

    <meta
        property="og:type"
        content="website"
    />

    <meta
        property="og:site_name"
        content="SoftBild"
    />

    {/* Twitter / X */}
    <meta
        name="twitter:card"
        content="summary_large_image"
    />

    <meta
        name="twitter:site"
        content="@SoftBild"
    />

    <meta
        name="twitter:title"
        content="Software Development Services | SoftBild"
    />

    <meta
        name="twitter:description"
        content="Explore SoftBild's software development services, including custom software, web and mobile apps, UI/UX design, eCommerce, AI solutions, and dedicated development teams."
    />

    <meta
        name="twitter:image"
        content="https://softbild.com/assets/softbild-info1-B6ivxKpi.png"
    />

    <meta
        name="twitter:image:alt"
        content="SoftBild Software Development Services"
    />
</Helmet>
        <ServicesHeroSection></ServicesHeroSection>

        {/* Services Section Starts */}
        <section className="container-fluid py-80 position-relative bg-img-top phone-pb-10">
            <div className="container">
                <div className="row sb-services-wrapper bg-img-service-home">
                    <ServiceCard1 />
                </div>
            </div>
        </section>
        {/* Services Section Ends */}

        <section className="container-fluid bg-blue2 py-80">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8 text-center">
                        <h2 className="dark-subtitle">Works on your favourite platforms</h2>
                        <p>Our solutions are designed to seamlessly integrate with your favorite platforms, ensuring flexibility, compatibility, and a smooth user experience across all your digital tools.</p>
                    </div>
                    <div className="col-lg-2"></div>
                    <div className="col-lg-12 mt-20">
                        <div className="tech-card1-wrapper">
                            <TechnologyCard1 />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <HomeCta />

        </>
    )
}
export default Services