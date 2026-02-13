import React from "react";
import "./superbanner.scss"


const Superbanner= ()=>{
    return(
        <section className="super-banner">
            <video
            className="super-video"
            src="https://player.cloudinary.com/embed/?cloud_name=dwdu2bssz&public_id=Superbannervideo_hqvmox"
            autoPlay
            muted
            loop
            playsInline>
             </video>

             <div className="super-overlay">
                <div className="super-content">
                    <h1 className="animate-text">Explore The Beauty Of Kerala</h1>
                    <p className="reveal-text delay">Discover amazing destinations and unforgattable journeys</p>
                    <button className="explore-btn">Start Your Journey</button>
                </div>
             </div>
        </section>
    )
}


export default Superbanner




