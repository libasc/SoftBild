import React, { useState } from 'react';
import OnDemandHeroSection from './OnDemandHeroSection';
import HomeCta from '../../components/app-components/HomeCta';
import onDemandImg1 from "../../assets/images/softbild-ondemand-01.png";
import onDemandImg2 from "../../assets/images/softbild-ondemand-02.png";
import onDemandImg3 from "../../assets/images/softbild-ondemand-03.png";
import onDemandImg4 from "../../assets/images/softbild-ondemand-04.png";
import ctaImg1 from "../../assets/images/softbild-cta-img1.png";
import arrowIcon from '../../assets/icons/arrow-right1.svg';
import { Link } from 'react-router-dom';
import OnDemandTechCard from './OnDemandTechCard';
import { Helmet } from "react-helmet-async";


function OnDemandResource() {
  return (
    <>
<Helmet>
    <title>On-Demand Developers | Hire Skilled Professionals | SoftBild</title>

    <meta
        name="description"
        content="Hire skilled developers on demand with SoftBild. Get flexible access to experienced software professionals for web, mobile, and custom software development projects."
    />

    <meta name="author" content="SoftBild" />
    <meta name="robots" content="index, follow" />

    <link
        rel="canonical"
        href="https://softbild.com/OnDemand-Resourse"
    />

    {/* Open Graph */}
    <meta
        property="og:title"
        content="On-Demand Developers | Hire Skilled Professionals | SoftBild"
    />

    <meta
        property="og:description"
        content="Get flexible access to experienced developers for web, mobile, and custom software development projects with SoftBild."
    />

    <meta
        property="og:image"
        content="https://softbild.com/assets/softbild-ondemand-01-csZ6hQlh.png"
    />

    <meta
        property="og:image:alt"
        content="SoftBild On-Demand Developers and IT Professionals"
    />

    <meta
        property="og:url"
        content="https://softbild.com/OnDemand-Resourse"
    />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="SoftBild" />

    {/* Twitter / X */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@SoftBild" />

    <meta
        name="twitter:title"
        content="On-Demand Developers | Hire Skilled Professionals | SoftBild"
    />

    <meta
        name="twitter:description"
        content="Get flexible access to experienced developers for web, mobile, and custom software development projects with SoftBild."
    />

    <meta
        name="twitter:image"
        content="https://softbild.com/assets/softbild-ondemand-01-csZ6hQlh.png"
    />

    <meta
        name="twitter:image:alt"
        content="SoftBild On-Demand Developers and IT Professionals"
    />
</Helmet>
    <OnDemandHeroSection />
    <div className="container-fluid py-60">
        <div className="container">
            {/* <div className="row">
                <div className="col-lg-2"></div>
                    <div className="col-lg-8 text-center">
                        <h2 className="dark-subtitle">Boost Growth and Innovation with On-Demand Developers</h2>
                        <p className="mb-0">On-demand resources skilled in the latest technologies, delivering seamless integration and results for web, mobile, and enterprise solutions.</p>
                    </div>
                <div className="col-lg-2"></div>
            </div> */}
            <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-6 d-flex">
                    <div className="sb-ondemand-card1">
                        <div className="sb-ondemand-card1-content">
                        <div className="sb-ondemand-card1-inner-content">
                        <h3 className="dark-title2">Low Cost High<br />Productivity Services</h3>
                        <p>Take authentic feedbacks from customers of your app. Build a <span style={{background:'#7BFFDC'}}>quick list.</span></p>
                            <div className="ondemand-card-image">
                            <img src={onDemandImg1} alt="Blog Image" />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-6 d-flex">
                    <div className="sb-ondemand-card1">
                        <div className="sb-ondemand-card1-content">
                        <div className="sb-ondemand-card1-inner-content">
                        <h3 className="dark-title2">Refreshingly<br />Unique Model</h3>
                        <p><span style={{background:'#7BFFDC'}}>Make quick fixes</span> based on the feedbacks you’ve recived. With a happy smile.</p>
                            <div className="ondemand-card-image">
                            <img src={onDemandImg2} alt="Blog Image" />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-6 d-flex">
                    <div className="sb-ondemand-card1">
                        <div className="sb-ondemand-card1-content">
                        <div className="sb-ondemand-card1-inner-content">
                        <h3 className="dark-title2">One-Stop<br />Development Shop</h3>
                        <p>Enjoy more than 10x revenue with <span style={{background:'#7BFFDC'}}>real-time conversions.</span> Grow your business.</p>
                            <div className="ondemand-card-image">
                            <img src={onDemandImg3} alt="Blog Image" />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-6 d-flex">
                    <div className="sb-ondemand-card1">
                        <div className="sb-ondemand-card1-content">
                        <div className="sb-ondemand-card1-inner-content">
                        <h3 className="dark-title2">Work For<br />Higher Services</h3>
                        <p><span style={{background:'#7BFFDC'}}>Start your project in 48 hours</span> with experienced, trusted experts delivering results</p>
                            <div className="ondemand-card-image">
                            <img src={onDemandImg4} alt="Blog Image" />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <Link to="/HireDeveloper" className="sf-btn1 pe-2">
                    Hire On-Demand Resource
                    <span className="icon-round1 ms-2">
                        <img src={arrowIcon} alt="Get Started" />
                    </span>
                </Link>
            </div>
        </div>
    </div>
    <section className="container-fluid bg-blue2 py-60 position-relative">
        <div className="container">
            <div className="row">
                <div className="col-lg-2"></div>
                <div className="col-lg-8 text-center">
                    <h2 className="dark-subtitle">Hire Top Skilled Developers <br />On-Demand </h2>
                    <p className="mb-0">We provide access to top-tier, on-demand developers skilled in the latest technologies. Whether you need web, mobile, or enterprise expertise, our developers integrate seamlessly with your team to deliver outstanding results.</p>
                </div>
                <div className="col-lg-2"></div>
            </div>
            <div className="row sb-services-wrapper mt-30 bg-img-service-home">
                <OnDemandTechCard />
            </div>

            <div className="row mt-80 phone-mt-0">
                <div className="cta3-erapper py-80 text-white text-center">
                    <img src={ctaImg1} alt="" />
                    <p className='light-subtitle mt-40'>Still have questions?</p>
                    <p className='mb-30'>Can’t find the answer you’re looking for? Please contact to our friendly team.</p>
                    <Link to="/Contact" className='sf-btn1'>Get in touch</Link>
                </div>
            </div>
        </div>
    </section>
    {/* <HomeCta /> */}
    </>
  )
}

export default OnDemandResource