import React from "react";
import "../DestinationDetails.scss"


const DestinationAbout= ({destination})=>{
    if(!destination) return null
    return(
        <section className="destination-about">
            <h2 className="about-heading">
               About
                <img src="/images/destinations/about.png" alt="dest-icon" className="headingIcon" />
                 {destination.name}
            </h2>
            <p>{destination.description}</p>
        </section>
    )
}

export default DestinationAbout