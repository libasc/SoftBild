import React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import EastIcon from "@mui/icons-material/East";

import EleaningImg1 from "../../assets/images/portfolio-image/elearning-01.png";

import CieosLogo from "../../assets/images/cieos-logo.png";
import CieosImg1 from "../../assets/images/softbild-cieos.png";

import SharefarmLogo from "../../assets/images/sharefarm-logo.png";
import SharefarmImg1 from "../../assets/images/softbild-sharefarm.png";

import ArtinalsLogo from "../../assets/images/artinals-logo.png";
import ArtinalImg1 from "../../assets/images/softbild-artinal.png";

import MasterStudyLogo from "../../assets/images/master-study-logo.png";
import MasterStudyImg1 from "../../assets/images/softbild-masterstudy.png";

import HomeCta from "../../components/app-components/HomeCta";


function PortfolioDetail() {
  const { slug } = useParams();


   
  const portfolioData = [
   {
  slug: "e-learning-platform",

  portfolioLogo: MasterStudyLogo,
  portfolioCardImage: MasterStudyImg1,

  title: "SoftBild Engineering: School ERP Platform",

  description:
    "A comprehensive School ERP ecosystem connecting schools, teachers, students, and parents through dedicated mobile applications and a centralized web-based management platform.",

  industry: "Education",

  projectType: "School ERP & Education Management Platform",

  role: "UI/UX Designer and React.js Frontend Developer",

  overview:
    "The project involved designing and developing a comprehensive School ERP ecosystem that connects schools, teachers, students, and parents through dedicated mobile applications and a centralized web-based management platform. The solution was designed to provide a consistent digital experience across web and mobile platforms while simplifying academic, administrative, communication, attendance, and financial management.",

  challenge:
    "The project required creating role-based workflows and interfaces for administrators, teachers, students, and parents while maintaining a consistent experience across web and mobile platforms. Different users needed access to different academic, administrative, communication, attendance, assignment, examination, and financial information based on their roles.",

  solution:
    "SoftBild designed the UI/UX for the Parent, Student, and Teacher mobile applications, designed the centralized ERP web application, and developed its frontend using React.js. The solution brought school management activities into a centralized ecosystem with dedicated experiences for parents, students, teachers, and administrators.",

  technologies: [
    "UI/UX Design",
    "Figma",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB"
  ],

  features: [
    {
      title: "Parent App",
      description:
        "Parents can manage children profiles, view academic activities, scheduled classes, attendance, announcements, leave requests, report cards, messaging, fees, accounts, and overdue payment details."
    },

    {
      title: "Student App",
      description:
        "Students can access upcoming classes, schedules, homework, assignments, digital books, attendance, leave information, tests, quizzes, announcements, scheduled messaging, and their profile."
    },

    {
      title: "Teacher App",
      description:
        "Teachers can access digital books and scheduled classes, manage student attendance, create and manage assignments, tests and quizzes, publish announcements, and communicate with students."
    },

    {
      title: "School Management",
      description:
        "The centralized ERP platform provides management of schools, students, teachers, and parents through a unified web-based administration system."
    },

    {
      title: "Classes & Scheduling",
      description:
        "Schools can manage classes, schedules, and academic activities from the centralized ERP platform."
    },

    {
      title: "Assignments & Homework",
      description:
        "The platform supports assignment and homework management across the relevant teacher and student workflows."
    },

    {
      title: "Tests & Quizzes",
      description:
        "Teachers and administrators can manage tests and quizzes while students can access their assigned assessments."
    },

    {
      title: "Attendance & Leave",
      description:
        "The system provides attendance and leave management for students and related academic workflows."
    },

    {
      title: "Announcements & Messaging",
      description:
        "The platform enables schools, teachers, students, and parents to communicate through announcements and messaging features."
    },

    {
      title: "Report Cards",
      description:
        "Parents and students can access academic report card information through the platform."
    },

    {
      title: "Fees & Accounts",
      description:
        "Parents can view fees, account information, and overdue payment details through the application."
    },

    {
      title: "Mobile Application Management",
      description:
        "The centralized ERP web application provides management capabilities for activities and information used across the mobile applications."
    }
  ],

  integrations: [],

  screenshots: [
    EleaningImg1,
    EleaningImg1,
    EleaningImg1
  ],

  results:
    "The project created a connected School ERP ecosystem that brought schools, teachers, students, and parents onto a centralized digital platform. The solution provided dedicated role-based experiences across mobile and web applications while organizing academic activities, communication, attendance, assignments, assessments, report cards, and financial information.",

  testimonial: null
},

    {
  slug: "dental-healthcare-imaging-data-systems",

  portfolioLogo: CieosLogo,
  portfolioCardImage: CieosImg1,

  title: "Dental Healthcare Imaging and Data Systems",

  description:
    "A modern web-based dental healthcare imaging and patient management platform designed to transform a legacy Windows application into a scalable solution with an improved user experience, centralized patient management, advanced dental imaging, and AI-assisted clinical capabilities.",

  industry: "Dental Healthcare",

  projectType: "Healthcare Imaging & Patient Management Platform",

  role:
    "UI/UX Designer and Next.js Frontend Developer",

  overview:
    "The client was using an existing Windows-based dental healthcare application and wanted to modernize the system by transforming it into a web-based platform with an improved user experience and additional capabilities. SoftBild redesigned the complete application based on the client's requirements and developed the frontend using Next.js. The platform provides dental professionals with a centralized environment to manage patients, clinical information, dental images, X-rays, documents, videos, and audio while supporting advanced imaging and treatment visualization workflows.",

  challenge:
    "The existing Windows-based application needed to be modernized into a more accessible and user-friendly web-based solution. Dental professionals needed a centralized way to manage patient records, clinical information, images, X-rays, documents, videos, and audio. The application also required clinic and user management, role-based permissions, advanced dental image viewing and editing, treatment visualization, and support for modern imaging workflows. The platform needed to provide an intuitive experience while maintaining the functionality required by dental professionals.",

  solution:
    "SoftBild redesigned the complete application and developed a modern frontend using Next.js, working with a .NET backend and AI integration. The solution introduced a centralized patient profile, organized patient media and clinical information, clinic and user management, role-based access control, advanced dental imaging and editing capabilities, digital photography workflows, intraoral camera workflows, X-ray capture, document management, and AI-assisted functionality. The redesigned platform provided a more intuitive and organized experience while creating a scalable foundation for future healthcare and imaging features.",

  technologies: [
    "Next.js",
    "React.js",
    ".NET",
    "REST API",
    "AI Integration",
  ],

  features: [
    {
      title: "Patient Management",
      description:
        "Dental professionals can view, add, and manage patient records from a centralized patient management system.",
    },

    {
      title: "Centralized Patient Profile",
      description:
        "Patient profiles provide access to clinical information, images, X-rays, documents, videos, and audio from a single centralized location.",
    },

    {
      title: "Patient Media Management",
      description:
        "The platform supports importing and organizing patient photos, dental X-rays, documents, videos, and audio into categorized sections.",
    },

    {
      title: "Clinic Management",
      description:
        "Administrators can manage clinics and maintain clinic information through a centralized management interface.",
    },

    {
      title: "User & Role Management",
      description:
        "Administrators can add, edit, and delete users while managing roles, privileges, and permission-based access.",
    },

    {
      title: "Dental Imaging",
      description:
        "The platform provides advanced dental image viewing and editing capabilities for reviewing patient images and supporting clinical workflows.",
    },

    {
      title: "Treatment Visualization",
      description:
        "Doctors can visualize potential treatment outcomes and demonstrate how teeth and smiles could look after treatment.",
    },

    {
      title: "Digital Imaging Workflows",
      description:
        "The system supports digital photography, dental imaging, intraoral camera workflows, X-ray capture, and document management.",
    },

    {
      title: "AI-Assisted Clinical Features",
      description:
        "AI-powered functionality assists dental professionals in identifying potential dental and teeth-related problems and supports their clinical assessment process.",
    },
  ],

  integrations: [
    ".NET Backend",
    "REST APIs",
    "AI Integration",
    "Dental Imaging Devices",
    "Intraoral Camera Workflows",
    "X-Ray Capture",
  ],

  screenshots: [
    DentalImg1,
    DentalImg2,
    DentalImg3,
  ],

  results:
    "The project transformed a legacy Windows-based dental application into a modern web-based dental imaging and patient management platform. The redesigned solution improved usability, centralized patient and clinical information, organized imaging and media workflows, introduced role-based access management, and provided advanced dental visualization and AI-assisted capabilities. The platform also established a scalable foundation for future enhancements and integrations.",

  testimonial: {
    quote:
      "SoftBild transformed our legacy application into a modern and intuitive platform that makes managing patients, clinical information, and dental imaging much more organized and efficient.",

    name: "Client Name",

    designation: "Client / Organization",
  },
},

{
  slug: "sharefarm-digital-agriculture-marketplace",

  portfolioLogo: SharefarmLogo,
  portfolioCardImage: SharefarmImg1,

  title: "Sharefarm: Digital Agriculture Marketplace Platform",

  description:
    "A digital agriculture platform designed to connect the agriculture ecosystem through modern web and mobile technology, improving access, discovery, communication, and business opportunities.",

  industry: "Agriculture & AgriTech",

  projectType: "Web & Mobile Application Development",

  overview:
    "Sharefarm is a digital agriculture marketplace platform designed to connect different users and businesses within the agriculture ecosystem. The project focused on creating a modern and accessible digital experience across web and mobile platforms, helping users discover relevant agricultural information, services, products, and business opportunities. The platform was designed with a user-focused approach to make navigation, discovery, and interaction simple and accessible.",

  challenge:
    "The project required organizing a wide range of agricultural information, services, and user interactions into a clear and intuitive digital experience. Different types of users needed to access relevant information and opportunities without facing a complex or confusing interface. The platform also needed to provide a consistent experience across web and mobile devices while maintaining a scalable structure for future growth.",

  solution:
    "We designed and developed a modern web and mobile application experience with a clear information architecture, intuitive navigation, responsive interfaces, and scalable frontend components. The solution focused on organizing agricultural information and platform functionality into easy-to-understand sections, helping users discover relevant services, opportunities, and content. A consistent design approach was maintained across web and mobile experiences to provide a seamless user journey.",

  technologies: [
    "UI/UX Design",
    "Figma",
    "Web Application Development",
    "Mobile Application Development",
  ],

  features: [
    {
      title: "Digital Agriculture Marketplace",
      description:
        "A centralized digital platform designed to connect users, businesses, services, and opportunities within the agriculture ecosystem.",
    },
    {
      title: "User-Friendly Navigation",
      description:
        "Designed clear and intuitive navigation to help users easily explore different areas of the platform and discover relevant information.",
    },
    {
      title: "Responsive Web Experience",
      description:
        "Created responsive interfaces that provide a consistent and accessible experience across desktop, tablet, and mobile devices.",
    },
    {
      title: "Mobile Application Experience",
      description:
        "Designed the mobile application experience to help users access platform functionality and information conveniently from their mobile devices.",
    },
    {
      title: "Structured Information Architecture",
      description:
        "Organized platform content and functionality into clear sections to improve usability, discoverability, and the overall user experience.",
    },
    {
      title: "Scalable Platform Design",
      description:
        "Created a flexible and scalable design approach that could support additional features, services, and platform functionality as the ecosystem grows.",
    },
  ],

  integrations: [
    "Web Services",
    "Mobile Application Services",
    "Third-Party APIs",
  ],

  screenshots: [
    EleaningImg1,
    EleaningImg1,
    EleaningImg1,
  ],

  results:
    "The project delivered a modern digital agriculture platform designed to improve access, discovery, and interaction across the agriculture ecosystem. The web and mobile application experience provided users with a more organized and intuitive way to explore relevant information, services, and business opportunities while creating a scalable foundation for future platform growth.",

  testimonial: {
    quote:
      "The project focused on creating a modern and user-friendly digital experience that supports better access and engagement across the agriculture ecosystem.",
    name: "Sharefarm",
    designation: "Digital Agriculture Platform",
  },
},

{
  slug: "artinals-digital-asset-tokenization-platform",

  portfolioLogo: ArtinalsLogo,
  portfolioCardImage: ArtinalImg1,

  title: "Artinals: Digital Asset Tokenization Platform",

  description:
    "A Web3 platform designed to create, manage, launch, and trade tokenized digital and real-world assets through a modern no-code ecosystem.",

  industry: "Web3, Blockchain & Digital Assets",

  projectType: "Web Application Development",

  overview:
    "Artinals is a comprehensive Web3 platform designed to simplify the creation, management, and trading of tokenized digital assets and real-world assets. The platform is built around the ART20 protocol and provides a connected ecosystem for asset creation, token launches, secondary trading, portfolio management, and blockchain-based digital asset operations. The project includes a no-code management dashboard, launchpad functionality, decentralized trading capabilities, and digital wallet experiences designed to make complex Web3 workflows more accessible.",

  challenge:
    "The project involved presenting complex blockchain and tokenization workflows through an interface that could be understood and used efficiently by creators, businesses, and organizations. Users needed to manage asset supply, metadata, permissions, balances, transfers, and trading activities from a centralized environment. A major challenge was simplifying these advanced Web3 operations while maintaining clear navigation, structured workflows, real-time visibility, and a scalable user experience.",

  solution:
    "A modern and structured web application experience was designed to simplify the complete digital asset lifecycle. The platform enables users to create and manage ART20 assets, configure collections and metadata, launch tokenized assets, monitor ownership and transactions, manage permissions, and support secondary trading. The no-code dashboard organizes complex blockchain operations into intuitive workflows, while dedicated analytics, balance management, access control, batch operations, and transaction monitoring interfaces provide users with centralized control over their digital assets.",

  technologies: [
    "UI/UX Design",
    "Figma",
    "Web Application Development",
    "Web3",
    "Blockchain",
    "Sui Blockchain",
    "ART20 Protocol",
  ],

  features: [
    {
      title: "Digital Asset Creation",
      description:
        "Users can create and manage tokenized digital assets and collections through a structured and accessible platform experience.",
    },
    {
      title: "No-Code Dashboard",
      description:
        "A centralized dashboard simplifies complex blockchain operations and allows users to manage digital assets without requiring deep technical expertise.",
    },
    {
      title: "Asset Launchpad",
      description:
        "Users can configure token offerings, set pricing and currencies, and launch tokenized assets through a streamlined launch process.",
    },
    {
      title: "Decentralized Asset Trading",
      description:
        "The platform supports peer-to-peer trading and secondary market activity through on-chain trading mechanisms and order-book functionality.",
    },
    {
      title: "Project Analytics",
      description:
        "Real-time dashboards provide visibility into asset supply, metadata changes, transfers, ownership, and overall project activity.",
    },
    {
      title: "Balance Management",
      description:
        "Users can monitor token balances and manage asset-related operations through centralized and intuitive management interfaces.",
    },
    {
      title: "Access Control & Permissions",
      description:
        "The platform provides tools for managing permissions, deny lists, and access controls to support secure digital asset operations.",
    },
    {
      title: "Batch Operations",
      description:
        "Users can efficiently perform and monitor bulk operations, including transfers and metadata updates, through structured workflows.",
    },
    {
      title: "Metadata Management",
      description:
        "Collections and digital assets can be managed with dynamic metadata controls, updates, synchronization, and metadata freezing capabilities.",
    },
    {
      title: "Transaction Monitoring",
      description:
        "Centralized monitoring tools provide visibility into transfers, updates, user activities, and other important asset transactions.",
    },
    {
      title: "Digital Asset Wallet",
      description:
        "The Artinals ecosystem includes a wallet experience designed to help users manage digital assets, track portfolios, and perform transactions.",
    },
  ],

  integrations: [
    "Sui Blockchain",
    "ART20 Protocol",
    "Blockchain Smart Contracts",
    "Web3 Wallet Services",
    "Decentralized Exchange Infrastructure",
    "Third-Party APIs",
  ],

  screenshots: [
    EleaningImg1,
    EleaningImg1,
    EleaningImg1,
  ],

  results:
    "The project delivered a modern Web3 platform that organizes complex digital asset and tokenization workflows into a more accessible and structured user experience. The solution provides a scalable foundation for creating, managing, launching, monitoring, and trading tokenized assets while helping bridge the gap between advanced blockchain technology and user-friendly digital product experiences.",

  testimonial: {
    quote:
      "The platform was designed to make complex Web3 and digital asset management workflows more accessible through a modern, structured, and user-friendly experience.",
    name: "Artinals",
    designation: "Web3 Digital Asset Platform",
  },
},


  ];

  // Find the portfolio based on the URL slug
  const portfolio = portfolioData.find(
    (item) => item.slug === slug
  );

  // If portfolio doesn't exist
  if (!portfolio) {
    return (
      <>
        <Helmet>
          <title>Portfolio Not Found | SoftBild</title>
          <meta
            name="description"
            content="The requested SoftBild portfolio project could not be found."
          />
        </Helmet>

        <section className="container-fluid py-100">
          <div className="container text-center">
            <h1 className="dark-subtitle">
              Portfolio Not Found
            </h1>

            <p className="mt-20">
              The portfolio project you are looking for does not exist.
            </p>

            <Link
              to="/Portfolio"
              className="sf-btn5 mt-20"
            >
              Back to Portfolio
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {portfolio.title} | SoftBild Portfolio
        </title>

        <meta
          name="description"
          content={portfolio.description}
        />

        <meta
          name="keywords"
          content={`${portfolio.title}, SoftBild portfolio, ${portfolio.industry}, software development`}
        />

        <meta
          name="author"
          content="SoftBild"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <meta
          property="og:title"
          content={`${portfolio.title} | SoftBild`}
        />

        <meta
          property="og:description"
          content={portfolio.description}
        />

        <meta
          property="og:image"
          content={portfolio.portfolioCardImage}
        />

        <meta
          property="og:type"
          content="article"
        />
      </Helmet>

{/* =====================================================
    BREADCRUMB
====================================================== */}

<section className="container-fluid portfolio-detail-breadcrumb-section">
  <div className="container">

    <div className="portfolio-breadcrumb">

      <Link to="/">
        Home
      </Link>

      <span>/</span>

      <Link to="/Portfolio">
        Portfolio
      </Link>

      <span>/</span>

      <span className="portfolio-breadcrumb-current">
        {portfolio.title}
      </span>

    </div>

  </div>
</section>


{/* =====================================================
    HERO SECTION
====================================================== */}

<section className="container-fluid portfolio-detail-hero-section">
  <div className="container">

    <div className="row align-items-center portfolio-detail-hero-row">

      {/* LEFT CONTENT */}
      <div className="col-lg-6">

        <div className="portfolio-detail-hero-content">

          {/* Logo */}
          <div className="portfolio-detail-logo">
            <img
              src={portfolio.portfolioLogo}
              alt={portfolio.title}
              className="img-fluid"
            />
          </div>

          {/* Title */}
          <h1 className="portfolio-detail-title">
            {portfolio.title}
          </h1>

          {/* Description */}
          <p className="portfolio-detail-description">
            {portfolio.description}
          </p>

          {/* Project Information */}
          <div className="portfolio-detail-meta">

            <div className="portfolio-detail-meta-item">
              <span>Industry</span>
              <strong>{portfolio.industry}</strong>
            </div>

            <div className="portfolio-detail-meta-item">
              <span>Project Type</span>
              <strong>{portfolio.projectType}</strong>
            </div>

          </div>

        </div>

      </div>


      {/* RIGHT IMAGE */}
      <div className="col-lg-6">

        <div className="portfolio-detail-hero-image">

          <img
            src={portfolio.portfolioCardImage}
            alt={portfolio.title}
            className="img-fluid"
          />

        </div>

      </div>

    </div>

  </div>
</section>

      {/* =====================================================
          TECHNOLOGY
      ====================================================== */}

      <section className="container-fluid py-60 bg-blue2">
        <div className="container">

          <div className="row">

            <div className="col-lg-4">
              <h2 className="dark-subtitle">
                Technology
              </h2>
            </div>

            <div className="col-lg-8">

              <div className="d-flex flex-wrap gap-3">

                {portfolio.technologies.map(
                  (technology, index) => (
                    <div
                      key={index}
                      className="portfolio-tech-item"
                    >
                      {technology}
                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          PROJECT OVERVIEW
      ====================================================== */}

      <section className="container-fluid py-60">
        <div className="container">

          <div className="row">

            <div className="col-lg-4">
              <h2 className="dark-subtitle">
                Project Overview
              </h2>
            </div>

            <div className="col-lg-8">

              <p>
                {portfolio.overview}
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          CHALLENGE
      ====================================================== */}

      <section className="container-fluid py-60 bg-blue2">
        <div className="container">

          <div className="row">

            <div className="col-lg-4">
              <h2 className="dark-subtitle">
                The Challenge
              </h2>
            </div>

            <div className="col-lg-8">

              <p>
                {portfolio.challenge}
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          SOLUTION
      ====================================================== */}

      <section className="container-fluid py-60">
        <div className="container">

          <div className="row">

            <div className="col-lg-4">
              <h2 className="dark-subtitle">
                Our Solution
              </h2>
            </div>

            <div className="col-lg-8">

              <p>
                {portfolio.solution}
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}

      <section className="container-fluid py-60 bg-blue2">
        <div className="container">

          <div className="row mb-50">

            <div className="col-lg-8">
              <h2 className="dark-subtitle">
                Key Features
              </h2>

              <p className="mt-20">
                The platform was designed with powerful
                features to provide an efficient and
                engaging digital experience.
              </p>
            </div>

          </div>

          <div className="row">

            {portfolio.features.map(
              (feature, index) => (
                <div
                  className="col-lg-4 col-md-6 mb-30"
                  key={index}
                >

                  <div className="portfolio-feature-card h-100">

                    <div className="portfolio-feature-number">
                      0{index + 1}
                    </div>

                    <h3 className="dark-title2">
                      {feature.title}
                    </h3>

                    <p>
                      {feature.description}
                    </p>

                  </div>

                </div>
              )
            )}

          </div>

        </div>
      </section>

      {/* =====================================================
          INTEGRATIONS
      ====================================================== */}

      {portfolio.integrations &&
        portfolio.integrations.length > 0 && (
          <section className="container-fluid py-60">
            <div className="container">

              <div className="row">

                <div className="col-lg-4">
                  <h2 className="dark-subtitle">
                    Integrations
                  </h2>
                </div>

                <div className="col-lg-8">

                  <div className="row">

                    {portfolio.integrations.map(
                      (integration, index) => (
                        <div
                          className="col-md-6 mb-20"
                          key={index}
                        >
                          <div className="portfolio-integration-item">
                            {integration}
                          </div>
                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>

            </div>
          </section>
        )}

      {/* =====================================================
          PROJECT SCREENSHOTS
      ====================================================== */}

     {/* {portfolio.screenshots &&
        portfolio.screenshots.length > 0 && (
          <section className="container-fluid py-60 bg-blue2 pt-0">
            <div className="container">

              <div className="row mb-50">

                <div className="col-lg-8">
                  <h2 className="dark-subtitle">
                    Project Screenshots
                  </h2>

                  <p className="mt-20">
                    Explore some of the key screens
                    and experiences developed for
                    this project.
                  </p>
                </div>

              </div>

              <div className="row">

                {portfolio.screenshots.map(
                  (image, index) => (
                    <div
                      className="col-lg-6 mb-30"
                      key={index}
                    >

                      <div className="portfolio-screenshot">
                        <img
                          src={image}
                          alt={`${portfolio.title} screenshot ${index + 1}`}
                          className="img-fluid w-100"
                        />
                      </div>

                    </div>
                  )
                )}

              </div>

            </div>
          </section>
        )} */}

      {/* =====================================================
          RESULTS
      ====================================================== */}

      {portfolio.results && (
        <section className="container-fluid py-60">
          <div className="container">

            <div className="row">

              <div className="col-lg-4">
                <h2 className="dark-subtitle">
                  Results & Outcomes
                </h2>
              </div>

              <div className="col-lg-8">

                <p>
                  {portfolio.results}
                </p>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* =====================================================
          TESTIMONIAL
      ====================================================== */}

      {portfolio.testimonial && (
        <section className="container-fluid py-60 bg-blue2">
          <div className="container">

            <div className="row justify-content-center">

              <div className="col-lg-8 text-center">

                <h2 className="dark-subtitle">
                  Client Testimonial
                </h2>

                <p className="portfolio-testimonial-quote mt-30">
                  “{portfolio.testimonial.quote}”
                </p>

                <h4 className="mt-30">
                  {portfolio.testimonial.name}
                </h4>

                <p className="mb-0">
                  {portfolio.testimonial.designation}
                </p>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* =====================================================
          BACK TO PORTFOLIO
      ====================================================== */}

      <section className="container-fluid py-60">
        <div className="container text-center">

          <Link
            to="/Portfolio"
            className="sf-btn5"
          >
            Back to Portfolio
            <EastIcon
              style={{
                fontSize: "18px",
                marginLeft: "8px",
              }}
            />
          </Link>

        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="container-fluid py-100 bg-img-overlay1 color-overlay1">
        <div className="container">

          <div className="row">

            <div className="col-lg-3"></div>

            <div className="col-lg-6 text-center color-overlay1-content">

              <h2 className="light-subtitle">
                We provide best tech solutions for your{" "}
                <span>business</span>
              </h2>

              <Link
                to="/Services"
                className="sf-btn5 mt-20"
              >
                Enquire
              </Link>

            </div>

            <div className="col-lg-3"></div>

          </div>

        </div>
      </section>

      <HomeCta />
    </>
  );
}

export default PortfolioDetail;