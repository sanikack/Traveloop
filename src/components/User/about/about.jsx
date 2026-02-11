import React from "react";
import "./about.scss"

const About= ()=>{
    return(
        <div className="about-container">
            <div className="about-left">
                 <h1 className="about-title">About</h1>

                 <p className="about-p">
          Kerala is a land where nature, culture, and tradition blend 
          beautifully. From peaceful backwaters to misty hill stations, 
          every corner of Kerala offers a unique experience.
          </p>

          <p className="about-p">
             This website helps travelers explore Kerala’s best destinations, 
          traditional arts, and natural wonders — all in one place.
          </p>

            </div>
           
            <div className="icon-section">
                <img src="/images/about/icon01.png" alt="kerala-icon" />
            </div>
        </div>
    )
}

export default About