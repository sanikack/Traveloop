import React, { useEffect, useState } from "react";
import "./destinationsection.scss"
import { useNavigate } from "react-router-dom";


const Destinations= ()=>{

  const navigate= useNavigate();

  const [destination, setDestination]= useState([]);

  const fetchDestinations = async()=>{
    try{
      const res= await fetch(`${process.env.REACT_APP_API_URL}/api/destination`)
      const data= await res.json();

      if(res.ok){
        const activeDestinations= data.destinations.filter((cat)=> Boolean(cat.isActive) )

        setDestination(activeDestinations);
      }
    }
    catch(err){
      console.error(err);
      
    }
  }

  useEffect(()=>{
    fetchDestinations();
  },[]);


  return(
    <section className="destination-section">
      <div className="destination-header">
        <h2>Top Destinations In <span>Kerala</span></h2>
        <p>Discover the most loved places across God's own country 🌴</p>
      </div>
      
      <div className="destination-grid">
        {destination.map((place)=>(
          <div className="destination-card" key={place._id}>
            <div className="image-container">
              {place.image && (<img src={place.image.startsWith("http") ? place.image
                : `${process.env.REACT_APP_API_URL}/uploads/${place.image}`} alt={place.name}/>)
             }

            <div className="destination-info">
              <h3>{place.name}</h3>
              <p>{place.description}</p>
              <button onClick={()=> navigate(`/destination/${place._id}`)}>Explore More</button>
            </div>
          </div>
         </div>
        ))}
      </div>
    </section>
  )
}


export default Destinations