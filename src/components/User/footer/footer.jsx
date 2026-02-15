// import React from "react";
// import "./footer.scss";
// import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="footer">

//       {/* ---------------- NEWSLETTER ---------------- */}
//       <div className="newsletter">
//         <h2>Subscribe to our Newsletter</h2>
//         <p>Get travel updates, discounts & exclusive Kerala tour offers.</p>

//         <div className="input-box">
//           <input type="email" placeholder="Enter your email" />
//           <button>Subscribe</button>
//         </div>
//       </div>

//       {/* ---------------- MAIN FOOTER CONTENT ---------------- */}
//       <div className="footer-main">

//         {/* Brand */}
//         <div className="footer-col brand">
//           <h2 className="logo">TraveLoop</h2>
//           <p>Your trusted partner for exploring the beauty of Kerala.</p>

//           <div className="social">
//             <FaFacebookF />
//             <FaInstagram />
//             <FaYoutube />
//             <FaTwitter />
//           </div>
//         </div>

//         {/* Company */}
//         <div className="footer-col">
//           <h4>Company</h4>
//           <ul>
//             <li>About Us</li>
//             <li>Our Services</li>
//             <li>Why Choose Us</li>
//             <li>Careers</li>
//           </ul>
//         </div>

//         {/* Contact */}
//         <div className="footer-col">
//           <h4>Contact</h4>
//           <ul>
//             <li>+91 98765 43210</li>
//             <li>support@travel.com</li>
//             <li>Kochi, Kerala</li>
//           </ul>
//         </div>

//         {/* More */}
//         <div className="footer-col">
//           <h4>More</h4>
//           <ul>
//             <li>Terms & Conditions</li>
//             <li>Privacy Policy</li>
//             <li>Help Center</li>
//           </ul>
//         </div>
//       </div>

//       {/* ---------------- APP DOWNLOAD SECTION ---------------- */}
//       <div className="app-section">
//         <p>Discover our App</p>

//         <div className="store-btns">
//           <img src="/images/app/appstore.png" alt="app store" />
//           <img src="/images/app/playstore.png" alt="play store" />
//         </div>
//       </div>

//       <p className="copyright">
//         © 2025 TraveLoop. All Rights Reserved.
//       </p>

//     </footer>
//   );
// };

// export default Footer;



import React, { useState } from "react";
import "./footer.scss"
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Swal from "sweetalert2";

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
            <FaFacebookF/>
            <FaInstagram/>
            <FaTwitter/>
            <FaYoutube/>

        </div>
         </div>

        <div className="sub-field">
            <h4>company</h4>
            <ul>
                <li>About us</li>
                <li>our services</li>
                <li>why choose us</li>
                <li>careers</li>
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
                <li>Terms & Conditions</li>
                <li>Privacy & Policy</li>
                <li>Help Center</li>
            </ul>
        </div>    
    </div>


      <div className="app-section">
        <h3>Discover Our App</h3>
        
        <div className="app-icons">
            <img src="./images/footer/Appstore.png" alt="appstore" />
            <img src="./images/footer/Playstore.png" alt="playstore" />
        </div>
      </div>

      <p className="copy-right">
         © 2025 TraveLoop. All Rights Reserved.
      </p>

</footer>
    )
}

export default Footer