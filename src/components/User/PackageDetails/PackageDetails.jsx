import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navber/demo";
import Footer from "../footer/footer";
import PackageHero from "./components/PackageHero";
import PackageOverview from "./components/PackageOverView";
import PackageGallery from "./components/PackageGallery";
import PackageItinerary from "./components/PackageItinerary";
import PackageInclusions from "./components/PackageInclusion";
import PackageCTA from "./components/PackageCTA";
import "./PackageDetails.scss";



const PackageDetails = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    if(!id) return

    fetch(`${process.env.REACT_APP_API_URL}/api/package/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("single package:",data);
        setPkg(data.package)
        
      });
      
  }, [id]);

  if (!pkg) return <div className="loading">Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="hero0-wrapper">
           <PackageHero pkg={pkg} />
      </div>

      <div className="package-container">
        <div className="left">
          <PackageOverview pkg={pkg} />
          <PackageGallery images={pkg.gallery} />
          <PackageItinerary itinerary={pkg.itinerary} />
          <PackageInclusions pkg={pkg} />
        </div>

        <div className="right">
          <PackageCTA pkg={pkg} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PackageDetails;
