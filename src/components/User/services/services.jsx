import React from "react";
import "./services.scss"

const Services= ()=>{

    const data= [
        {name:"Affordable packages",
         image:"./images/services/package.png",
         description:"Budget-friendly Kerala tour plans"
        },

        {name:"Secure Online Bokking",
         image:"./images/services/secure.png",
         description:"Safe & encrypted payment system & trusted booking process."
        },

        {name:"Expert Travel Guidence",
         image:"./images/services/guidence.png",
         description:"Kerala-specialized travel experts & place suggetions based on your interest."
        },

        {name:"Custumizable",
         image:"./images/services/custumize.png",
         description:"Modify your itinerary & choose your own destinations"
        },

    ]

    return(
        <div className="service-container">
            <h1 className="service-title">We Offer Best Services</h1>
            <div className="service-section">
                {data.map((datas,index)=>(
                    <div className="service-card" key={index}>
                        <img src={datas.image} alt={datas.name} />
                     <h4>{datas.name}</h4>
                     <p className="service-p">{datas.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Services