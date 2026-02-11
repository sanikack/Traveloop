import React from "react";
import "./Intro.scss"


const Intro = ()=> {
    return(

        <div className="intro-container">
            <div className="intro-left">

                <h2>Welcome to kerala: God's own country..</h2>

          <p>From serene backwaters and lush hill stations to sun-kissed beaches, Kerala offers experiences that stay with you forever.
Immerse yourself in vibrant festivals like Onam and Vishu, where tradition meets celebration.
Explore rich culture, authentic cuisine, and breathtaking landscapes in every journey.
Come, travel beyond destinations — experience Kerala.</p>  

            </div>
          
          <div className="intro-right">
            <img src="/images/Intro/intro.png" alt="intro" />
          </div>
        </div>
    )
}

export default Intro