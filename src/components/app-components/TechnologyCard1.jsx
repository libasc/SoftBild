"use client";
const magentoIcon = '/assets/icons/technology-icon/tech-magento2.jpg';
const salesforceIcon = '/assets/icons/technology-icon/tech-salesforce.png';
const shopifyIcon = '/assets/icons/technology-icon/tech-shopify.jpg';
const laravelIcon = '/assets/icons/technology-icon/tech-laravel.jpg';
const dotnetIcon = '/assets/icons/technology-icon/tech-dotnet.png';
const woocommerceIcon = '/assets/icons/technology-icon/tech-woocommerce.jpg';
const reactIcon = '/assets/icons/technology-icon/tech-react.png';
const nodeIcon = '/assets/icons/technology-icon/tech-node.png';
const angularIcon = '/assets/icons/technology-icon/tech-angular.png';
const dudaIcon = '/assets/icons/technology-icon/tech-duda.png';
const pythonIcon = '/assets/icons/technology-icon/python-icon.png';

function TechnologyCard1() {

    const technologyInfo = [
        {
            techIcon: reactIcon,
            techName: "React JS"
        },
        {
            techIcon: angularIcon,
            techName: "Angular"
        },
        {
            techIcon: nodeIcon,
            techName: "Node JS"
        },
        {
            techIcon: dotnetIcon,
            techName: ".Net Core"
        },
        {
            techIcon: pythonIcon,
            techName: "Python"
        },
        {
            techIcon: laravelIcon,
            techName: "Laravel"
        },
        {
            techIcon: salesforceIcon,
            techName: "Salesforce"
        },
        {
            techIcon: shopifyIcon,
            techName: "Shopify"
        },
        {
            techIcon: magentoIcon,
            techName: "Magento 2"
        },
        {
            techIcon: woocommerceIcon,
            techName: "Woocommerce"
        },
        {
            techIcon: dudaIcon,
            techName: "Duda"
        }
        
    ]


    // Generating cards dynamically
    const cardsElement = technologyInfo.map((technology, index) => (
        <div className="tech-card1" key={index}>
            <div className="tech-logo"><img src={technology.techIcon} alt=""/></div>
            <div className="tech-name">{technology.techName}</div>
        </div>
    ));

    return <>{cardsElement}</>;
}

export default TechnologyCard1