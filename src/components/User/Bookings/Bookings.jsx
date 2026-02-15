import { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import "./Bookings.scss"
import Swal from "sweetalert2";


const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");

  const showAlert= (icon,text)=>{
    Swal.fire({
      toast:true,
      icon,
      text,
      position:"top",
      showConfirmButton: false,
      timer: 2500
    })
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/booking/my-bookings`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log("BOOKINGS", data);
        setBookings(data.bookings || [])
        
      });
  }, []);


  //BOOKING CANCEL
  const cancelBooking= async (id)=>{
    const result= await Swal.fire({
      title: "Cancel Booking?",
      text: "You can cancel only pending bookings",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Delete."
    });

    //if user clicked confirm
    if(result.isConfirmed){
      try{
        const res= await fetch(`${process.env.REACT_APP_API_URL}/api/booking/cancel/${id}`,{
          method:"put",
          credentials: "include"
        });
        const data= await res.json();

        if(data.success){
          showAlert("success", data.message)

          //UPDATE UI INSTANTLY
          setBookings(prev =>
          prev.map(b => b._id === id ? {...b, status:"Cancelled"} : b )
        )
        }
        else{
          showAlert("error", data.message)
        }
      }
      catch(err){
        showAlert("error", err.message)
      }
    }
  }

  const filteredBookings = bookings.filter(b => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  return (
    <div className="bookings-page">
      <h1>My Bookings</h1>
      <p>View and manage all your trips</p>

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("Pending")}>Upcoming</button>
        <button onClick={() => setFilter("Confirmed")}>Completed</button>
      </div>

      <div className="booking-list">
        {filteredBookings.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          filteredBookings.map(b => (
            <BookingCard key={b._id} booking={b} onCancel={cancelBooking}/>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;
