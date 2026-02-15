import React, { useState } from "react";
import "./signup.scss";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";



const Signup= ()=>{
    const [errors, setErrors]= useState({});
    const [Formdata, setFormData]= useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        confirmpassword:"",
    });

    const navigate= useNavigate()

    const handleChange= (e)=>{
        setFormData({...Formdata, [e.target.name]: e.target.value})
    }

    const Onsubmit= async (e)=>{
        e.preventDefault();
        setErrors({}); //reset previous errors
    

        try{
        const res= await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`,{
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(Formdata)
    })

    const data= await res.json();

    if(!res.ok){
        setErrors({
            [data.field]: data.message
        });
        return
    }

    //for backend messages
    Swal.fire({
        toast: true,
        position: "top",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 2500,
    });


    if(res.ok){
       setFormData({
        name:"",
        email:"",
        password:"",
        phone:"",
        confirmpassword:"",
       })
    }

    setTimeout(() => {
        navigate("/login")
    }, 2000);
    
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
        <div className="signup-container">
            <div className="signup-wraper">
                <h2 className="sign-title">Create Account</h2>
                <p className="sign-sub">Join Traveloop and exploring your journey.</p>

                <form onSubmit={Onsubmit}>
                    <div className="sign-form">
                        {errors.name && <p style={{textAlign:"center"}} className="form-error">{errors.name}</p>}
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Enter your name" value={Formdata.name} onChange={handleChange} />
                    </div>

                    <div className="sign-form">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Enter your email" value={Formdata.email} onChange={handleChange}/>
                        {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>

                    <div className="sign-form">
                        <label>Phone</label>
                        <input type="text" name="phone" placeholder="Enter your Phone" value={Formdata.phone} onChange={handleChange}/>
                    </div>

                    <div className="sign-form">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter your password" value={Formdata.password} onChange={handleChange} />
                    </div>

                    <div className="sign-form">
                        <label>Confirm Password</label>
                        <input type="password" name="confirmpassword" placeholder="Re-enter password" value={Formdata.confirmpassword} onChange={handleChange}/>
                        {errors.confirmpassword && (
                        <p className="form-error">{errors.confirmpassword}</p>
                    )}

                    </div>

                    <button className="sign-btn" type="submit">Signup</button>
                </form>
                <p className="sign-text">Already have an Account? <Link to="/login"><span className="loginlink">Login</span></Link>

                </p>
            </div>
        </div>
    )
}

export default Signup