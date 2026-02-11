import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SuccessPage.scss";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { state }= useLocation();
  const booking= state?.booking

  const bookingId= booking?.bookingId || booking?._id


  useEffect(()=>{
    const shouldPlay= sessionStorage.getItem("playSuccessSound");

    if(shouldPlay){
       const audio= new Audio("/alert/Success.mp3");
       audio.volume= 0.6 //soft sound

       setTimeout(() => {
        audio.play().catch(()=>{})
       }, 300);

       sessionStorage.removeItem("playSuccessSound")
    }
  },[])

  if(!booking){
    return <h2 style={{textAlign:"center"}}>No Bookings Found.</h2>
  }

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="check-icon">✓

        <div className="confetti"></div>

        </div>

        <h2>Booking Confirmed!</h2>

        <p className="sub-text">
          Thank you for booking with us. Your journey begins here ✨
        </p>

        <div className="booking-id">
          Booking ID: <span>{bookingId}</span>
        </div>

        <p className="info-text">
          📞 Our travel expert will contact you shortly with complete trip
          details and assistance.
        </p>

        <div className="action-buttons">
          <a
            href={`https://wa.me/91XXXXXXXXXX?text=Hello, my booking id is ${bookingId}`}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            💬 Chat on WhatsApp
          </a>

          <button
            onClick={() => navigate("/")}
            className="home-btn"
          >
            🏠 Back to Home
          </button>

          <button onClick={()=> window.open(`http://localhost:8000/api/invoice/${bookingId}`,"_blank")} className="invoice-btn">
            📄 Download Invoice
          </button>
        </div>

        <small className="note">
          A confirmation message has been sent to your WhatsApp & Email
        </small>
      </div>
    </div>
  );
};

export default SuccessPage;
