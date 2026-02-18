import React, { useState } from "react";
import "./adminlog.scss"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Adminlog= ()=>{
  const [formdata, setFormData]=useState({
    email:"",
    password:""
  });
  const [loading, setLoading]= useState(false);

  const navigate= useNavigate();
  

  const showAlert= (icon,text)=>{
    Swal.fire({
      toast:true,
      text,
      icon,
      showConfirmButton:false,
      position:"top",
      timer:2500
    })
  }

  const handleChange= (e)=>{
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    setLoading(true)

    try{
    if(!formdata.email || !formdata.password){
    showAlert("error", "All fields are required")
    return
  }

    const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/auth/login`,{
      method:"post",
      headers:{ "Content-Type" : "application/json"},
      credentials:"include",
      body: JSON.stringify(formdata)
    });

    const data= await res.json();

    if(data.success){
      showAlert("success",data.message);

      setTimeout(() => {
        navigate("/admin/dashboard", {replace:true})
      }, 1500);
    }
    else{
      showAlert("error",data.message)
    }
  }
  finally{
    setLoading(false);
  }
  }

    return(
        <div className="admin-container">
            <div className="adminlog-wraper">
                <h1 className="admin-title">Admin Login</h1>
                <p className="admin-sub">Restricted access only</p>

                <form onSubmit={handleSubmit}>
                  <div className="form-section">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} />

                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter password" onChange={handleChange} />
                    <button className="adminBtn" disabled={loading}>
                      {loading ? "Loggin in..." : "Login"}</button>
                  </div>
                </form>

                  <p className="admin-warning">Only authorized admins only...</p>         
            </div>
        </div>
    )
}



export default Adminlog;
