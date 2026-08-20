// import '../../app-components/header/header.css'
// import MenuIcon from '@mui/icons-material/Menu';
// import logoMain from '../../../assets/images/softbild-logo.svg';
// import fbicon from '../../../assets/icons/social-facebook.svg';
// import instaicon from '../../../assets/icons/social-instagram.svg';
// import twittericon from '../../../assets/icons/social-twitter.svg';
// import linkedinicon from '../../../assets/icons/social-linkedin.svg';
// import email from '../../../assets/icons/email1.svg';
// import { Link, NavLink } from 'react-router-dom';


// function Header(){
//     return(
//         <>
//         <div className="container-fluid bg-blue1 text-white py-10">
//             <div className="container px-0">
//                 <div className="small-header">
//                     <div className="sh-email"><span><img src={email} alt="email" /> &nbsp;: </span>
//                     <Link to="mailto:info@softbild.com">info@softbild.com</Link>
//                     </div>
//                     <div className="sh-social">
//                         <ul>
//                             <li><Link to="https://www.facebook.com/softbild"><img src={fbicon} alt="facebook" /></Link></li>
//                             <li><Link to="https://www.instagram.com/softbild/"><img src={instaicon} alt="instagram" /></Link></li>
//                             <li><Link to="https://x.com/SoftBild"><img src={twittericon} alt="twitter" /></Link></li>
//                             <li><Link to="https://www.linkedin.com/company/softbild/"><img src={linkedinicon} alt="linkedin" /></Link></li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className="container-fluid bg-white py-10 shadow1 main-header-wrapper sticky-top">
//             <div className="container px-0">
//             <header>
//             <nav className="navbar navbar-expand-lg">
//                 <div className="container-fluid">
//                     <Link to="/" className="navbar-brand" href="#">
//                         <div className="main-logo">
//                             <img src={logoMain} alt="Logo" />
//                         </div>
//                     </Link>
//                     <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className='hamberger-icon'><MenuIcon /></span>
//                     </button>
//                         <div className="collapse navbar-collapse main-header-menu-wrapper" id="navbarSupportedContent">
//                             <ul className="navbar-nav m-auto">
//                                 <li><NavLink to="/">Home</NavLink></li>
//                                 <li><NavLink to="/Aboutus">About Us</NavLink></li>
//                                 <li><NavLink to="/Services">Services</NavLink></li>
//                                 <li><NavLink to="/OnDemand-Resourse">On-Demand Resource</NavLink></li>
//                                 <li><NavLink to="/Contact">Contact Us</NavLink></li>
//                                 {/* <li className="dropdown">
//                                     <NavLink className="dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                         Dropdown
//                                     </NavLink>
//                                     <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//                                         <li><a className="dropdown-item" href="#">Action</a></li>
//                                         <li><a className="dropdown-item" href="#">Another action</a></li>
//                                     </ul>
//                                 </li> */}
//                             </ul>
//                         </div>
//                         <div className='header-btn-wrpr'>
//                             <Link to="/Contact" className="sf-btn1">
//                                 Start a Project
//                             </Link>
//                         </div>
//                     </div>
//                 </nav>
//             </header>
//             </div>
//         </div>
//         </>
//     )
// }
// export default Header



import React, { useRef } from 'react';
import '../../app-components/header/header.css';
import MenuIcon from '@mui/icons-material/Menu';
import logoMain from '../../../assets/images/softbild-logo.svg';
import fbicon from '../../../assets/icons/social-facebook.svg';
import instaicon from '../../../assets/icons/social-instagram.svg';
import twittericon from '../../../assets/icons/social-twitter.svg';
import linkedinicon from '../../../assets/icons/social-linkedin.svg';
import email from '../../../assets/icons/email1.svg';
import { Link, NavLink } from 'react-router-dom';

function Header() {
    const navbarRef = useRef(null);

    const handleNavClick = () => {
        if (navbarRef.current && navbarRef.current.classList.contains('show')) {
            navbarRef.current.classList.remove('show');
        }
    };

    return (
        <>
            <div className="container-fluid bg-blue1 text-white py-10">
                <div className="container px-0">
                    <div className="small-header">
                        <div className="sh-email">
                            <span><img src={email} alt="email" /> &nbsp;: </span>
                            <Link to="mailto:info@softbild.com">info@softbild.com</Link>
                        </div>
                        <div className="sh-social">
                            <ul>
                                <li><Link to="https://www.facebook.com/softbild"><img src={fbicon} alt="facebook" /></Link></li>
                                <li><Link to="https://www.instagram.com/softbild/"><img src={instaicon} alt="instagram" /></Link></li>
                                <li><Link to="https://x.com/SoftBild"><img src={twittericon} alt="twitter" /></Link></li>
                                <li><Link to="https://www.linkedin.com/company/softbild/"><img src={linkedinicon} alt="linkedin" /></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-white py-10 shadow1 main-header-wrapper sticky-top">
                <div className="container px-0">
                    <header>
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid px-0">
                                <Link to="/" className="navbar-brand">
                                    <div className="main-logo">
                                        <img src={logoMain} alt="Logo" />
                                    </div>
                                </Link>
                                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="hamberger-icon"><MenuIcon /></span>
                                </button>
                                <div className="collapse navbar-collapse main-header-menu-wrapper" id="navbarSupportedContent" ref={navbarRef}>
                                    <ul className="navbar-nav m-auto">
                                        <li><NavLink to="/" onClick={handleNavClick}>Home</NavLink></li>
                                        <li><NavLink to="/Aboutus" onClick={handleNavClick}>About Us</NavLink></li>
                                        <li><NavLink to="/Services" onClick={handleNavClick}>Services</NavLink></li>
                                        <li><NavLink to="/Portfolio" onClick={handleNavClick}>Portfolio</NavLink></li>
                                        {/* <li><NavLink to="/Blog" onClick={handleNavClick}>Blog</NavLink></li> */}
                                        <li><NavLink to="/OnDemand-Resourse" onClick={handleNavClick}>On-Demand Resource</NavLink></li>
                                        <li><NavLink to="/Contact" onClick={handleNavClick}>Contact Us</NavLink></li>
                                    </ul>
                                </div>
                                <div className="header-btn-wrpr">
                                    <Link to="/Contact" className="sf-btn1">
                                        Start a Project
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </header>
                </div>
            </div>
        </>
    );
}

export default Header;
