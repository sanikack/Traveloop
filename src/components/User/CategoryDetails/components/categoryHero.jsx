import React from "react";
import "../CategoryDetails.scss"


const CategoryHero = ({ category }) => {
  return (
    <section
      className="category-hero"
      style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/uploads/${category.image})` }}
    >
      <div className="overlay" />
      <div className="hero-content">
        <span className="tag">Category</span>
        <h1>{category.name}</h1>
        <p>{category.shortdescription}</p>
      </div>
    </section>
  );
};

export default CategoryHero;
