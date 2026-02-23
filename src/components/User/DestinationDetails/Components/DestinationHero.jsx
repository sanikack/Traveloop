import React from "react";


const DestinationHero= ({destination})=>{
    if(!destination) return null

    const HeroImage= destination.image && destination.image.length > 0 ?
    destination.image[0] : ""

    const imageUrl= HeroImage && HeroImage.startsWith("http")
    ? HeroImage : `${process.env.REACT_APP_API_URL}/uplods/${HeroImage}`;


    return(
        <section className="destination-hero"
        style={{backgroundImage:`url(${imageUrl})`}}
        >
            <div className="overlay">
                <h2>{destination.name}</h2>
                <p>{destination.district}, Kerala</p>
            </div>
            
        </section>
    )
}


export default DestinationHero