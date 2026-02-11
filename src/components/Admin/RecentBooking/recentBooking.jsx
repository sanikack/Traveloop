
import React, { useEffect, useState } from "react";
import "./recentBooking.scss"


const RecentBooking= ()=>{

  const [Bookings, SetBookings]= useState([]);

  useEffect(()=>{
    fetchRecentBookings()
  },[]);


  const fetchRecentBookings= async()=> {
    try{
      const res= await fetch("http://localhost:8000/api/admin/dashboard/recent-bookings",{
        credentials: "include"
      })
      
      const data= await res.json();

      if(res.ok){
        SetBookings(data.bookings)
      }
    }
    catch(err){
      console.error(err);
      
    }
  }
  return(
    
    <div className="recent-booking-container">
      <h3 className="heading">Recent Bookings</h3>

     <table className="bookingTable">
       <thead>
        <tr>
          <th>Name</th>
          <th>Destination</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {Bookings.map((data)=>(
          <tr key={data._id}>
            <td>{data.user?.name}</td>
            <td>{data.package?.destination?.name}</td>
            <td>{new Date(data.travelDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
     </table>
    </div>
  )
}
export default RecentBooking;
