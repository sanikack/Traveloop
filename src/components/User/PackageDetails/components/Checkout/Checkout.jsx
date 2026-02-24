import React, { useState } from "react"
import "./Checkout.scss"
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Checkout = () => {
  const {state}= useLocation();
  const booking= state?.booking;
  const Package= booking?.package;

  const navigate= useNavigate()

  const [paymentMethod, setPaymentMethod]= useState("");
  const [loading, setLoading]= useState(false);

  const showAlert= (icon,text)=>{
    Swal.fire({
      toast: true,
      icon,
      text,
      position:"top",
      showConfirmButton: false,
      timer: 2500
    })
  }

  if(!booking || !Package){
    return <h2 style={{textAlign:"center", fontSize: "20px"}}>Invalid Booking...</h2>
  }

  const getPayableAmount= ()=>{
    if(paymentMethod === "advance") return 1000;
    if(paymentMethod === "full") return booking.payableAmount;
    return 0
  }


  const handleProceed= async ()=>{
    if(!paymentMethod){
      showAlert("error","please select a payment method")
      return
    }


    try{
      setLoading(true);

      const res= await fetch(`${process.env.REACT_APP_API_URL}/api/booking/checkout/${booking._id}`,{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        credentials: "include",
        body: JSON.stringify({
          paymentMethod
        })
      })
      const data= await res.json();

      if(!res.ok){
        showAlert("error", data.message)
        return
      }


         if(paymentMethod === "arrival"){
          sessionStorage.setItem("playSuccessSound","true");

        showAlert("success", "Booking confirmed.pay on arrival");
        navigate("/booking/checkout/success", { state: {booking: data.booking}})
        return
      }

      const paymentRes= await fetch(`${process.env.REACT_APP_API_URL}/api/payment/create-order`,{
        method: "POST",
        headers:{ "Content-Type" : "application/json"},
        credentials: "include",
        body: JSON.stringify({
          amount: getPayableAmount(),
          bookingId: booking._id
        })
      })

      const ResData= await paymentRes.json();

      if(!paymentRes.ok){
        showAlert("error", ResData.message);
        return
      }

      console.log("Razorpay Key:", process.env.REACT_APP_RAZORPAY_KEY_ID);


      //RAZORPAY MODAL OPTIONS..
      const options= {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: ResData.amount,
        currency: "INR",
        name: "Travel Booking",
        description: "Package Payment",
        order_id: ResData.orderId,
        handler: function(){
          sessionStorage.setItem("playSuccessSound","true");

          showAlert("success",ResData.message);
          navigate("/booking/checkout/success",{
            state:{booking}
          })
        },
        prefill:{
          name: booking.name,
          email: booking.email,
          contact: booking.phone
        },
        theme: {
          color: "#25d366"
        }
      }
      //open razorpay modal
      const rzp= new window.Razorpay(options);
      rzp.open();

    }
    catch (err) {
      showAlert("error", err.message);
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className="checkout-container">
      <h2>Confirm Your Booking</h2>

      <div className="checkout-grid">
        {/* LEFT – Package Summary */}
        <div className="summary-card">
          {Package.image ? (<img src={Package.image? (Package.image.startsWith("http")? Package.image :
          `${process.env.REACT_APP_API_URL}/uploads/${Package.image}`) : ""} alt={Package.title}/>)
          : "No image"}  

          <div className="summary-content">
            <h3>{Package.title}</h3>
            <p className="location">📍 {Package.location}</p>
            <p>{Package.days} Days / {Package.nights} Nights</p>

            <div className="price-box">
              <span>Total Amount</span>
              <h4>₹{booking.payableAmount}</h4>
            </div>
          </div>
        </div>

        {/* RIGHT – Payment Options */}
        <div className="payment-card">
          <h3>Choose Payment Method</h3>

          <label className={`radio-box ${paymentMethod === "advance" ? "active" : ""}`}>
            <input type="radio" name="payment" value="advance" onClick={(e)=>setPaymentMethod(e.target.value)} />
            <span>Pay ₹1,000 Advance</span>
          </label>

          <label className={`radio-box ${paymentMethod === "full" ? "active" : ""}`}>
            <input type="radio" name="payment" value="full" onClick={(e)=>setPaymentMethod(e.target.value)} />
            <span>Pay Full Amount</span>
          </label>

          <label className={`radio-box ${paymentMethod === "arrival" ? "active" : ""}`}>
            <input type="radio" name="payment" value="arrival" onClick={(e)=>setPaymentMethod(e.target.value)} />
            <span>Pay on Arrival</span>
          </label>

          {paymentMethod && (
            <div className="payable-box">
              <span>Payable Now</span>
              <h4>
                {paymentMethod === "arrival"
                  ? "₹0 (Pay on Arrival)"
                  : `₹${getPayableAmount()}`}
              </h4>
            </div>
          )}

          <button className="confirm-btn"
          onClick={handleProceed} disabled={loading}>
            {loading  ? "Processing" : paymentMethod === "arrival" ? "Confirm Booking" : "Proceed to Payment"}
          </button>

          <p className="secure-text">🔒 100% Secure Payments</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;