import React from "react";
import "../CategoryDetails.scss"

const CategoryWhy = ({specialities}) => {
  if(!specialities?.length) return null
  return (
    <section className="why-category">
      <h2>Why Choose This Category?</h2>

      <div className="reasons">
        {specialities.map((item,index)=>(
          <div key={index} className="reason-cards">
            <h4>✨ {item}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryWhy;
