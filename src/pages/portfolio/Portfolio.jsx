import { Link } from "react-router-dom";
import PortfolioHeroSection from "../../components/app-components/PortfolioHeroSection";
import HomeCta from "../../components/app-components/HomeCta";
import TeamsCard1 from "../../components/app-components/TeamsCard1";
import PortfolioCard from "../../components/app-components/PortfolioCard";

import { Helmet } from "react-helmet-async";

function Portfolio(){
    return(
        <>
        <Helmet>
    <title>Software Development Portfolio | SoftBild</title>

    <meta
        name="description"
        content="Explore SoftBild's software development portfolio featuring web applications, mobile apps, eCommerce platforms, custom software, UI/UX solutions, and digital products built for businesses worldwide."
    />

    <meta name="author" content="SoftBild" />
    <meta name="robots" content="index, follow" />

    <link
        rel="canonical"
        href="https://softbild.com/Portfolio"
    />

    {/* Open Graph */}
    <meta
        property="og:title"
        content="Software Development Portfolio | SoftBild"
    />

    <meta
        property="og:description"
        content="Explore SoftBild's portfolio of web and mobile applications, custom software, eCommerce platforms, UI/UX solutions, and digital products."
    />

    <meta
        property="og:image"
        content="https://softbild.com/assets/softbild-artinal-DVpdm-j-.png"
    />

    <meta
        property="og:image:alt"
        content="SoftBild Software Development Portfolio"
    />

    <meta
        property="og:url"
        content="https://softbild.com/Portfolio"
    />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="SoftBild" />

    {/* Twitter / X */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@SoftBild" />

    <meta
        name="twitter:title"
        content="Software Development Portfolio | SoftBild"
    />

    <meta
        name="twitter:description"
        content="Explore SoftBild's portfolio of web and mobile applications, custom software, eCommerce platforms, UI/UX solutions, and digital products."
    />

    <meta
        name="twitter:image"
        content="https://softbild.com/assets/softbild-artinal-DVpdm-j-.png"
    />

    <meta
        name="twitter:image:alt"
        content="SoftBild Software Development Portfolio"
    />
</Helmet>
        <PortfolioHeroSection></PortfolioHeroSection>

        {/* Services Section Starts */}
        <section className="container-fluid py-80 position-relative bg-img-top phone-pb-10">
            <div className="container">
                <div className="row sb-services-wrapper bg-img-service-home">
                    <PortfolioCard />
                </div>
            </div>
        </section>
        {/* Services Section Ends */}

        <section className="container-fluid py-80 bg-blue2 bg-img-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h2 className="dark-subtitle">Works on your <br></br>favourite platforms</h2>
                        <p>We specialize in delivering high-quality digital solutions across a wide range of platforms that your business depends on. Whether you need a custom website, a mobile app, or AI-driven solutions, we ensure your project is optimized for the platforms that matter most to your business.</p>

                        <p>With extensive expertise in various technologies and tools, we guarantee seamless integration, high performance, and superior user experiences on the platforms you love. Our commitment to innovation and excellence helps businesses achieve their goals efficiently, ensuring your digital presence is powerful, scalable, and aligned with your audience's needs.</p>

                        <p>Choose SoftBild to bring your ideas to life with cutting-edge solutions designed for your preferred platforms.</p>
                    </div>
                    <div className="col-lg-6">
                        <div className="info-img4-wrapper">
                            <div className="info-img4-sec1">
                                <h3 className="light-headline">12 +</h3>
                                <p className="text-white text-center mb-0">Years Of Experience</p>
                            </div>
                            <div className="info-img4-sec2">
                                <h3 className="dark-headline">2800</h3>
                                <p>Projects Done</p>
                            </div>
                            <div className="info-img4-sec3">
                                <h3 className="dark-headline">800</h3>
                                <p>Happy Clients</p>
                            </div>
                            <div className="info-img4-sec4">
                            <h3 className="dark-headline">20 +</h3>
                            <p>Awards</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/* <section className="container-fluid py-80 position-relative phone-pb-10">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6 text-center">
                        <h2 className="dark-subtitle">Meet Our Teams</h2>
                        <p className="mb-0">Get to know our talented teams of experts dedicated to delivering innovative solutions and ensuring your project's success.</p>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
                <div className="row sb-services-wrapper mt-30 ">
                    <TeamsCard1></TeamsCard1>
                    <div className="col-lg-12 text-center">
                        <button type="button" className="sf-btn3">se all</button>
                    </div>
                </div>
            </div>
        </section> */}

        <section className="container-fluid py-100 bg-img-overlay1 color-overlay1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6 text-center color-overlay1-content">
                        <h2 className="light-subtitle">We provide best tech solutions for your <span>business</span></h2>
                        <Link to="/HireDeveloper" className="sf-btn5 mt-20">Enquire</Link>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
        </section>
        <HomeCta></HomeCta>


        </>
    )
}
export default Portfolio