
import React, { useEffect, useState } from "react";
import { Menu, X, User, LogOut, Settings, BookIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./demo.scss";
import Swal from "sweetalert2";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const location = useLocation();
  const navigate = useNavigate();

  // resize detect
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // scroll lock
  useEffect(() => {
    document.body.style.overflow =
      userMenuOpen && isMobile ? "hidden" : "auto";
  }, [userMenuOpen, isMobile]);

  // fetch user
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data?.user && setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  const showAlert = (icon, text) => {
    Swal.fire({ 
      toast: true,
      text, 
      icon, 
      position: "top", 
      showConfirmButton: false,
      timer: 2000 });
  };

  // USER CLICK ON THE OUTSIDE WHEN CLOSE THE USER MODAL

  useEffect(()=>{
    if(!userMenuOpen) return

    const handleOutside= (e)=>{
      if(!e.target.closest(".user-dropdown") &&
      !e.target.closest(".user-icon")) {
        setUserMenuOpen(false)
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return()=> document.removeEventListener("mousedown", handleOutside)

  },[userMenuOpen])
  
  const handleLogout = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
      method: "post",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) showAlert("success", data.message);
    setUser(null);
    setUserMenuOpen(false);
    navigate("/login");
  };

  const handleUserClick = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    setUserMenuOpen((p) => !p);
  };

  const handleHamburger = () => {
    setUserMenuOpen(false);
    setMenuOpen((p) => !p);
  };

  return (
    <>
      {/* backdrop */}
      {userMenuOpen && isMobile && (
        <div
          className="modal-backdrop"
          onClick={() => setUserMenuOpen(false)}
        />
      )}

      <nav className="navbar">
        <div className="navbar__container">

          <div className="navbar__logo">
            <Link to="/">
              <img src="/images/logos/Logo.png" className="navbar__logo-img" alt="traveloop logo" />
            </Link>
            <h2 className="web-name">TraveLoop</h2>
          </div>

          <ul className={`navbar__links ${menuOpen ? "open" : ""}`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/destinations">Destination</Link></li>
            <li><Link to="/packages">Packages</Link></li>
            <li><Link to="/contact">Contact</Link></li>

            {!user && (
              <Link to="/login">
                <button className="loginbtn">Login</button>
              </Link>
            )}

            {user && (
              <User size={22} className="user-icon" onClick={handleUserClick}/>
            )}
          </ul>

          <div className="navbar__toggle" onClick={handleHamburger}>
            {menuOpen ? <X size={26}/> : <Menu size={26}/>}
          </div>
        </div>
      </nav>

      {/* ✅ USER MODAL OUTSIDE NAV */}
      {user && userMenuOpen && (
        <div
          className={isMobile ? "user-modal-mobile" : "user-dropdown"}
          onClick={(e) => e.stopPropagation()}
        >

          <div className="userHead">
            <img src={user.avatar || "/images/user/userIcon.jpg"} alt="avatar" 
            className="user-avatar"/>
          

          <div className="user-info">
            <p className="username">{user.name}</p>
            <p className="email">{user.email}</p>
          </div>
        </div>

          <hr/>

          <Link to="/bookings"> <BookIcon size={16}/> Bookings </Link>
          <Link to="/settings"> <Settings size={16}/> Settings </Link>

          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={16}/> Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
