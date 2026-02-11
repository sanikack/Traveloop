import React from "react";
import "../PackageDetails.scss"



const PackageGallery = ({ images = [] }) => {
  if(!images.length) return null;

  return (
    <section className="pkg-gallery">
      <h2>Gallery</h2>

      <div className="gallery-grid">
        {images.map((img, i) => (
          <div className="gallery-img" key={i}>

            <img
            src={`http://localhost:8000/uploads/${img}`}
            alt="package"
          />

          </div>
          
        ))}
      </div>
    </section>
  );
};

export default PackageGallery;
