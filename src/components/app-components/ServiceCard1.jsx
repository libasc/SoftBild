// import React from "react";
// import EastIcon from "@mui/icons-material/East";
// import ServiceUiuxIcon from "../../assets/icons/service-uiux.svg";
// import ServiceWebAppDevelop from "../../assets/icons/service-webapplication.svg";
// import ServiceMobileAppDevelop from "../../assets/icons/service-mobileapplication.svg";
// import ServiceEcommerceDevelop from "../../assets/icons/service-ecommercedev.svg";
// import ServiceErpDev from "../../assets/icons/service-erpdev.svg";
// import ServiceCrmDev from "../../assets/icons/service-crmdev.svg";

// function ServiceCard1() {
//   const servicesContent = [
//     {
//       serviceIcon: ServiceUiuxIcon,
//       serviceTitle: "UI/UX",
//       serviceDescription:
//         "Crafting visually appealing and user-friendly interfaces that enhance engagement and deliver seamless experiences across all platforms.",
//       serviceReadMoreIcon: EastIcon,
//     },
//     {
//       serviceIcon: ServiceWebAppDevelop,
//       serviceTitle: "Web Application Development",
//       serviceDescription:
//         "Building robust, scalable, and high-performing web applications tailored to meet your business needs and ensure optimal functionality.",
//       serviceReadMoreIcon: EastIcon,
//     },
//     {
//       serviceIcon: ServiceMobileAppDevelop,
//       serviceTitle: "Mobile Application Development",
//       serviceDescription:
//         "Creating innovative and user-centric mobile apps for iOS and Android, designed to boost your brand’s reach and customer interaction.",
//       serviceReadMoreIcon: EastIcon,
//     },
//     {
//       serviceIcon: ServiceEcommerceDevelop,
//       serviceTitle: "E-Commerce Development",
//       serviceDescription:
//         "Developing secure, feature-rich, and scalable e-commerce platforms that drive sales, optimize user experiences, and grow your online business.",
//       serviceReadMoreIcon: EastIcon,
//     },
//     {
//       serviceIcon: ServiceErpDev,
//       serviceTitle: "ERP Development",
//       serviceDescription:
//         "Streamlining your business processes with custom ERP solutions that integrate operations, boost productivity, and enhance decision-making.",
//       serviceReadMoreIcon: EastIcon,
//     },
//     {
//       serviceIcon: ServiceCrmDev,
//       serviceTitle: "CRM Development",
//       serviceDescription:
//         "Delivering powerful CRM solutions to manage customer relationships, track interactions, and boost sales performance effectively.",
//       serviceReadMoreIcon: EastIcon,
//     },
//     {
//       serviceIcon: ServiceCrmDev,
//       serviceTitle: "SEO (Search Engine Optimization)",
//       serviceDescription:
//         "Boosting visibility with strategic SEO. We improve rankings, drive traffic, and optimize on-page, off-page, and technical SEO to stay competitive.",
//       serviceReadMoreIcon: EastIcon,
//     },
//     {
//       serviceIcon: ServiceCrmDev,
//       serviceTitle: "Social Media Marketing",
//       serviceDescription:
//         "Delivering powerful CRM solutions to manage customer relationships, track interactions, and boost sales performance effectively.",
//       serviceReadMoreIcon: EastIcon,
//     },
//   ];

//   // Generating cards dynamically
//   const cardsElement = servicesContent.map((service, index) => (
//     <div className="col-xl-4 col-lg-4 col-md-6 d-flex" key={index}>
//       <div className="sb-services-card1">
//         <div className="sb-services-card1-content">
//           <div className="sb-services-card1-inner-content">
//             <div className="services-icon">
//               <img src={service.serviceIcon} alt="Service Icon" />
//             </div>
//             <h3 className="dark-title2">{service.serviceTitle}</h3>
//             <p>{service.serviceDescription}</p>
//           </div>
//           <div className="service-read-more-btnwrapper">
//             <div className="services-text-read-more">Read More</div>
//             <div className="services-icon-read-more">
//               <service.serviceReadMoreIcon />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   ));

//   return <>{cardsElement}</>;
// }

// export default ServiceCard1;



import React from "react";
import EastIcon from "@mui/icons-material/East";
import ServiceUiuxIcon from "../../assets/icons/service-uiux.svg";
import ServiceWebAppDevelop from "../../assets/icons/service-webapplication.svg";
import ServiceMobileAppDevelop from "../../assets/icons/service-mobileapplication.svg";
import ServiceEcommerceDevelop from "../../assets/icons/service-ecommercedev.svg";
import ServiceErpDev from "../../assets/icons/service-erpdev.svg";
import ServiceCrmDev from "../../assets/icons/service-crmdev.svg";

function ServiceCard1({ limit }) {
  const servicesContent = [
    {
      serviceIcon: ServiceUiuxIcon,
      serviceTitle: "UI/UX",
      serviceDescription:
        "Crafting visually appealing and user-friendly interfaces that enhance engagement and deliver seamless experiences across all platforms.",
      serviceReadMoreIcon: EastIcon,
    },
    {
      serviceIcon: ServiceWebAppDevelop,
      serviceTitle: "Web Application Development",
      serviceDescription:
        "Building robust, scalable, and high-performing web applications tailored to meet your business needs and ensure optimal functionality.",
      serviceReadMoreIcon: EastIcon,
    },
    {
      serviceIcon: ServiceMobileAppDevelop,
      serviceTitle: "Mobile Application Development",
      serviceDescription:
        "Creating innovative and user-centric mobile apps for iOS and Android, designed to boost your brand’s reach and customer interaction.",
      serviceReadMoreIcon: EastIcon,
    },
    {
      serviceIcon: ServiceEcommerceDevelop,
      serviceTitle: "E-Commerce Development",
      serviceDescription:
        "Developing secure, feature-rich, and scalable e-commerce platforms that drive sales, optimize user experiences, and grow your online business.",
      serviceReadMoreIcon: EastIcon,
    },
    {
      serviceIcon: ServiceErpDev,
      serviceTitle: "ERP Development",
      serviceDescription:
        "Streamlining your business processes with custom ERP solutions that integrate operations, boost productivity, and enhance decision-making.",
      serviceReadMoreIcon: EastIcon,
    },
    {
      serviceIcon: ServiceCrmDev,
      serviceTitle: "CRM Development",
      serviceDescription:
        "Delivering powerful CRM solutions to manage customer relationships, track interactions, and boost sales performance effectively.",
      serviceReadMoreIcon: EastIcon,
    },
    {
      serviceIcon: ServiceCrmDev,
      serviceTitle: "SEO (Search Engine Optimization)",
      serviceDescription:
        "Boosting visibility with strategic SEO. We improve rankings, drive traffic, and optimize on-page, off-page, and technical SEO to stay competitive.",
      serviceReadMoreIcon: EastIcon,
    },
    {
      serviceIcon: ServiceCrmDev,
      serviceTitle: "Social Media Marketing",
      serviceDescription:
        "Creating targeted social media campaigns to amplify your brand, grow your presence, increase engagement, and drive traffic and conversions.",
      serviceReadMoreIcon: EastIcon,
    },
  ];

  // If a limit is provided, slice the array to display only 'limit' services
  const limitedServices = limit ? servicesContent.slice(0, limit) : servicesContent;

  // Generating cards dynamically
  const cardsElement = limitedServices.map((service, index) => (
    <div className="col-xl-4 col-lg-4 col-md-6 d-flex" key={index}>
      <div className="sb-services-card1">
        <div className="sb-services-card1-content">
          <div className="sb-services-card1-inner-content">
            <div className="services-icon">
              <img src={service.serviceIcon} alt="Service Icon" />
            </div>
            <h3 className="dark-title2">{service.serviceTitle}</h3>
            <p>{service.serviceDescription}</p>
          </div>
          {/* <div className="service-read-more-btnwrapper">
            <div className="services-text-read-more">Read More</div>
            <div className="services-icon-read-more">
              <service.serviceReadMoreIcon />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  ));

  return <>{cardsElement}</>;
}

export default ServiceCard1;
