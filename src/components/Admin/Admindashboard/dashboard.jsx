


import React, { useState } from "react";
import Topbar from "../Topbar/topbar";
import Sidebar from "../Sidebar/sidebar"
import DashboardCards from "../Cards/card";
import RecentBooking from "../RecentBooking/recentBooking";
import "./dashboard.scss"
import DestinationGraph from "../DestinationGraph/destinationGraph";
import BookingTrend from "../BookingTrend/bookingTrend";
import RecentActivity from "../RecentActicity/recentActivity";
import PaymentStatusCard from "../PaymentStatusCard/PaymentStatusCard";

const AdminDashboard= ()=>{
    const [isOpen, SetOpen]= useState(true);
  return(
    <>
    <Topbar/>
    <Sidebar isOpen={isOpen} setOpen={SetOpen}/>
    <DashboardCards isOpen={isOpen} />

    <div className={` dashboard-layout ${isOpen ? "sidebar-open" : "sidebar-closed" }`}>

      <div className="full-width-row">
        <PaymentStatusCard/>
      </div>

      <div className="dashboard-main">

        <div className="graph">
            <DestinationGraph/>
             <BookingTrend/>
        </div >

        <div className="recentbooking-container">
      <RecentActivity/>
      <RecentBooking/>
        </div>  
    </div>
    </div>

    </>
  )
}


export default AdminDashboard;