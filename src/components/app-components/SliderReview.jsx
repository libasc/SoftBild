import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReviewerImg from "../../assets/images/reviewer-img1.png";
import nicoleImage from "../../assets/images/reviewer/softbild-nicole.jpg";
import vinceImage from "../../assets/images/reviewer/softbild-vince.jpg";


// function SliderReview(){
//         var settings = {
//             dots: true,
//             infinite: true,
//             autoplay: true,
//             speed: 500,
//             slidesToShow: 2,
//             slidesToScroll: 1,
//             arrows: false,
//         };

function SliderReview() {
    var settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024, // For iPad and smaller devices
          settings: {
            slidesToShow: 1, // Show 1 slide
            slidesToScroll: 1,
            dots: true,
          },
        },
        {
          breakpoint: 768, // For smaller tablets or large phones
          settings: {
            slidesToShow: 1, // Show 1 slide
            slidesToScroll: 1,
            dots: true,
          },
        },
      ],
    };
  

    return(
        <>
        <Slider {...settings}>
            <div className="slider-review-card">
                <div className="reviewer-info-wrapper">
                    <div className="reviewer-info">
                        <div className="reviewer-image">
                            <img src={nicoleImage} alt="" />
                        </div>
                        <div className="reviewer-name">
                            <p className="mb-0">Nicole Briggs</p>
                            <p className="mb-0">CEO in Real-Estate</p>
                        </div>
                    </div>
                    <div className="reviewer-rating">
                        <p className="m-0 p-0">5.0 *</p>
                    </div>
                </div>
                <div className="review-content">
                    <p className="review-title">Good Job!!</p>
                    <p className="review-desc">
                    "SoftBild team recreated an app I was paying for, adding features that improved usability and my dashboard. Their expertise impressed me, and I’d gladly hire them again"
                    </p>
                </div>
            </div>
            <div className="slider-review-card">
                <div className="reviewer-info-wrapper">
                    <div className="reviewer-info">
                        <div className="reviewer-image">
                            <img src={vinceImage} alt="" />
                        </div>
                        <div className="reviewer-name">
                            <p className="mb-0">Vince Peak</p>
                            <p className="mb-0">Founder in Farming</p>
                        </div>
                    </div>
                    <div className="reviewer-rating">
                        <p className="m-0 p-0">4.5 *</p>
                    </div>
                </div>
                <div className="review-content">
                    <p className="review-title">Good Job!!</p>
                    <p className="review-desc">
                    “The SoftBild team demonstrated professionalism with clear communication, delivering a user-friendly, visually appealing, robust marketplace tailored to support climate-smart growers and their needs.”
                    </p>
                </div>
            </div>
        </Slider>
        </>
    )
}
export default SliderReview