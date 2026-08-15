import imgInfo1 from '../../assets/images/softbild-info1.jpeg';
import imgInfo2 from '../../assets/images/softbild-info2.png';

import impoweringBusinessIcon from '../../assets/icons/empowering-business-icon.svg';
import innovationIcon from '../../assets/icons/innovation-icon.svg'

function InfoSection2(){
    return(
        <>
        <section className="container-fluid bg-blue2 py-80 bg-img-top">
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
                                <div className="info-img3-sec2details text-center">
                                    <h3 className="dark-headline text-gradient1">12 +</h3>
                                    <p className='mb-0'>Years Of Experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 ipad-mt-30 phone-mt-20">
                        <h2 className="dark-subtitle">Unleashing possibilities in the digital world.</h2>
                        <p>At SoftBild Solutions, we empower businesses to unlock their full potential in the ever-evolving digital landscape. From innovative tech solutions to seamless integration, we help you navigate the digital world with confidence and success.</p>

                    <div className="step-path1 pb-0">
                    {/* First List */}
                    <ul className="step-path1-list">
                        <li className="step-path1-list-item">
                        <div className="step-path1-list-image">
                            <img src={impoweringBusinessIcon} alt="" />
                        </div>
                        <div className="step-path1-list-content">
                            <h3>Empowering Business Growth</h3>
                            <p>Leverage the power of advanced technology to streamline operations, enhance customer experiences, and scale your business to new heights.</p>
                        </div>
                        </li>
                        <li className="step-path1-list-item mb-0">
                        <div className="step-path1-list-image">
                            <img src={innovationIcon} alt="" />
                        </div>
                        <div className="step-path1-list-content">
                            <h3>Innovating for a Smarter Tomorrow</h3>
                            <p>Our solutions combine creativity and technology, enabling your business to adapt, innovate, and thrive in a competitive digital era.</p>
                        </div>
                        </li>
                    </ul>
                    </div>

                </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default InfoSection2
