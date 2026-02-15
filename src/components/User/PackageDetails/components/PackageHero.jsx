import React from "react";
import "../PackageDetails.scss"

const PackageHero = ({ pkg }) => {
  return (
    <section
      className="package-hero"
      style={{
        backgroundImage: `url(${process.env.REACT_APP_API_URL}/uploads/${pkg.image})`
      }}
    >
      <div className="overlay">
        <div className="hero-content">
          <span className="badge">{pkg.category?.name}</span>
          <h1>{pkg.title}</h1>
          <p className="location">📍 {pkg.location}</p>
        </div>
      </div>
    </section>
  );
};

export default PackageHero;
