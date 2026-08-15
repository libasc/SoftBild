import React from 'react';
import zafarImg from "../../assets/images/placeholder-men.jpg";
import sukhImg from "../../assets/images/placeholder-women.jpg";

function TeamsCard1() {
  const teamsContent = [
    {
      teamImage: zafarImg,
      teamName: "Zafar Ali",
      teamProfile: "Founder/CEO",
    },
    {
      teamImage: sukhImg,
      teamName: "Sukhmani Kaur",
      teamProfile: "Vice President",
    },
    {
      teamImage: zafarImg,
      teamName: "Anish Chaurasiya",
      teamProfile: "Director of Operation",
    },
    {
      teamImage: zafarImg,
      teamName: "Sameer Baspore",
      teamProfile: "Director of Sales",
    },
  ];

  return (
    <>
      {teamsContent.map((team, index) => (
        <div className="col-lg-3 col-md-6" key={index}>
          <div className="sb-teams-card1">
            <div className="sb-teams-card-content">
              <div className="team-card-image">
                <img
                  src={team.teamImage}
                  alt={`Profile of ${team.teamName}`}
                  className="img-fluid"
                />
              </div>
              <div className="teams-info-content-section">
                <div className="dark-title2 text-center">{team.teamName}</div>
                <div className="dark-title2 text-center">{team.teamProfile}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default TeamsCard1;
