"use client";
import HomeCta from "../../components/app-components/HomeCta";
import ServiceCard1 from "../../components/app-components/ServiceCard1";
import ServicesHeroSection from "../../components/app-components/ServicesHeroSection";
import TechnologyCard1 from "../../components/app-components/TechnologyCard1";
function Services(){
    return(
        <>
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