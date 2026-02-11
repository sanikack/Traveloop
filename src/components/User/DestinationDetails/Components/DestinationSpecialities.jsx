
import React from "react";
import {Star} from "lucide-react"
import "../DestinationDetails.scss"


const DestinationSpecialities= ({destination})=>{
    if(!destination?.specialities?.length) return null

    return(
        <section className="destination-specialities">
            <h2>Why visit {destination.name}?</h2>

            <ul>
                {destination.specialities.map((item,index)=>(
                    <li key={index}>
                        <Star size={18}/>
                        <span>{item}</span>  
                    </li>
                ))}
            </ul>
        </section>
    )
}


export default DestinationSpecialities