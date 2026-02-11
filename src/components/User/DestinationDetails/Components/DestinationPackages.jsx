
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const DestinationPackage= ({packages})=>{
    const navigate= useNavigate()
    const sectionref= useRef();

    useEffect(()=>{
        if(!sectionref.current) return;

        const observer= new IntersectionObserver(
            (entries)=>{
                entries.forEach((entry)=>{
                    if(entry.isIntersecting){
                        entry.target.classList.add("show")
                    }
                })
            },
            {threshold: 0.2}
        );

        const card= sectionref.current.querySelectorAll(".package-cards");
        card.forEach((card,index)=>{
            card.style.transitionDelay= `${index * 0.15}s`;
            observer.observe(card)
        })
        return ()=> observer.disconnect()
    },[packages])


    if(!packages || packages.length === 0){
        return null
    }
    return(
        <div className="modern-package" ref={sectionref}>
            <div className="head">
                <p className="subtitle">Packages</p>
                <h2 className="title">Popular Packages In This Category</h2>
            </div>

            <div className="grid">
                {packages.map((pkg)=>(
                    <div className="package-cards" key={pkg._id}>
                        <img src={`http://localhost:8000/uploads/${pkg.image}`} 
                        alt={pkg.title} className="bg-img" />

                        <div className="overlay"></div>

                        <div className="content">
                            <span className="location">{pkg.location}</span>
                            <h3>{pkg.title}</h3>
                            <p className="duration">
                                {pkg.days} Days / {pkg.nights} Nights
                            </p>

                            <div className="bottom">
                                <div className="price">₹{pkg.price}</div>

                                <button className="book-btn" onClick={()=> navigate(`/package/${pkg._id}`)}>
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



export default DestinationPackage