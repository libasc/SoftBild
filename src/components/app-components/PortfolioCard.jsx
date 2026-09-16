"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import EastIcon from "@mui/icons-material/East";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LaunchIcon from '@mui/icons-material/Launch';


const SharefarmLogo = "/assets/images/sharefarm-logo.png";
const SharefarmImg1 = "/assets/images/softbild-sharefarm.png";

const CieosLogo = "/assets/images/cieos-logo.png";
const CieosImg1 = "/assets/images/softbild-cieos.png";

const ArtinalsLogo = "/assets/images/artinals-logo.png";
const ArtinalImg1 = "/assets/images/softbild-artinal.png";

const MasterStudyLogo = "/assets/images/master-study-logo.png";
const MasterStudyImg1 = "/assets/images/softbild-masterstudy.png";

function PortfolioCard({ limit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const [categorySearch, setCategorySearch] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categoryDropdownRef = useRef(null);

  /*
   * =========================================================
   * PORTFOLIO DATA
   * =========================================================
   *
   * Add new projects here.
   *
   * Every project should have a category.
   *
   * The category dropdown is generated automatically from
   * these values.
   */
  const portfolioCardContent = [
    {
      id: 1,
      slug: "e-learning-platform",
      category: "Education",

      portfolioLogo: MasterStudyLogo,
      portfolioCardImage: MasterStudyImg1,

      portfolioTitle:
        "SoftBild Engineering: E-learning Platform",

      postfolioDescription:
        "Crafting visually appealing and user-friendly interfaces that enhance engagement and deliver seamless experiences across all platforms.",

      serviceReadMoreIcon: EastIcon,
    },

    {
      id: 2,
      slug: "dental-healthcare-imaging-data-systems",
      category: "Healthcare",

      portfolioLogo: CieosLogo,
      portfolioCardImage: CieosImg1,

      portfolioTitle:
        "Dental Healthcare Imaging and Data Systems",

      postfolioDescription:
        "A modern dental healthcare imaging and patient management platform designed to modernize a legacy Windows-based application.",

      serviceReadMoreIcon: EastIcon,
    },

    {
      id: 3,
      slug: "sharefarm-digital-agriculture-marketplace",
      category: "Agriculture",

      portfolioLogo: SharefarmLogo,
      portfolioCardImage: SharefarmImg1,

      portfolioTitle:
        "Sharefarm: Digital Agriculture Marketplace Platform",

      postfolioDescription:
        "Digital platform designed to connect the agriculture ecosystem through modern technology, improving access, discovery...",

      serviceReadMoreIcon: EastIcon,
    },

    {
      id: 4,
      slug: "artinals-digital-asset-tokenization-platform",
      category: "Web3 & Blockchain",

      portfolioLogo: ArtinalsLogo,
      portfolioCardImage: ArtinalImg1,

      portfolioTitle:
        "Artinals: Digital Asset Tokenization Platform",

      postfolioDescription:
        "A Web3 platform for creating, managing, launching, and trading tokenized digital and real-world assets.",

      serviceReadMoreIcon: EastIcon,
    },
  ];

  /*
   * =========================================================
   * DYNAMIC CATEGORY LIST
   * =========================================================
   */
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        portfolioCardContent
          .map((portfolio) => portfolio.category)
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));

    return ["All Categories", ...uniqueCategories];
  }, []);

  /*
   * =========================================================
   * SEARCHABLE CATEGORY OPTIONS
   * =========================================================
   */
  const filteredCategories = useMemo(() => {
    const search = categorySearch.trim().toLowerCase();

    if (!search) {
      return categories;
    }

    return categories.filter((category) =>
      category.toLowerCase().includes(search)
    );
  }, [categories, categorySearch]);

  /*
   * =========================================================
   * PORTFOLIO SEARCH
   * =========================================================
   *
   * Searches across:
   *
   * - title
   * - description
   * - category
   * - slug
   */
  const filteredPortfolio = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return portfolioCardContent.filter((portfolio) => {
      const searchableText = [
        portfolio.portfolioTitle,
        portfolio.postfolioDescription,
        portfolio.category,
        portfolio.slug,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !search || searchableText.includes(search);

      const matchesCategory =
        selectedCategory === "All Categories" ||
        portfolio.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  /*
   * =========================================================
   * LIVE SEARCH SUGGESTIONS
   * =========================================================
   *
   * Shows matching projects while the user types.
   */
  const searchSuggestions = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return portfolioCardContent
      .filter((portfolio) => {
        const searchableText = [
          portfolio.portfolioTitle,
          portfolio.postfolioDescription,
          portfolio.category,
          portfolio.slug,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(search);
      })
      .slice(0, 6);
  }, [searchTerm]);

  /*
   * =========================================================
   * DISPLAYED PROJECTS
   * =========================================================
   */
  const displayedPortfolio = limit
    ? filteredPortfolio.slice(0, limit)
    : filteredPortfolio;

  /*
   * =========================================================
   * CLOSE CATEGORY DROPDOWN WHEN CLICKING OUTSIDE
   * =========================================================
   */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /*
   * =========================================================
   * CATEGORY SELECTION
   * =========================================================
   */
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategorySearch("");
    setIsCategoryOpen(false);
  };

  /*
   * =========================================================
   * CLEAR FILTERS
   * =========================================================
   */
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setCategorySearch("");
    setIsCategoryOpen(false);
  };

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCategory !== "All Categories";

  return (
    <>
      {/* =====================================================
          PORTFOLIO FILTER AREA
      ====================================================== */}

      <div className="col-12">
        <div className="sb-portfolio-filter-wrapper">

          {/* =================================================
              PROJECT SEARCH
          ================================================== */}

          <div className="sb-portfolio-search-wrapper">

            <SearchIcon className="sb-portfolio-search-icon" />

            <input
              type="search"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search projects, industries, technologies..."
              className="sb-portfolio-search-input"
              aria-label="Search portfolio"
            />

            {searchTerm && (
              <button
                type="button"
                className="sb-portfolio-search-clear"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

            {/* =============================================
                SEARCH SUGGESTIONS
            ============================================== */}

            {searchTerm.trim() && (
              <div className="sb-portfolio-search-suggestions">

                {searchSuggestions.length > 0 ? (
                  <>
                    <div className="sb-portfolio-suggestion-heading">
                      Matching Projects
                    </div>

                    {searchSuggestions.map((portfolio) => (
                      <Link
                        key={portfolio.id}
                        href={`/portfolio/${portfolio.slug}`}
                        className="sb-portfolio-search-suggestion"
                      >
                        <div className="sb-portfolio-suggestion-icon">
                          <SearchIcon />
                        </div>

                        <div className="sb-portfolio-suggestion-content">
                          <strong>
                            {portfolio.portfolioTitle}
                          </strong>

                          <span>
                            {portfolio.category}
                          </span>
                        </div>

                        <span className="sb-portfolio-suggestion-arrow">
                          <LaunchIcon />
                        </span>
                      </Link>
                    ))}

                    {searchSuggestions.length > 0 && (
                      <div className="sb-portfolio-suggestion-footer">
                        {filteredPortfolio.length}{" "}
                        {filteredPortfolio.length === 1
                          ? "project"
                          : "projects"}{" "}
                        found
                      </div>
                    )}
                  </>
                ) : (
                  <div className="sb-portfolio-no-suggestions">
                    <SearchIcon />

                    <span>
                      No matching projects found
                    </span>

                    <small>
                      Try another project, technology,
                      industry or category.
                    </small>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* =================================================
              SEARCHABLE CATEGORY DROPDOWN
          ================================================== */}

          <div
            className="sb-portfolio-category-wrapper"
            ref={categoryDropdownRef}
          >

            <button
              type="button"
              className={`sb-portfolio-category-trigger ${
                isCategoryOpen ? "is-open" : ""
              }`}
              onClick={() =>
                setIsCategoryOpen((current) => !current)
              }
              aria-expanded={isCategoryOpen}
            >
              <span>
                {selectedCategory}
              </span>

              <KeyboardArrowDownIcon
                className="sb-portfolio-category-arrow"
              />
            </button>

            {isCategoryOpen && (
              <div className="sb-portfolio-category-menu">

                {/* Category Search */}
                <div className="sb-portfolio-category-search">

                  <SearchIcon />

                  <input
                    type="text"
                    value={categorySearch}
                    onChange={(e) =>
                      setCategorySearch(e.target.value)
                    }
                    placeholder="Search categories..."
                    autoFocus
                    aria-label="Search categories"
                  />

                  {categorySearch && (
                    <button
                      type="button"
                      onClick={() => setCategorySearch("")}
                      aria-label="Clear category search"
                    >
                      ×
                    </button>
                  )}

                </div>

                {/* Category Options */}
                <div className="sb-portfolio-category-options">

                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <button
                        type="button"
                        key={category}
                        className={`sb-portfolio-category-option ${
                          selectedCategory === category
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          handleCategorySelect(category)
                        }
                      >
                        <span>
                          {category}
                        </span>

                        {selectedCategory === category && (
                          <span className="sb-portfolio-category-check">
                            ✓
                          </span>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="sb-portfolio-category-empty">
                      No categories found
                    </div>
                  )}

                </div>

              </div>
            )}

          </div>

        </div>

        {/* =================================================
            FILTER RESULT BAR
        ================================================== */}

        <div className="sb-portfolio-filter-info">

          <p>
            {filteredPortfolio.length === 1
              ? "1 project found"
              : `${filteredPortfolio.length} projects found`}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              className="sb-portfolio-clear-filter"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}

        </div>
      </div>


      {/* =====================================================
          PORTFOLIO CARDS
      ====================================================== */}

      {displayedPortfolio.length > 0 ? (

        displayedPortfolio.map((portfolio) => (

          <div
            className="col-xl-4 col-lg-4 col-md-6 d-flex"
            key={portfolio.id}
          >

            <Link
              href={`/portfolio/${portfolio.slug}`}
              className="text-decoration-none w-100"
            >

              <div className="sb-portfolio-card1">

                <div className="sb-portfolio-card1-content">

                  <div className="sb-portfolio-card1-inner-content">

                    {/* Portfolio Logo */}
                    <div className="portfolio-logo">

                      <img
                        src={portfolio.portfolioLogo}
                        alt={`${portfolio.portfolioTitle} logo`}
                      />

                    </div>


                    {/* Portfolio Image */}
                    <div className="portfolio-card-image">

                      <img
                        src={portfolio.portfolioCardImage}
                        className="img-fluid"
                        alt={portfolio.portfolioTitle}
                      />

                    </div>


                    {/* Portfolio Title */}
                    <h3 className="dark-title2">
                      {portfolio.portfolioTitle}
                    </h3>


                    {/* Portfolio Description */}
                    <p>
                      {portfolio.postfolioDescription}
                    </p>

                  </div>


                  {/* Read More */}
                  <div className="portfolio-read-more-btnwrapper">

                    <div className="portfolio-text-read-more">
                      Read More
                    </div>

                    <div className="portfolio-icon-read-more">
                      <portfolio.serviceReadMoreIcon />
                    </div>

                  </div>

                </div>

              </div>

            </Link>

          </div>

        ))

      ) : (

        /* =================================================
           NO RESULTS
        ================================================== */

        <div className="col-12">

          <div className="sb-portfolio-no-results">

            <div className="sb-portfolio-no-results-icon">
              <SearchIcon />
            </div>

            <h3>
              No portfolio projects found
            </h3>

            <p>
              Try another search term or select a
              different category.
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                className="sf-btn5"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}

          </div>

        </div>

      )}

    </>
  );
}

export default PortfolioCard;