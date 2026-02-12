import React, { useEffect, useState } from "react";
import {
  CalendarCheck,
  Users,
  Map,
  CreditCard,
  Star
} from "lucide-react";
import "./cards.scss";

const DashboardCards = ({isOpen}) => {

  const [stats, setStats]=useState({
    totalBookings:0,
    activeUsers:0,
    destination:0,
    totalRevenue:0
  })

  useEffect(()=>{
    fetchStats()
  },[])

  const fetchStats= async ()=>{
    const res= await fetch("http://localhost:8000/api/admin/dashboard",{
      credentials: "include"
    })
    const data= await res.json();

    if(data.success){
      setStats(data.data)
    }
  }


  return (
    <div className={`cards-wraper ${isOpen ? "expanded" : "collapsed"}`}>
    <div className="dashboard-cards">

      <div className="card">
        <div className="icon-box bookings">
          <CalendarCheck size={26} />
        </div>
        <div className="text">
          <h3>{stats.totalBookings}</h3>
          <p>Total Bookings</p>
        </div>
      </div>

      <div className="card">
        <div className="icon-box users">
          <Users size={26} />
        </div>
        <div className="text">
          <h3>{stats.activeUsers}</h3>
          <p>Active Users</p>
        </div>
      </div>

      <div className="card">
        <div className="icon-box destinations">
          <Map size={26} />
        </div>
        <div className="text">
          <h3>{stats.destination}</h3>
          <p>Destinations</p>
        </div>
      </div>

      <div className="card">
        <div className="icon-box revenue">
          <CreditCard size={26} />
        </div>
        <div className="text">
          <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
          <p>Total Revenue</p>
        </div>
      </div>

      <div className="card">
        <div className="icon-box reviews">
          <Star size={26} />
        </div>
        <div className="text">
          <h3>4.8</h3>
          <p>Ratings</p>
        </div>
      </div>

    </div>
    </div>
  );
};

export default DashboardCards;
