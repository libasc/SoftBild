import React from "react";
import ServiceUiuxIcon from "../../assets/icons/service-uiux.svg";
import ServiceWebAppDevelop from "../../assets/icons/service-webapplication.svg";
import ServiceMobileAppDevelop from "../../assets/icons/service-mobileapplication.svg";
import ServiceEcommerceDevelop from "../../assets/icons/service-ecommercedev.svg";
import ServiceErpDev from "../../assets/icons/service-erpdev.svg";
import ServiceCrmDev from "../../assets/icons/service-crmdev.svg";

import uiIcon from "../../assets/icons/technology-icon/softbild-ui.svg"
import htmlIcon from "../../assets/icons/technology-icon/softbild-html.svg"
import reactIcon from "../../assets/icons/technology-icon/softbild-react.svg"
import angularIcon from "../../assets/icons/technology-icon/softbild-angular.svg"
import dotnetIcon from "../../assets/icons/technology-icon/softbild-dotnet.svg"
import pythonIcon from "../../assets/icons/technology-icon/softbild-python.svg"
import javaIcon from "../../assets/icons/technology-icon/softbild-java.svg"
import cPlusPlusIcon from "../../assets/icons/technology-icon/softbild-cplusplus.svg"
import javascriptIcon from "../../assets/icons/technology-icon/softbild-javascript.svg"
import flutterIcon from "../../assets/icons/technology-icon/softbild-flutter.svg"
import phpIcon from "../../assets/icons/technology-icon/softbild-php.svg"
import wordpressIcon from "../../assets/icons/technology-icon/softbild-wordpress.svg"
import fullstackIcon from "../../assets/icons/technology-icon/softbild-fullstack.svg"
import sqlIcon from "../../assets/icons/technology-icon/softbild-sql.svg"

function OnDemandTechCard() {
  const servicesContent = [
    {
      serviceIcon: uiIcon,
      serviceTitle: "UI Designer",
      serviceDescription:
        "Our skilled UI Designers create intuitive, user-friendly, and visually appealing interfaces. They focus on enhancing user experience (UX) and ensuring a seamless interaction with your product, whether it’s a website, mobile app, or software solution.",
    },
    {
        serviceIcon: htmlIcon,
        serviceTitle: "HTML5 Developer",
        serviceDescription:
          "Our expert HTML5 Developers are proficient in crafting responsive and cross-platform web applications. They leverage the latest HTML5 standards to build interactive, media-rich, and mobile-friendly websites and web apps that engage users effectively.",
      },
    {
      serviceIcon: reactIcon,
      serviceTitle: "React Js Developer",
      serviceDescription:
        "Our React JS Developers are proficient in building fast, scalable, and dynamic web applications. With React's component-based architecture, they create interactive UIs and single-page applications (SPAs) that provide an optimal user experience across devices.",
    },
    {
      serviceIcon: reactIcon,
      serviceTitle: "React Native Developer",
      serviceDescription:
        "Our React Native Developers create cross-platform mobile apps with a single codebase, delivering native-like experiences for iOS and Android. They build high-performance, scalable apps with sleek UIs, seamless functionality, and robust integration to meet your business needs.",
    },
    {
      serviceIcon: angularIcon,
      serviceTitle: "Angular Js Developer",
      serviceDescription:
        "Angular JS Developers from our team specialize in creating dynamic and responsive web applications. With Angular’s powerful features like two-way data binding and dependency injection, they deliver highly interactive solutions that streamline development and enhance performance.",
    },
    {
      serviceIcon: dotnetIcon,
      serviceTitle: ".NET Developer",
      serviceDescription:
        "Our .NET Developers are skilled in building high-performance, secure web and enterprise applications. They utilize the .NET framework to create robust software solutions for diverse business needs, from custom apps to complex enterprise-level systems.",
    },
    {
      serviceIcon: pythonIcon,
      serviceTitle: "Python Developer",
      serviceDescription:
        "Python Developers at Softbild are experts in leveraging the simplicity and power of Python for building scalable, efficient, and innovative solutions. Whether it's web development, automation, or data science, our developers can handle a wide range of Python-based projects.",
    },
    {
      serviceIcon: javaIcon,
      serviceTitle: "Java Developer",
      serviceDescription:
        "Our Java Developers are highly experienced in crafting enterprise-grade applications with the versatility and security that Java offers. They build robust, cross-platform solutions for web and mobile apps, focusing on performance and scalability.",
    },
    {
        serviceIcon: cPlusPlusIcon,
        serviceTitle: "C++ Developer",
        serviceDescription:
            "Softbild’s C++ Developers specialize in high-performance applications where speed and efficiency are critical. With deep knowledge in system software, game development, and embedded systems, they deliver optimized solutions that handle complex computing tasks.",
    },
    {
        serviceIcon: flutterIcon,
        serviceTitle: "Flutter Developer",
        serviceDescription:
            "Our Flutter Developers build beautiful, high-performance cross-platform mobile applications. Leveraging Flutter's rich UI components and single codebase for both iOS and Android, they create seamless user experiences while ensuring rapid development and cost-effectiveness.",
    },
    {
        serviceIcon: javascriptIcon,
        serviceTitle: "JavaScript Developer",
        serviceDescription:
            "Our JavaScript Developers excel in creating interactive, dynamic web applications. With expertise in both front-end and back-end development (Node.js), they ensure your website is not only functional but also engaging and responsive across all devices.",
    },
    {
        serviceIcon: phpIcon,
        serviceTitle: "PHP Developer",
        serviceDescription:
            "Softbild's PHP Developers build robust server-side applications, content management systems (CMS), and dynamic websites. Their deep knowledge of PHP frameworks ensures the creation of scalable and efficient web solutions tailored to your business needs.",
    },
    {
      serviceIcon: wordpressIcon,
      serviceTitle: "Wordpress Developer",
      serviceDescription:
          "Our WordPress Developers specialize in crafting dynamic, SEO-friendly websites tailored to your needs. From custom themes to advanced plugins, they ensure responsive designs, seamless functionality, and optimal performance to enhance your online presence and user engagement.",
  },
    {
        serviceIcon: fullstackIcon,
        serviceTitle: "Full Stack Developer",
        serviceDescription:
            "Our on-demand Full Stack Developers bring expertise in both front-end and back-end technologies to build complete, scalable web applications. From responsive UIs to robust server-side logic, they ensure seamless, high-performance solutions tailored to your needs.",
    },
    {
        serviceIcon: sqlIcon,
        serviceTitle: "SQL Developer",
        serviceDescription:
            "SQL Developers at Softbild are adept at managing and optimizing databases. They ensure smooth data flow, efficient queries, and powerful database management for applications, ensuring your data is handled securely and processed efficiently for business-critical applications.",
    },

  ];

  // Generating cards dynamically
  const cardsElement = servicesContent.map((service, index) => (
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
        </div>
      </div>
    </div>
  ));

  return <>{cardsElement}</>;
}

export default OnDemandTechCard;
