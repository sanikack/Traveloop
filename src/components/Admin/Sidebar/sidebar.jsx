import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  CalendarCheck,
  Users,
  MessagesSquare,
  CreditCard,
  Settings,
  Star,
  LogOut,
  Menu,
  Layers,
  Package,
  UserCheck
} from "lucide-react";
import "./sidebar.scss";

const Sidebar = ({isOpen, setOpen}) => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
 
  const navigate= useNavigate();

  const handleLogout= async ()=>{
    try{
      const res= await fetch("http://localhost:8000/api/admin/auth/logout",{
        method:"post",
        credentials:"include"
      });

      const data= await res.json();

      if(data.success){
        window.location.href= "/admin/login"
      }
    }
    catch(err){
      console.log(err);
      
    }
  }

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>

      {/* /* Toggle button*/ }
      <button className="toggle-btn" onClick={()=> setOpen(!isOpen)}><Menu size={20}/></button>


      <ul className="nav-list">
        <li 
        className={activeMenu === "Dashboard" ? "active" : ""}
          onClick={() => setActiveMenu("Dashboard")}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </li>

        <li
        className={activeMenu === "Bookings" ? "active" : ""}
          onClick={() => {setActiveMenu("Bookings"); navigate("/admin/bookings")}}
        >
          <CalendarCheck size={20} />
          <span>Bookings</span>
        </li>

        <li
        className={activeMenu === "Destinations" ? "active" : ""}
          onClick={() => { setActiveMenu("Destinations"); navigate("/admin/destinations")}}
          >
          <Map size={20} />
          <span>Destinations</span>
        </li>

         <li
        className={activeMenu === "Categories" ? "active" : ""}
          onClick={() => { setActiveMenu("Categories"); navigate("/admin/categories")}}
          >
          <Layers size={20} />
          <span>Categories</span>
        </li>

         <li
        className={activeMenu === "Packages" ? "active" : ""}
          onClick={() => { setActiveMenu("Packages"); navigate("/admin/package")}}
          >
          <Package size={20} />
          <span>Packages</span>
        </li>

        <li
        className={activeMenu === "Users" ? "active" : ""}
          onClick={() => {setActiveMenu("Users"); navigate("/admin/users")}}
          >
          <Users size={20} />
          <span>Users</span>
        </li>

        <li
        className={activeMenu === "Reviews" ? "active" : ""}
          onClick={() => { setActiveMenu("Reviews"); navigate("/admin/reviews")}}
          >
          <Star size={20} />
          <span>Reviews</span>
        </li>

        <li
        className={activeMenu === "Payments" ? "active" : ""}
          onClick={() => { setActiveMenu("Payments"); navigate("/admin/payment")}}
          >
          <CreditCard size={20} />
          <span>Payments</span>
        </li>

        <li
        className={activeMenu === "Messages" ? "active" : ""}
          onClick={() => { setActiveMenu("Messages"); navigate("/admin/messages")}}
          >
          <MessagesSquare size={20} />
          <span>Messages</span>
        </li>

        <li
        className={activeMenu === "Subscribers" ? "active" : ""}
          onClick={() => { setActiveMenu("Subscribers"); navigate("/admin/subscribe")}}
          >
          <UserCheck size={20} />
          <span>Subscribers</span>
        </li>

        <li
        className={activeMenu === "Settings" ? "active" : ""}
        onClick={()=> {setActiveMenu("Settings"); navigate("/admin/settings")}}
        >
          <Settings size={20} />
          <span>Settings</span>
        </li>

        <li className= {`logout ${activeMenu === "logout" ? "active" : ""}`}
        onClick={()=> setActiveMenu("logout")}
        >
          <LogOut size={20} />
          <span onClick={handleLogout} style={{cursor:"pointer"}}>Logout</span>
        </li>

      </ul>

    </div>
  );
};

export default Sidebar;
    