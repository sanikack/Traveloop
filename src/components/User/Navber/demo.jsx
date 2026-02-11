import React, { useEffect, useRef, useState } from "react";
import { Menu, X, User, LogOut, Settings, BookIcon } from "lucide-react";
import {Link, useNavigate} from "react-router-dom"
import "./demo.scss"
import Swal from "sweetalert2";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser]= useState(null);
  const [userMenuOpen, setUserMenuOpen]= useState(false);
  const navigate= useNavigate();

  const userMenuRef= useRef();

  const showAlert= (icon,text)=>{
    Swal.fire({
      toast: true,
      text,
      icon,
      position:"top",
      showConfirmButton:false,
      timer:2500
    })
  }

  //fetch logged in user
  useEffect(()=>{
    fetch("http://localhost:8000/api/auth/me",{
      credentials: "include"
    })
    .then(res=> res.ok ? res.json() : null)
    .then(data=> {
      if(data?.user) setUser(data.user)
    })

  .catch(()=> setUser(null))
  },[]);


//close dropdrown when click on the outside
useEffect(()=>{
  const handleClick= (e)=>{
    if(userMenuRef.current &&
      !userMenuRef.current.contains(e.target)
    ){
      setUserMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClick);

  return()=>{
    document.removeEventListener("mousedown",handleClick)
  }
},[])

  //logoutttt....
  const handleLogout= async()=>{
    try{
    const res= await fetch("http://localhost:8000/api/auth/logout",{
      method:"post",
      credentials:"include"
    });

    const data= await res.json()
    if(res.ok){
      showAlert("success",data.message)
    }
    setUser(null);
    setUserMenuOpen(false)

    setTimeout(() => {
      navigate("/login")
    }, 2000);
  }

  catch(err){
    showAlert("err", err.message)
  }
  }
  



  return (
    <nav className="navbar">
      <div className="navbar__container">
        
        {/* --- Left: Logo Section --- */}
        <div className="navbar__logo">
          <Link to="/" onClick={()=>setMenuOpen(false)}>
          <img src="/images/logos/Logo.png" alt="TraveLoop Logo" className="navbar__logo-img" />
          </Link> 

            <h2 className="web-name">TraveLoop</h2>
          
        </div>


        {/* --- Center: Desktop Menu --- */}
        <ul className={`navbar__links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={()=>setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/destinations" onClick={()=>setMenuOpen(false)}>Destination</Link></li>
          <li><Link to="/package" onClick={()=>setMenuOpen(false)}>Packages</Link></li>
          <li><Link to="/contact" onClick={()=>setMenuOpen(false)}>Contact</Link></li>


          {/* 🔁 LOGIN / USER ICON */}
          {!user ? (
            <Link to="/login" onClick={()=>setMenuOpen(false)}>
              <button className="loginbtn">Login</button>
              </Link> 
          ) : (
            <div className="user-menu" ref={userMenuRef} onClick={(e)=> {
              e.stopPropagation();
              setUserMenuOpen(prev=>!prev)}
            } 
            >
              <User size={22}/>

             

                {userMenuOpen && (
  <div className="user-dropdown" ref={userMenuRef}>
    <div className="user-info">
      <p className="username">{user.name}</p>
      <p className="email">{user.email}</p>
    </div>

    <hr />

     <Link to="/bookings" onClick={() => setUserMenuOpen(false)}>
     <BookIcon size={16} style={{paddingRight: "10px"}}/>
      Bookings
    </Link>

    <Link to="/settings" onClick={() => setUserMenuOpen(false)}>
    <Settings size={16} style={{paddingRight: "10px"}}/>
      Settings
    </Link>

    <button onClick={(e)=>{e.stopPropagation();
      handleLogout()}} className="logout-btn">
      <LogOut size={16} /> Logout
    </button>
  </div>
)}

              </div>
           
          )}
        </ul>

        {/* --- Right: Mobile Toggle --- */}
        <div className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </div>
      </div>
    </nav>
  );
};


export default Navbar

