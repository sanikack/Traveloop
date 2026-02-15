import React, { useEffect, useRef, useState } from "react";
import "./allPackages.scss"
import { useNavigate } from "react-router-dom";



const AllPackages= ()=>{
    const sectionref= useRef(null);
    const navigate= useNavigate()

    const [packages, setPackage]= useState([]);
    
    //filters
    const [category, setCategory]= useState("All")
    const [location, setLocation]= useState("All")
    const [price, setPrice]= useState("All")
    
    //dropdown open states
    const [openCategory, setOpenCategory]= useState(false);
    const [openLocation, setOpenLocation]= useState(false);
    const [openPrice, setOpenPrice]= useState(false);

    //fetch all packages from backend
    const fetchPackages= async()=>{
        try{
            const res= await fetch(`${process.env.REACT_APP_API_URL}/api/package`);
        const data= await res.json();

        if(res.ok){
            setPackage(data.packages)
        }
        }
        catch(err){
            console.log(err);
            
        }
    }

    useEffect(()=>{
        fetchPackages()
    },[])


    //FILTER LOGIC
    const filteredPackages= packages.filter((pkg)=>{
      const matchCategory= category === "All" || pkg.type === category;
      const matchLocation= location === "All" || pkg.location === location
      const matchPrice = price === "All" ||
                        (price === "low" && pkg.price <10000) ||
                        (price === "mid" && pkg.price >= 10000 && pkg.price <= 20000) ||
                        (price === "high" && pkg.price >20000);

                        return matchCategory && matchLocation && matchPrice
    })

    //ANIMATION
    useEffect(()=>{
        if(!sectionref.current) return

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

        const cards= sectionref.current.querySelectorAll(".package-card");
        cards.forEach((card,index)=>{
            card.style.transitionsDelay= `${index * 0.15}s`

            observer.observe(card)
        })
        return ()=> observer.disconnect();
    },[filteredPackages])


    // close dropdowns on outside click
    useEffect(()=>{
      const CloseAll=()=>{
        setOpenCategory(false)
        setOpenLocation(false)
        setOpenPrice(false)
      };
      window.addEventListener("click", CloseAll);
      return ()=> window.removeEventListener("click", CloseAll)
    },[])

    return(
        <section className="modern-packages" ref={sectionref}>
      <div className="head">
        <p className="subtitle">Top Deals</p>
        <h2 className="title">Explore Our Best Kerala Packages</h2>
      </div>


      {/* FILTER BAR */}
      <div className="filters-bar">
        {/* CATEGORY */}
        <div
          className={`custom-select ${openCategory ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="selected"
            onClick={() => {setOpenCategory(!openCategory);
                            setOpenLocation(false)
                            setOpenPrice(false)
            }}
          >
            {category}
          </div>
          <ul className="options">
            {["All", "Honeymoon", "Adventure", "Family", "Premium", "Budget"].map(
              (item) => (
                <li
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    setOpenCategory(false);
                  }}
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* LOCATION */}
        <div
          className={`custom-select ${openLocation ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="selected"
            onClick={() => {setOpenLocation(!openLocation);
                            setOpenCategory(false)
                            setOpenPrice(false)
            }}
          >
            {location}
          </div>
          <ul className="options">
            {["All", "Munnar", "Wayanad", "Alleppey", "Kochi"].map((item) => (
              <li
                key={item}
                onClick={() => {
                  setLocation(item);
                  setOpenLocation(false);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* PRICE */}
        <div
          className={`custom-select ${openPrice ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="selected" onClick={() => {setOpenPrice(!openPrice);
                                                    setOpenCategory(false)
                                                    setOpenLocation(false)
          }}>
            {price === "All" ? "Any Price" : price}
          </div>
          <ul className="options">
            <li onClick={() => { setPrice("All"); setOpenPrice(false); }}>Any Price</li>
            <li onClick={() => { setPrice("low"); setOpenPrice(false); }}>Below ₹10,000</li>
            <li onClick={() => { setPrice("mid"); setOpenPrice(false); }}>₹10,000 – 20,000</li>
            <li onClick={() => { setPrice("high"); setOpenPrice(false); }}>Above ₹20,000</li>
          </ul>
        </div>

        <button
          className="clear-button"
          onClick={() => {
            setCategory("All");
            setLocation("All");
            setPrice("All");
          }}
        >
          Clear
        </button>
      </div>


{/*packages*/}
      <div className="grid">
        {filteredPackages.map((pkg) => (
          <div className="package-card" key={pkg._id}>
            <img src={`${process.env.REACT_APP_API_URL}/uploads/${pkg.image}`} alt={pkg.title} className="bg-img" />

            <div className="overlay"></div>

            <div className="content">
              <span className="location">{pkg.location}</span>
              <h3>{pkg.title}</h3>
              <p className="duration">{pkg.days}Days / {pkg.nights}Nights </p>

              <div className="bottom">
                <div className="price">₹{pkg.price}</div>
                <button className="book-btn" onClick={()=> navigate(`/package/${pkg._id}`)}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="show-more">
        <button>&rarr; show more</button>
      </div>
    </section>
    )
}


export default AllPackages;