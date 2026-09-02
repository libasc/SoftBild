import imgInfo1 from '../../assets/images/softbild-info1.jpeg';
import imgInfo2 from '../../assets/images/softbild-info2.png';
import arrowIcon from '../../assets/icons/arrow-right1.svg'
import { Link } from 'react-router-dom';

function AboutInfo(){
    return(
        <>
        <section className="container-fluid py-80 bg-img-top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="info-img3-wrapper">
                            <div className="info-img3-sec1">
                                <img src={imgInfo1} alt="" />
                            </div>
                            <div className="info-img3-sec2">
                                <div className="info-img3-sec2img">
                                    <img src={imgInfo2} alt="" />
                                </div>
                                <div className="info-img3-sec2details">
                                    <h3 className="dark-headline text-gradient1">12 +</h3>
                                    <p className='text-center mb-0'>Years Of Experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 ipad-mt-30 phone-mt-20">
                        <h2 className="dark-subtitle mb-15">We always make <span className="text-curve-line">the best</span></h2>
                        <p>At SoftBild, we are committed to delivering the highest quality in every project. We believe in crafting innovative, reliable, and impactful solutions that help your business thrive in the digital world. With a strong focus on customer satisfaction, we ensure that each solution we provide is tailored to meet your specific needs and exceed expectations. Whether it's UI/UX design, custom web development, or AI-powered applications, we always aim for excellence.</p>
                        <p>Our experienced team combines creativity, expertise, and cutting-edge technology to create digital solutions that deliver real business value. We take pride in understanding your goals and providing solutions that not only meet but surpass your business requirements. Trust SoftBild to always deliver the best, every time.</p>
                        <Link to="/HireDeveloper" className="sf-btn1 pe-2">
                        Enquire
                        <span className="icon-round1 ms-2">
                            <img src={arrowIcon} alt="Enquire" />
                        </span>
                        </Link>
                </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default AboutInfo
