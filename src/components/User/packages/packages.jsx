import React, { useState } from "react";
import "./packages.scss";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const Packages = () => {

  const sectionref= useRef(null);
  const navigate= useNavigate();

  const [packages, setPackage]= useState([])

  const fetchPackages= async()=>{
    try{
      const res= await fetch("http://localhost:8000/api/package");
      const data= await res.json();

      if(res.ok){
        setPackage(data.packages.slice(0,3))
      }
    }
    catch(err){
      console.log(err);     
    }
  }

  useEffect(()=>{
    fetchPackages()
  },[])


  //ANIMATION
  useEffect(()=>{
      if (!sectionref.current) return;  // << prevent error

    const observer = new IntersectionObserver(
      (entries) => {
       entries.forEach((entry)=>{
        if(entry.isIntersecting){
          entry.target.classList.add("show");
        }
       })
      },
      { threshold: 0.2 }
    );

    const cards= sectionref.current.querySelectorAll(".package-card");
    cards.forEach((card, index)=>{
      card.style.transitionsDelay= `${index * 0.15}s`; //animation

      observer.observe(card);
    })

     return () => observer.disconnect();
  },[packages])



  return (
      <section className="modern-packages" ref={sectionref}>
      <div className="head">
        <p className="subtitle">Top Deals</p>
        <h2 className="title">Explore Our Best Kerala Packages</h2>
      </div>

      <div className="grid">
        {packages.map((pkg) => (
          <div className="package-card" key={pkg._id}>
            <img src={`http://localhost:8000/uploads/${pkg.image}`} alt={pkg.title} className="bg-img" />

            <div className="overlay"></div>

            <div className="content">
              <span className="location">{pkg.location}</span>
              <h3>{pkg.title}</h3>
              <p className="duration">{pkg.days}Days / {pkg.nights}Nights </p>

              <div className="bottom">
                <div className="price">₹{pkg.price}
                </div>
                <button className="book-btn" onClick={()=>navigate(`/package/${pkg._id}`)}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="show-more">
        <button onClick={()=> navigate("/packages")}>&rarr; show more</button>
      </div>
    </section>
  );
};

export default Packages;


