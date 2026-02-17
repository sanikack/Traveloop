
import React, { useState } from "react";
import "./footer.scss"
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Footer =()=>{

    const [email, setEmail]= useState("");
    const [loading, setLoading]= useState(false);

    const showAlert= (icon, text)=>{
        Swal.fire({
            toast: true,
            icon,
            text,
            position:"top",
            showConfirmButton: false,
            timer: 2500
        })
    }

    const handleSubscribe= async()=>{
        if(!email){
            showAlert("error","Please enter an email")
            return
        }

        try{
            setLoading(true);

            const res= await fetch(`${process.env.REACT_APP_API_URL}/api/newsletter`,{
                method:"post",
                headers:{ "Content-Type" : "application/json"},
                body: JSON.stringify({email})
            });
            const data= await res.json();

            if(!res.ok){
                showAlert("error", data.message)
                return
            }
            showAlert("success", data.message);
            setEmail("")
        }
        catch(err){
            showAlert("error", err.message)
        }
        finally{
            setLoading(false)
        }
    }



    return(
<footer className="footer-container">

    <div className="newsletter">
        <h1>Subscribe To Our Newletter</h1>
        <p>Get travel updates, discounts & exclusive Kerala tour offers.</p>
  

    <div className="input-container">
        <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <button className="submit" onClick={handleSubscribe} disabled={loading}>
            {loading? "Subscribing..." : "Subscribe"}
        </button>
    </div>
      </div>
      

    <div className="footer-section">
        <div className="footersection">
            <h1>TrveLoop</h1>
            <p>Your trusted partner for exploring the beauty of Kerala.</p>

              <div className="icons">
                <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF/></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram/></a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter/></a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube/></a>
            
        </div>
         </div>

        <div className="sub-field">
            <h4>company</h4>
            <ul>
                <li><Link to="/aboutUs">About us</Link></li>
                <li><Link to="/service">our services</Link></li>
                <li><Link to="/aboutUs">why choose us</Link></li>
                
            </ul>
        </div>

        <div className="sub-field">
            <h4>Contact</h4>
            <ul>
                <li>+91 9988776655</li>
                <li>Trveloop@gmail.com</li>
                <li>Kochi, Kerala</li>
            </ul>
        </div>

        <div className="sub-field">
            <h4>More</h4>
            <ul>
                <li><Link to="/termsconditions">Terms & Conditions</Link></li>
                <li><Link to="/privacypolicy">Privacy & Policy</Link></li>
                <li><Link to="/help">Help Center</Link></li>
            </ul>
        </div>    
    </div>


      <div className="app-section">
        <h3>Discover Our App</h3>
        
        <div className="app-icons">
            <a href="https://appstore.com" target="_blank" rel="noreferrer">
            <img src="./images/footer/Appstore.png" alt="appstore" />
            </a>
            <a href="https://playstore.com" target="_blank" rel="noreferrer">
            <img src="./images/footer/Playstore.png" alt="playstore" />
            </a>
        </div>
      </div>

      <p className="copy-right">
         © 2025 TraveLoop. All Rights Reserved.
      </p>

</footer>
    )
}

export default Footer