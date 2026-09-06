import { Link } from "react-router-dom";
import AboutHeroSection from "../../components/app-components/AboutHeroSection";
import AboutInfo from "../../components/app-components/AboutInfo";
import HomeCta from "../../components/app-components/HomeCta";
import TeamsCard1 from "../../components/app-components/TeamsCard1";

import { Helmet } from "react-helmet-async";

function About(){
    return(
        <>
<Helmet>
    <title>About SoftBild | Custom Software & IT Solutions Company</title>
    <meta
        name="description"
        content="Learn about SoftBild, a software development and IT solutions company delivering custom software, web and mobile apps, eCommerce solutions, UI/UX, and technology consulting for businesses worldwide."
    />
    <meta name="author" content="SoftBild" />
    <meta name="robots" content="index, follow" />
    <link
        rel="canonical"
        href="https://softbild.com/Aboutus"
    />
    {/* Open Graph */}
    <meta
        property="og:title"
        content="About SoftBild | Custom Software & IT Solutions Company"
    />
    <meta
        property="og:description"
        content="Learn about SoftBild and our expertise in custom software, web and mobile app development, eCommerce, UI/UX, and technology solutions."
    />
    <meta
        property="og:image"
        content="https://softbild.com/assets/softbild-info3-DukEY_uB.png"
    />
    <meta
        property="og:image:alt"
        content="About SoftBild - Custom Software and IT Solutions"
    />
    <meta
        property="og:url"
        content="https://softbild.com/Aboutus"
    />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="SoftBild" />
    {/* Twitter / X */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@SoftBild" />
    <meta
        name="twitter:title"
        content="About SoftBild | Custom Software & IT Solutions Company"
    />
    <meta
        name="twitter:description"
        content="Learn about SoftBild and our expertise in custom software, web and mobile app development, eCommerce, UI/UX, and technology solutions."
    />
    <meta
        name="twitter:image"
        content="https://softbild.com/assets/softbild-info3-DukEY_uB.png"
    />
    <meta
        name="twitter:image:alt"
        content="About SoftBild - Custom Software and IT Solutions"
    />
</Helmet>
        <AboutHeroSection></AboutHeroSection>
        <AboutInfo></AboutInfo>

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
                                <h3 className="light-headline">7 +</h3>
                                <p className="text-white text-center mb-0">Years Of Experience</p>
                            </div>
                            <div className="info-img4-sec2">
                                <h3 className="dark-headline">100 +</h3>
                                <p>Projects Done</p>
                            </div>
                            <div className="info-img4-sec3">
                                <h3 className="dark-headline">15 +</h3>
                                <p>Countries Served</p>
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
export default About