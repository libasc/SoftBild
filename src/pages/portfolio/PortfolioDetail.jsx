import React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import EastIcon from "@mui/icons-material/East";

import ServiceUiuxIcon from "../../assets/icons/service-uiux.svg";
import ServiceWebAppDevelop from "../../assets/icons/service-webapplication.svg";
import EleaningImg1 from "../../assets/images/portfolio-image/elearning-01.png";

import DentalImg1 from "../../assets/images/portfolio-image/elearning-01.png";
import DentalImg2 from "../../assets/images/portfolio-image/elearning-01.png";
import DentalImg3 from "../../assets/images/portfolio-image/elearning-01.png";


import HomeCta from "../../components/app-components/HomeCta";


function PortfolioDetail() {
  const { slug } = useParams();


   
  const portfolioData = [
   {
  slug: "e-learning-platform",

  portfolioLogo: ServiceUiuxIcon,
  portfolioCardImage: EleaningImg1,

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

  portfolioLogo: ServiceUiuxIcon,
  portfolioCardImage: DentalImg1,

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

      <section className="container-fluid py-80 bg-blue2">
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

      <section className="container-fluid py-80">
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

      <section className="container-fluid py-80 bg-blue2">
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

      <section className="container-fluid py-80">
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

      <section className="container-fluid py-80 bg-blue2">
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
          <section className="container-fluid py-80">
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

      {portfolio.screenshots &&
        portfolio.screenshots.length > 0 && (
          <section className="container-fluid py-80 bg-blue2">
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
        )}

      {/* =====================================================
          RESULTS
      ====================================================== */}

      {portfolio.results && (
        <section className="container-fluid py-80">
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
        <section className="container-fluid py-80 bg-blue2">
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