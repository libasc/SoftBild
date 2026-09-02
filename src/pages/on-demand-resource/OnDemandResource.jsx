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
        <title>On-Demand Resource - SoftBild | Hire Skilled Professionals</title>
        <meta name="description" content="Hire experienced developers on demand with SoftBild. Flexible and skilled professionals ready to deliver exceptional results for your projects." />
        <meta name="keywords" content="on-demand developers, hire developers, skilled developers, flexible hiring, IT professionals, software developers, SoftBild" />
        <meta name="author" content="SoftBild" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="On-Demand Developers - SoftBild | Hire Skilled Professionals" />
        <meta property="og:description" content="Get access to skilled on-demand developers for your business needs. Flexible and reliable solutions from SoftBild." />
        <meta property="og:image" content="https://softbild.com/src/assets/images/softbild-ondemand-01.png" />
        <meta property="og:url" content="https://softbild.com/OnDemand-Resourse" />
        <meta property="og:type" content="website" />
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