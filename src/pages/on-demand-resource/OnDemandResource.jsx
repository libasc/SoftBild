"use client";
import React, { useState } from 'react';
import OnDemandHeroSection from './OnDemandHeroSection';
import HomeCta from '../../components/app-components/HomeCta';
const onDemandImg1 = '/assets/images/softbild-ondemand-01.png';
const onDemandImg2 = '/assets/images/softbild-ondemand-02.png';
const onDemandImg3 = '/assets/images/softbild-ondemand-03.png';
const onDemandImg4 = '/assets/images/softbild-ondemand-04.png';
const ctaImg1 = '/assets/images/softbild-cta-img1.png';
const arrowIcon = '/assets/icons/arrow-right1.svg';
import Link from 'next/link';
import OnDemandTechCard from './OnDemandTechCard';
function OnDemandResource() {
  return (
    <>
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
                <Link href="/hire-developer" className="sf-btn1 pe-2">
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
                    <Link href="/contact" className='sf-btn1'>Get in touch</Link>
                </div>
            </div>
        </div>
    </section>
    {/* <HomeCta /> */}
    </>
  )
}

export default OnDemandResource