import React from "react";
import "./superbanner.scss"
import { useNavigate } from "react-router-dom";


const Superbanner= ()=>{
    const navigate= useNavigate();
    return(
        <section className="super-banner">
            <video
            className="super-video"
            src="https://res.cloudinary.com/dwdu2bssz/video/upload/v1770996939/Superbannervideo_hqvmox.mp4"
            autoPlay
            muted
            loop
            playsInline>
             </video>

             <div className="super-overlay">
                <div className="super-content">
                    <h1 className="animate-text">Explore The Beauty Of Kerala</h1>
                    <p className="reveal-text delay">Discover amazing destinations and unforgattable journeys</p>
                    <button className="explore-btn" onClick={()=>navigate("/packages")}>Start Your Journey</button>
                </div>
             </div>
        </section>
    )
}


export default Superbanner




