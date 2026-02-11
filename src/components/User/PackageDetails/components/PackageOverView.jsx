import React from "react";
import "../PackageDetails.scss"

const PackageOverview = ({ pkg }) => {
  return (
    <section className="pkg-box">
      <h2>Overview</h2>
      <p>{pkg.description}</p>

      <div className="overview-grid">
        <div><b>Category:</b>{pkg.category?.name}</div>
        <div><b>Location:</b>{pkg.location}</div>
        <div><b>Duration:</b>{pkg.days}D / {pkg.night}N</div>
      </div>
    </section>
  );
};

export default PackageOverview;
