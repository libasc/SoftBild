import React from "react";
import workOrgIcon from '../../assets/icons/work-organisation.svg';
import expTeamIcon from '../../assets/icons/exp-team.svg';
import tailotMadeStratigiesIcon from '../../assets/icons/tailor-made-trategies.svg';
import qualityAssuranceIcon from '../../assets/icons/quality-assurance.svg';

function HomeCard1() {
  const cardsContent = [
    {
      icon: workOrgIcon,
      title: "Work Organisation",
      description:
        "Promptly solve urgent work issues! Create personal and group chats that allow for exchanging messages not only during conferences but also outside.",
    },
    {
      icon: expTeamIcon,
      title: "Experienced Team",
      description:
        "We have professionals with experience on our team. Each project benefits from their expertise and enthusiasm.",
    },
    {
      icon: tailotMadeStratigiesIcon,
      title: "Tailor-made Strategies",
      description:
        "We do not believe in one-size-fits-all. Our solutions are customized to your business needs. We do not believe in one-size-fits-all.",
    },
    {
      icon: qualityAssuranceIcon,
      title: "Quality Assurance",
      description:
        "Promptly solve urgent work issues! Create personal and group chats that allow for exchanging messages not only during conferences but also outside.",
    },
  ];

  return (
    <>
      {cardsContent.map((card, index) => (
        <div key={index} className="col-xl-3 col-lg-3 col-md-6 sb-card1-wrapper">
          <div className="sb-card1">
            <div className="sb-card1-icon mb-15">
              <img src={card.icon} alt={card.title} />
            </div>
            <h3 className="dark-title2">{card.title}</h3>
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default HomeCard1;
