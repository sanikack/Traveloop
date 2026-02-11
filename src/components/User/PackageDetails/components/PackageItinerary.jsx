import React from "react";
import "../PackageDetails.scss"

const PackageItinerary = ({ itinerary = [] }) => {
  if(!itinerary.length) return null;

  return (
    <section className="itinerary-box">
      <h2>Itinerary</h2>

      {itinerary.map((day, i) => (
        <div className="itinerary-day" key={i}>
          <span className="day">Day {day.day}</span>
          <h4>{day.title}</h4>
          <p>{day.description}</p>
        </div>
      ))}
    </section>
  );
};

export default PackageItinerary;
