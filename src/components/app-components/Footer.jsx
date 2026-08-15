import footerLogo from '../../assets/images/softbild-logo-white.svg';
import fbicon from '../../assets/icons/social-facebook.svg';
import instaicon from '../../assets/icons/social-instagram.svg';
import twittericon from '../../assets/icons/social-twitter.svg';
import linkedinicon from '../../assets/icons/social-linkedin.svg';
import email from '../../assets/icons/email1.svg';
import mapIcon from '../../assets/icons/map.svg'
import { Link } from 'react-router-dom';

function Footer(){
    return(
        <>
        <footer className="container-fluid">
            <div className="container py-80">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-12">
                        <div className="footer-col-section">
                            <div className="footer-logo">
                                <img src={footerLogo} alt="Footer Logo" />
                            </div>
                            <div className="footer-info my-20 pr-60">
                            <p className='mb-0'>“SoftBild is a provider of innovative tech solutions, specializing in UI/UX design, web and mobile app development, e-commerce, ERP, and CRM systems. We help businesses thrive in the digital world with customized, scalable solutions that drive growth and efficiency.”</p>
                            </div>
                            <div className="footer-social-media">
                                <ul>
                                    <li><Link to="https://www.facebook.com/softbild"><img src={fbicon} alt="facebook" /></Link></li>
                                    <li><Link to="https://www.instagram.com/softbild/"><img src={instaicon} alt="instagram" /></Link></li>
                                    <li><Link to="https://x.com/SoftBild"><img src={twittericon} alt="twitter" /></Link></li>
                                    <li><Link to="https://www.linkedin.com/company/softbild/"><img src={linkedinicon} alt="linkedin" /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-3 col-xs-5 col-5 mt-md-3 phone-mt-20">
                        <div className="footer-col-section">
                            <p className='footer-menu-heading'>Explore</p>
                            <ul className='footer-menu-list'>
                                <li><Link to="/Aboutus">About Us</Link></li>
                                <li><Link to="/Services">Services</Link></li>
                                <li><Link to="/OnDemand-Resourse">On-Demand Resource</Link></li>
                                <li><Link to="/Contact">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-7 col-7 mt-md-3 phone-mt-20">
                        <div className="footer-col-section">
                            <p className='footer-menu-heading'>Services</p>
                            <ul className='footer-menu-list'>
                                <li><Link to="/Services">UI/UX</Link></li>
                                <li><Link to="/Services">Web Application Development</Link></li>
                                <li><Link to="/Services">Mobile Application Development</Link></li>
                                <li><Link to="/Services">Explore All Services</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5 mt-md-3 phone-mt-20">
                        <div className="footer-col-section">
                            <p className='footer-menu-heading'>Contact</p>
                            <ul className='footer-menu-list'>
                                <li><img src={email} alt="email" /> : <Link to="mailto:info@softbild.com">info@softbild.com</Link></li>
                                <li><img src={email} alt="email" /> : <Link to="mailto:sales@softbild.com">sales@softbild.com</Link></li>
                                <li><img src={mapIcon} alt="email" /> : New Delhi, India - 110025</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row footer-copyright">
                <div className="col-lg-12">
                    <p>&copy; copyright 2025 by <a href="#">SoftBild</a> | Privacy Policy</p>
                </div>
            </div>
        </footer>
        </>
    )
}
export default Footer