import React, { useEffect, useRef, useState } from "react";
import { Search, Bell } from "lucide-react";
import "./topbar.scss"
import { useNavigate } from "react-router-dom";

const Topbar = ()=>{
    const [query, setQuery]= useState("")
    const [result, setResult]= useState(null);
    const [dropdown, SetDropDown]= useState(false);
    const [notifyCount, setNotifyCount]= useState(0);
    const [profileOpen, setProfileOpen]= useState(false)
    const [avatar, setAvatar]= useState("")

    const navigate= useNavigate()
    const profileRef= useRef();

    const fetchSearch= async()=>{
        try{
            const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/dashboard/search?q=${query}`,{
                credentials:"include"
            });
            const data= await res.json();

            if(data.success){
                setResult(data)
                SetDropDown(true)
            }
        }
        catch(err){
            console.error(err);
            
        }
    };

    useEffect(()=>{
        fetchNotifications();
        fetchAdminAvatar();
    },[])


    const fetchNotifications= async()=> {
        try{
            const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/dashboard/notification`,{
                credentials: "include"
            })
            const data= await res.json();

            if(data.success){
                setNotifyCount(data.unread)
            }
        }
        catch(err){
            console.error(err);
            
        }
    }


    const fetchAdminAvatar= async ()=>{
        try{
            const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/auth/profile`,{
                credentials:"include"
            })
            const data= await res.json();

            if(data.success){
                setAvatar(data.admin.avatar)
            }
        }
        catch(err){
        console.error(err)
    }
    }

    useEffect(()=>{
        const close= (e)=> {
            if(!profileRef.current?.contains(e.target)){
                setProfileOpen(false)
            }
        }
        window.addEventListener("click",close);
        return ()=> window.removeEventListener("click", close);
    },[])

    const logout= async()=>{
        await fetch(`${process.env.REACT_APP_API_URL}/api/admin/auth/logout`,{
            method: "post",
            credentials: "include"
        });
        navigate("/admin/login")
    }


    useEffect(()=>{
        if(query.length <2 ){
            setResult(null)
            return
        }

        const timer= setTimeout(() => {
            fetchSearch()
        }, 400);

        return()=> clearTimeout(timer)
    },[query]);

    //NAVIGATE HELPER
    const go= (path)=>{
        navigate(path)
        SetDropDown(false)
        setQuery("")
    }



    return(
        <div className="topbar">

            <div className="left">
                <img src="/images/logos/Logo.png" alt="Logo" className="Logo" />
                <h2>Admin Panel</h2>
            </div>

           
            <div className="search-box">
                <Search size={18} className="searchIcon"/>
                <input type="text" name="search" placeholder="Search..."
                value={query} onChange={(e)=> setQuery(e.target.value)} 
                onFocus={()=> result && SetDropDown(true)}
                />

                {/* 🔻 DROPDOWN */}

                {dropdown && result && (
                    <div className="search-dropdown">

                        {result.bookings?.map(b=> (
                            <div key={b._id} onClick={()=>go(`/admin/bookings`)}>
                                📘 Booking — {b.name}
                            </div>
                        ))}

                        {result.users?.map(u =>(
                            <div key={u._id} onClick={()=> go(`/admin/users`)}>
                                👤 User — {u.name}
                            </div>
                        ))}

                        {result.packages?.map(p=> (
                            <div key={p._id} onClick={()=> go(`/admin/packages`)}>
                                📦 Package — {p.title}
                            </div>
                        ))}

                        {result.categories?.map(c=> (
                            <div key={c._id} onClick={()=> go(`/admin/categories`)}>
                                🗂 {c.name}
                            </div>
                        ))}

                        {result.destinations?.map(d=> (
                            <div key={d._id} onClick={()=> go(`/admin/destinations`)}>
                                🗺 Destination — {d.name}
                            </div>
                        ))}

                        {result?.bookings?.length === 0 &&
                        result?.users?.length === 0 &&
                        result?.packages?.length === 0 &&
                        result?.destinations?.length === 0 &&
                        result?.categories?.length === 0 && (
                            <div className="noResult">
                                No result
                            </div>
                        )
                      }
                </div>
                )}
            </div>


            <div className="right">
               <div className="notification" onClick={()=> navigate("/admin/notification")}>
                 <Bell size={18} />
                    {notifyCount > 0 && (
                        <span className="count">{notifyCount}</span>
                    )}
               </div>


               {/* profile... */}
               
               <div className="adminProfile" ref={profileRef}>

                <img src={avatar || "/images/admin/admin.jpg"} alt="admin"
                className="profile-img"
                onClick={(e)=> {e.stopPropagation()
                setProfileOpen((v)=> !v)
                }}
                />

                {profileOpen && (
                    <div className="profile-menu">
                        <div onClick={()=> navigate("/admin/profile")}>
                            👤 My Profile
                        </div>

                        <div onClick={()=> navigate("/admin/settings")}>
                            ⚙ Settings
                        </div>

                        {/* <div onClick={()=> navigate("/admin/activity")}>
                            📊 Activity
                        </div> */}

                        <div className="logout" onClick={logout}>
                            🚪 Logout
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>

           
    )

}

export default Topbar
