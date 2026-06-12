import React, { useEffect, useState, useCallback } from "react";
import "./EditBookings.scss"
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditBookings= ()=>{
    const {id}= useParams()

    const navigate= useNavigate()

    const [booking, setBooking]= useState(null);
    const [status, setStatus]= useState("");
    const [loading, setLoading]= useState(false);

    const showAlert= (icon,text)=>{
        Swal.fire({
            toast:true,
            icon,
            text,
            position:"top",
            showConfirmButton:false,
            timer:2500
        })
    }

        //fetch single bookings
        const fetchBookings= useCallback( async()=>{
            try{
                const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/bookings/${id}`);
                const data= await res.json();

                if(!res.ok){
                    showAlert("error", data.message)
                    return
                }
                setBooking(data.bookings)
                setStatus(data.bookings.status)
            }
            catch(err){
                showAlert("error", err.message)
            }
        },
    []);

        useEffect(()=>{
            fetchBookings()
        },[fetchBookings])


        // ✅ PREVENT NULL CRASH
  if (!booking) {
    return <p style={{ textAlign: "center" }}>Loading booking...</p>;
  }


        //update booking
        const handleUpdate= async(e)=>{
            e.preventDefault();

            try{
                setLoading(true);
                const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/bookings/${id}`,{
                    method:"PUT",
                    headers:{ "Content-Type" : "application/json"},
                    body: JSON.stringify({status})
                });
                const data= await res.json();
                
                if(!res.ok){
                    showAlert("error",data.message)
                    return
                }
                showAlert("success", data.message)
                navigate("/admin/bookings")
            }
            catch(err){
                showAlert("error",err.message)
            }
            finally{
                setLoading(false)
            }
        }
  
    return(
        <div className="editbook-container">
            <h3>Edit Bookings</h3>

            <form onSubmit={handleUpdate} className="editbook-section">
                <div className="form-group">
                    <label >User Name</label>
                    <input type="text" value={booking.name} disabled />
                </div>

                <div className="form-group">
                    <label >Package</label>
                    <input type="text" value={booking.package?.title} disabled />
                </div>

                <div className="form-group">
                    <label >Travel Date</label>
                    <input type="text" value={new Date(booking.travelDate).toLocaleDateString()} disabled />
                </div>

                <div className="form-group">
                    <label >Payment Method</label>
                    <input type="text" value={booking.paymentmethod} disabled/>
                </div>

                <div className="form-group">
                    <label >Status</label>
                    <select value={status} onChange={(e)=> setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                    </select>
                    
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Save Updates"}
                </button>
            </form>
        </div>
    )
}

export default EditBookings;