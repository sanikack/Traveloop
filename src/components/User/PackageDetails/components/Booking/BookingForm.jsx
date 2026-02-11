import React, { useEffect, useState } from "react";
import "./BookingForm.scss"
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";



  const BookingForm= ()=>{
    const {id}= useParams();
    const navigate= useNavigate()

    const showAlert= (icon,text)=>{
        Swal.fire({
            toast: true,
            text,
            icon,
            position:"top",
            showConfirmButton: false,
            timer: 2500
        })
    }

    const [pkg, setPkg]= useState(null)
    const [form, setForm]= useState({
        name: "",
        email:"",
        phone:"",
        adults:1,
        childrens:0,
        travelDate:"",
        pickup:"",
        notes:"",
    });
    
    const [loading, setLoading]= useState(false)
    const [errors, setErrors]= useState({})


    useEffect(()=>{
        fetch(`http://localhost:8000/api/package/${id}`)
        .then(r=> r.json())
        .then(d => setPkg(d.package))
    },[id])


    const handleChange= (e)=>{
        setForm({...form, [e.target.name]: e.target.value });
        setErrors({...errors, [e.target.name]: ""})
    }


    // CALCULATE THE TOTAL PAYABLE AMOUNT FOR INSTANT SHOWING
    const amount= pkg?.price || 0;
    const totalAmount= 
                  (Number (form.adults) * amount) +
                  (Number (form.childrens) * amount * 0.5)


    const handlesubmit= async (e)=>{
        e.preventDefault();
        setLoading(true);
        setErrors({})

        try{
            const res= await fetch(`http://localhost:8000/api/booking/${id}`,{
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                credentials: "include",
                body:JSON.stringify({...form, totalAmount})
            })
            const data= await res.json();

            if(!res.ok){
                if(data.field){
                    setErrors({ [data.field]: data.message})
                }
                else{
                    showAlert("error", data.message)
                }
              setLoading(false)
              return
            }

            showAlert("success", data.message)
            navigate("/booking/checkout",{
                state:{
                    booking: data.booking //this is called REACT ROUTER NAVIGATION STATE.. ithu checkout page lekku 
                                          // navigate cheyyumbol carry cheyyunnu..
                }
            })
        }
        catch(err){
            showAlert("error", err.message)
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <div className="bookingform-container">
            <h2>Book Your Trip</h2>

            {errors.general && (
        <p className="errorText" style={{textAlign:"center"}}>{errors.general}</p>
      )}

            <form onSubmit={handlesubmit} >
                <div className="booking-form">
                    <input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
                    {errors.name && <span className="errorText">{errors.name}</span>}

                    <input type="text" name="email" placeholder="Email Address" onChange={handleChange} />
                    {errors.email && <span className="errorText">{errors.email}</span>}

                    <input type="tel" name="phone" placeholder="Email Phone" onChange={handleChange} />
                    {errors.phone && <span className="errorText">{errors.phone}</span>}

                    <div className="row">

                        <div className="field">
                        <input type="number" name="adults" min="1" placeholder="Adults" onChange={handleChange} />
                        {errors.adults && <span className="errorText">{errors.adults}</span>}
                        </div>

                        <div className="field">
                        <input type="number" name="childrens" min="0" placeholder="Children" onChange={handleChange} />
                         <small>Children above 12 years: charged at 50% of adult price</small>
                        </div>
                        
                        <input type="date" name="travelDate" onChange={handleChange} />

                        <input type="text" name="pickup" placeholder="Pickup location" onChange={handleChange} />

                        <div className="down">
                            <textarea name="notes" placeholder="Special requests (Optional)" onChange={handleChange}/>

                            {/* TOTAL AMOUNT */}
                            <div className="total-box">
                                <p>Price per adult : ₹{amount}</p>
                                <h3>Payable Amount: ₹{totalAmount}</h3>
                            </div>

                        <button type="submit" className="confirmBook-btn"
                            disabled={loading}>
                            {loading ? "Submitting" : "Confirm Bokking"}</button>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
  }


  export default BookingForm