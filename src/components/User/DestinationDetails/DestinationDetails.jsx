import React, { useEffect, useState } from "react";
import DestinationHero from "./Components/DestinationHero";
import { useParams } from "react-router-dom";
import "./DestinationDetails.scss"
import DestinationAbout from "./Components/DestinationAbout";
import DestinationPackage from "./Components/DestinationPackages";
import DestinationSpecialities from "./Components/DestinationSpecialities";


const DestinationDetails= ({})=>{
  const {slug}= useParams(); //slug from URL
  const [destination, setDestination]= useState(null)
  const [packages, setPackages]= useState([]);


  useEffect(()=>{
    fetchDestination()
  },[slug]);


  const fetchDestination= async()=>{
    try{
      const res= await fetch(`${process.env.REACT_APP_API_URL}/api/destination/${slug}`);
      const data= await res.json();

      if(res.ok){
        setDestination(data.destination)
        setPackages(data.packages || [])
      }
    }
    catch(err){
      console.error(err);
      
    }
  }

    if(!destination) return <div className="loading">Destination not found</div>


    return(
        <div className="destination-details">
      <DestinationHero destination={destination} />
      <DestinationAbout destination={destination} />
      <DestinationSpecialities destination={destination}/>
      <DestinationPackage packages= {packages}/>
      {/* Your Package component goes here */}
    </div>
    )
}

export default DestinationDetails