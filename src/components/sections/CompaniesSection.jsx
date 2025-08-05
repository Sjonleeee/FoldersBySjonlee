import React from "react";
import "../../styles/onepager.css";

const companies = [
  { name: "NBC", logo: null },
  { name: "ESPN", logo: null },
  { name: "WSJ", logo: null },
  { name: "Microsoft", logo: null },
  { name: "NBC", logo: null },
  { name: "iHeart RADIO", logo: null },
  { name: "Bloomberg", logo: null },
  { name: "NBC", logo: null },
];

export default function CompaniesSection() {
  return (
    <section className="companies-section">
      <div className="companies-container">
        <h2 className="companies-title">Companies I've Worked With</h2>
        <div className="companies-grid">
          {companies.map((company, idx) => (
            <div className="company-item" key={idx}>
              {/* Hier kun je later een logo-image toevoegen als je die hebt */}
              <span className="company-logo">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}