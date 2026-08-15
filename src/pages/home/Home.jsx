import { Link } from "react-router-dom";
import BlogCard from "../../components/app-components/BlogCard";
import HomeBanner from "../../components/app-components/HomeBanner";
import HomeCard1 from "../../components/app-components/HomeCard1";
import HomeCta from "../../components/app-components/HomeCta";
import HomeCta2 from "../../components/app-components/HomeCta2";
import InfoSection2 from "../../components/app-components/InfoSection2";
import ServiceCard1 from "../../components/app-components/ServiceCard1";
import SliderReview from "../../components/app-components/SliderReview";
import TechnologyCard1 from "../../components/app-components/TechnologyCard1";

import { Helmet } from "react-helmet-async";

function Home(){
    return(
        <>
        <Helmet>
        <title>SoftBild - Innovative IT Solutions for Your Business</title>
        <meta name="description" content="SoftBild offers cutting-edge IT solutions, including UI/UX design, website development, custom apps, and eCommerce solutions. Empower your business with innovation." />
        <meta name="keywords" content="IT solutions, UI/UX design, website development, custom app development, eCommerce solutions, software development, SoftBild" />
        <meta name="author" content="SoftBild" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="SoftBild - Innovative IT Solutions for Your Business" />
        <meta property="og:description" content="SoftBild provides innovative IT services to help businesses grow. Specializing in custom app development, website design, and more." />
        <meta property="og:image" content="https://softbild.com/src/assets/images/SoftBild-contact-img-01.png" />
        <meta property="og:url" content="https://softbild.com/" />
        <meta property="og:type" content="website" />

        </Helmet>
        <HomeBanner></HomeBanner>
        

        {/* Why we’re better than others Section Starts */}
        <div className="container-fluid bg-blue1 py-80 phone-pb-10">
            <div className="container">
                <div className="row text-center text-white mb-20">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                        <h2 className="light-subtitle">Why we’re better than others!</h2>
                        <p className="mb-0">We stand out with our customer-centric approach, innovative strategies, and commitment to delivering tailored, scalable, and reliable tech solutions that drive real results for your business.</p>
                    </div>
                    <div className="col-lg-2"></div>
                </div>

                <div className="row">
                    <HomeCard1></HomeCard1>
                </div>
            </div>
        </div>
        {/* Why we’re better than others Section Ends */}


        <InfoSection2></InfoSection2>

        <section className="container-fluid bg-blue2 pb-80">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8 text-center">
                        <h2 className="dark-subtitle">Works on your favourite platforms</h2>
                        <p className="mb-0">Our solutions are designed to seamlessly integrate with your favorite platforms, ensuring flexibility, compatibility, and a smooth user experience across all your digital tools.</p>
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


        <HomeCta2></HomeCta2>
        

        {/* Services Section Starts */}
        <section className="container-fluid py-80 position-relative">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6 text-center">
                        <h2 className="dark-subtitle">Explore Our Services</h2>
                        <p className="mb-0">Discover our services, from UI/UX design to AI solutions, tailored to meet your business needs and drive success.</p>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
                <div className="row sb-services-wrapper mt-30 bg-img-service-home">
                    <ServiceCard1 limit={6}></ServiceCard1>
                    <div className="col-lg-12 text-center">
                        <Link to="/Services" className="sf-btn3">see all</Link>
                    </div>
                </div>
            </div>
        </section>
        {/* Services Section Ends */}
        

        {/* Review Section Starts */}
        <section className="container-fluid py-80 bg-blue1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <h2 className="light-headline">What People says</h2>
                        <p className="text-white">
                        Discover what our clients have to say about working with us. Hear firsthand how our innovative solutions and dedicated service have helped businesses achieve success and drive growth.
                        </p>
                    </div>
                    <div className="col-lg-8">  
                        <div className="slider-review-wrapper">
                            <SliderReview></SliderReview>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* Review Section Ends */}

        {/* Blog Section Starts  */}
        <section className="container-fluid py-80 bg-blue2 bg-img-top phone-pb-10">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6 text-center">
                        <h2 className="dark-subtitle">our Latest Blogs</h2>
                        <p className="mb-0">Explore our latest blogs for insights, tips, and trends in technology, design, and business to fuel your success!</p>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
                <div className="row sb-blog-wrapper mt-30 bg-img-blog-home">
                    <BlogCard></BlogCard>
                    {/* <div className="col-lg-12 text-center">
                        <button type="button" className="sf-btn3">see all</button>
                    </div> */}
                </div>
            </div>
        </section>
        {/* Blog Section Ends  */}
        <HomeCta></HomeCta>
        </>
    )
}
export default Home