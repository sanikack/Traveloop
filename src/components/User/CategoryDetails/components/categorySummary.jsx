import React from "react";
import "../CategoryDetails.scss"

const CategorySummary = ({ category }) => {
  return (
    <section className="category-summary">
      <p className="description">{category.shortdescription}</p>

      <div className="highlights">
        <div className="highlight-card">
          <span>Best Season</span>
          <strong>{category.bestSeason}</strong>
        </div>

        <div className="highlight-card">
          <span>Ideal For</span>
          <strong>{category.idealFor}</strong>
        </div>

        <div className="highlight-card">
          <span>Trip Style</span>
          <strong>{category.tripStyle}</strong>
        </div>
          </div>
        
    </section>
  );
};

export default CategorySummary;
