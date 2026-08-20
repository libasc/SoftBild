import React from "react";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";

import ServiceUiuxIcon from "../../assets/icons/service-uiux.svg";
import EleaningImg1 from "../../assets/images/portfolio-image/elearning-01.png";
import DentalImg1 from "../../assets/images/portfolio-image/elearning-01.png";

function PortfolioCard({ limit }) {
  const portfolioCardContent = [
    {
      id: 1,
      slug: "e-learning-platform",
      portfolioLogo: ServiceUiuxIcon,
      portfolioCardImage: EleaningImg1,
      portfolioTitle: "SoftBild Engineering: E-learning Platform",
      postfolioDescription:
        "Crafting visually appealing and user-friendly interfaces that enhance engagement and deliver seamless experiences across all platforms.",
      serviceReadMoreIcon: EastIcon,
    },

    {
    id: 2,
    slug: "dental-healthcare-imaging-data-systems",
    portfolioLogo: ServiceUiuxIcon,
    portfolioCardImage: DentalImg1,
    portfolioTitle: "Dental Healthcare Imaging and Data Systems",
    postfolioDescription:
        "A modern dental healthcare imaging and patient management platform designed to modernize a legacy Windows-based application.",
    serviceReadMoreIcon: EastIcon,
    },

  ];

  const limitedServices = limit
    ? portfolioCardContent.slice(0, limit)
    : portfolioCardContent;

  return (
    <>
      {limitedServices.map((portfolio) => (
        <div className="col-xl-4 col-lg-4 col-md-6 d-flex" key={portfolio.id}>
          <Link
            to={`/Portfolio/${portfolio.slug}`}
            className="text-decoration-none w-100"
          >
            <div className="sb-portfolio-card1">
              <div className="sb-portfolio-card1-content">
                <div className="sb-portfolio-card1-inner-content">
                  <div className="portfolio-logo">
                    <img src={portfolio.portfolioLogo} alt="" />
                  </div>

                  <div className="portfolio-card-image">
                    <img
                      src={portfolio.portfolioCardImage}
                      className="img-fluid"
                      alt=""
                    />
                  </div>

                  <h3 className="dark-title2">
                    {portfolio.portfolioTitle}
                  </h3>

                  <p>{portfolio.postfolioDescription}</p>
                </div>

                <div className="portfolio-read-more-btnwrapper">
                  <div className="portfolio-text-read-more">Read More</div>

                  <div className="portfolio-icon-read-more">
                    <portfolio.serviceReadMoreIcon />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}

export default PortfolioCard;