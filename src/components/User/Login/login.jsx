import React, { useState } from "react";
import "./login.scss";
import {Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Login= ()=>{

    const [Formdata, setFormData]= useState({
        email:"",
        password:""
    });

    const [errors, setErrors]= useState({});

    const navigate= useNavigate()

    const handleChange= async (e)=>{
        setFormData({...Formdata,
            [e.target.name]: e.target.value
        })
    }

    const OnSubmit= async (e)=>{
        e.preventDefault();
        setErrors({}) //reset the previous errors
    

    try{
        const res= await fetch("http://localhost:8000/api/auth/login",{
            method: "Post",
            headers: {"Content-Type" : "application/json"},
            credentials: "include",
            body: JSON.stringify(Formdata)
        })

        const data= await res.json();

        if(!res.ok){
            setErrors({
                [data.field]: data.message,
            });
            return
        }

        Swal.fire({
            toast: true,
            position: "top",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 2500
        }).then(()=>{
            navigate("/")
        })

        setFormData({ email:"", password:"" })

    }
    catch(err){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong"
        })
    }
}

    return(
        <div className="login-container">
            <div className="login-wraper">
                <h2 className="title">Welcome Back 👋</h2>
                <p className="sub-title">Login to continue your journey</p>

                <form onSubmit={OnSubmit}>
                    <div className="login-form">
                        {errors.email && <p className="form-error" style={{textAlign:"center"}}>{errors.email}</p>}
                        <label>Email</label>
                        <input type="text" placeholder="Enter your email" value={Formdata.email} name="email" onChange={handleChange} />
                    </div>

                    <div className="login-form">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" name="password" value={Formdata.password} onChange={handleChange} />
                        {errors.password && <p className="form-error">{errors.password}</p>}
                    </div>
                    <button className="loginBtn">Login</button>

                    <p className="signup-text">
                        Don't have an account? <Link to="/signup"><span className="signuplink">Signup</span></Link>
                    </p>
                </form>
            </div>
        </div>
    )
};

export default Login


