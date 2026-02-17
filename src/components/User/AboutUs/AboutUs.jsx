import React from "react";
import "./AboutUs.scss";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <h1>About TraveLoop</h1>
        <p>Explore Kerala with trusted local travel experts</p>
      </section>

      {/* WHO WE ARE */}
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          TraveLoop is a Kerala-based travel platform focused on delivering
          authentic, comfortable, and affordable travel experiences.
          We connect travelers with the best destinations, packages,
          and local experiences across Kerala.
        </p>
      </section>

      {/* MISSION */}
      <section className="about-section alt">
        <h2>Our Mission</h2>
        <p>
          Our mission is to make travel simple, transparent, and memorable.
          We believe every trip should feel personal — not packaged.
        </p>
      </section>

      {/* WHY CHOOSE US */}
      <section className="about-section">
        <h2>Why Choose Us</h2>
        <ul>
          <li>✔ Verified tour packages</li>
          <li>✔ Local expert support</li>
          <li>✔ Best price guarantee</li>
          <li>✔ Easy booking & cancellation</li>
        </ul>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div>
          <h3>1K+</h3>
          <p>Happy Travelers</p>
        </div>
        <div>
          <h3>100+</h3>
          <p>Tour Packages</p>
        </div>
        <div>
          <h3>20+</h3>
          <p>Destinations</p>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Ready to explore Kerala?</h2>
        <Link to="/packages">
          <button className="visit">View Packages</button>
        </Link>
      </section>

    </div>
  );
};

export default AboutUs;
