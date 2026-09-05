import React from 'react';
import magentoIcon from '../../assets/icons/technology-icon/tech-magento2.jpg';
import salesforceIcon from '../../assets/icons/technology-icon/tech-salesforce.png';
import shopifyIcon from '../../assets/icons/technology-icon/tech-shopify.jpg';
import laravelIcon from '../../assets/icons/technology-icon/tech-laravel.jpg';
import dotnetIcon from '../../assets/icons/technology-icon/tech-dotnet.png';
import woocommerceIcon from '../../assets/icons/technology-icon/tech-woocommerce.jpg';
import reactIcon from '../../assets/icons/technology-icon/tech-react.png';
import nodeIcon from '../../assets/icons/technology-icon/tech-node.png';
import angularIcon from '../../assets/icons/technology-icon/tech-angular.png';
import dudaIcon from '../../assets/icons/technology-icon/tech-duda.png';
import pythonIcon from '../../assets/icons/technology-icon/python-icon.png';

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