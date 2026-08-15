import { Link } from 'react-router-dom'
import arrowIcon from '../../assets/icons/arrow-right1.svg'
import heroImage from '../../assets/images/SoftBild-Home-Hero.png'

function HomeBanner(){
    return(
        <>
        <section className="container-fluid bg-blue2 py-80 phone-pt-0">
            <div className="container">
                <div className="row home-hero ">
                    <div className="home-h-content">
                        <p>Welcome to Softbild Solutions</p>
                        <h1 className="dark-headline">We provide best tech solutions for your <span className="text-gradient1">business</span></h1>
                        <p className='dark-title3'>Empowering your vision with top-notch technology solutions tailored to drive growth and optimize business operations.</p>
                        <Link to="/Contact" className="sf-btn1 pe-2">
                        Get Started
                        <span className="icon-round1 ms-2">
                            <img src={arrowIcon} alt="Get Started" />
                        </span>
                        </Link>
                    </div>
                    <div className="home-h-video">
                        <div className="home-h-video-wrapper d-flex justify-content-center align-items-center gap-2">
                            <img src={heroImage} alt="" className='img-fluid' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default HomeBanner