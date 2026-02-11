import React from "react";


const DestinationHero= ({destination})=>{
    if(!destination) return null

    const HeroImage= destination.image && destination.image.length > 0 ?
    destination.image[0] : ""


    return(
        <section className="destination-hero"
        style={{backgroundImage:`url(http://localhost:8000/uploads/${HeroImage})`}}
        >
            <div className="overlay">
                <h2>{destination.name}</h2>
                <p>{destination.district}, Kerala</p>
            </div>
            
        </section>
    )
}


export default DestinationHero