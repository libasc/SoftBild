import React from "react";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";

import ServiceUiuxIcon from "../../assets/icons/service-uiux.svg";
import EleaningImg1 from "../../assets/images/portfolio-image/elearning-01.png";
import DentalImg1 from "../../assets/images/portfolio-image/elearning-01.png";

import SharefarmLogo from "../../assets/images/sharefarm-logo.png";
import SharefarmImg1 from "../../assets/images/softbild-sharefarm.png";

import CieosLogo from "../../assets/images/cieos-logo.png";
import CieosImg1 from "../../assets/images/softbild-cieos.png";

import ArtinalsLogo from "../../assets/images/artinals-logo.png";
import ArtinalImg1 from "../../assets/images/softbild-artinal.png";

import MasterStudyLogo from "../../assets/images/master-study-logo.png";
import MasterStudyImg1 from "../../assets/images/softbild-masterstudy.png";

function PortfolioCard({ limit }) {
  const portfolioCardContent = [
    {
      id: 1,
      slug: "e-learning-platform",
      portfolioLogo: MasterStudyLogo,
      portfolioCardImage: MasterStudyImg1,
      portfolioTitle: "SoftBild Engineering: E-learning Platform",
      postfolioDescription:
        "Crafting visually appealing and user-friendly interfaces that enhance engagement and deliver seamless experiences across all platforms.",
      serviceReadMoreIcon: EastIcon,
    },

    {
    id: 2,
    slug: "dental-healthcare-imaging-data-systems",
    portfolioLogo: CieosLogo,
    portfolioCardImage: CieosImg1,
    portfolioTitle: "Dental Healthcare Imaging and Data Systems",
    postfolioDescription:
        "A modern dental healthcare imaging and patient management platform designed to modernize a legacy Windows-based application.",
    serviceReadMoreIcon: EastIcon,
    },

        {
    id: 3,
    slug: "sharefarm-digital-agriculture-marketplace",
    portfolioLogo: SharefarmLogo,
    portfolioCardImage: SharefarmImg1,
    portfolioTitle: "Sharefarm: Digital Agriculture Marketplace Platform",
    postfolioDescription:
        "digital platform designed to connect the agriculture ecosystem through modern technology, improving access, discovery...",
    serviceReadMoreIcon: EastIcon,
    },

    {
  id: 4,
  slug: "artinals-digital-asset-tokenization-platform",
  portfolioLogo: ArtinalsLogo,
  portfolioCardImage: ArtinalImg1,
  portfolioTitle: "Artinals: Digital Asset Tokenization Platform",
  postfolioDescription:
    "A Web3 platform for creating, managing, launching, and trading tokenized digital and real-world assets.",
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