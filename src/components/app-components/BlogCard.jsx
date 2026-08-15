import readMoreIcon from "../../assets/icons/arrow-right-blue.svg";
import blogImg1 from "../../assets/images/blog-images/blog-img1.png";
import blogImg2 from "../../assets/images/blog-images/blog-img2.png";
// import blogImg3 from "../../assets/images/blog-images/blog-img3.png";
import blogImg4 from "../../assets/images/blog-images/blog-img4.png";

function BlogCard() {
  const servicesContent = [
    {
      blogImage: blogImg1,
      blogTitle: "How to Choose the Right Software Development Company",
      BlogDescription:
        "Choosing the right software development company is key to project success. Look for expertise, industry experience, a strong portfolio, and positive client reviews. Assess their communication, project management, and ability to meet deadlines. A reliable partner will collaborate closely, ensuring the final product meets your goals and exceeds expectations.",
      blogReadMoreIcon: readMoreIcon,
    },
    {
      blogImage: blogImg2,
      blogTitle: "WHY BUILD YOUR OWN CRM SOFTWARE",
      BlogDescription:
        "CRM software effectively helps manage customer relationships by centralizing data and streamlining business operations. It significantly improves sales efforts and ensures optimal customer experiences. With numerous open-source CRM options available, businesses face the challenge of choosing between simple, basic solutions or complex, feature-rich platforms, or opting for a custom CRM solution.",
      blogReadMoreIcon: readMoreIcon,
    },
    {
      blogImage: blogImg4,
      blogTitle: "Top 3 Essential Oracle ERP Modules You Need",
      BlogDescription:
        "Oracle ERP is a comprehensive cloud-based software solution designed to streamline and automate back-office operations and everyday business functions. This suite of business management tools encompasses key areas such as financial management, supply chain management, project management, accounting, and procurement, helping organizations improve efficiency and drive growth.",
      blogReadMoreIcon: readMoreIcon,
    },
  ];

  const cardsElement = servicesContent.map((blog, index) => (
    <div className="col-xl-4 col-lg-4 col-md-6 d-flex" key={index}>
      <div className="sb-blog-card1">
        <div className="sb-blog-card1-content">
          <div className="sb-blog-card1-inner-content">
            <div className="blog-card-image">
              <img src={blog.blogImage} alt="Blog Image" />
            </div>
            <div className="blog-date-time">
              <p>
                {/* January 02, 2025 <span style={{ marginLeft: "15px" }}></span> */}
                2 min read
              </p>
            </div>
            <h3 className="dark-title2">{blog.blogTitle}</h3>
            <p>{blog.BlogDescription}</p>
          </div>
          {/* <div className="blog-read-more-btnwrapper justify-content-end">
            <div className="blog-btn-text-read-more text-gradient1">Read More</div>
            <div className="blog-btn-icon-read-more">
              <img src={blog.blogReadMoreIcon} alt="Read More Icon" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  ));

  return <>{cardsElement}</>;
}

export default BlogCard;
