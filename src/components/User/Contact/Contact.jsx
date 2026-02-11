import React, { useState } from "react";
import "./Contact.scss"
import Swal from "sweetalert2";
import { data, useNavigate } from "react-router-dom";


const Contact= ()=>{
    const [formData, setFormData]= useState({
        name:"",
        email:"",
        message:""
    });


    const showAlert= (icon,text)=>{
        Swal.fire({
            toast: true,
            icon,
            text,
            position: "top",
            showConfirmButton: false,
            timer: 2500
        })
    }

    const [loading, setLoading]= useState(false);

    const handleChange= async (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };


    const handleSubmit= async (e)=>{
        e.preventDefault();

        const { name, email, message }= formData;

        if(!name || !email || !message){
            showAlert("error", "All fields are required")
            return
        }

        try{
            setLoading(true)

            const res= await fetch("http://localhost:8000/api/contact",{
                method: "post",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(formData)
            });
            const data= await res.json();

            if(!res.ok){
                showAlert("error", data.message)
                return
            }

            showAlert("success", data.message);

            setFormData({
                name:"",
                email:"",
                message:""
            });
        }
        catch(err){
            showAlert("error",data.message)
        }
    }


    return(
        <div className="contact-page">
            <div className="contact-wraper">
                <h2>Contact Us</h2>
                <p>Have questions or need help planning your kerala trip?
                    we're happy to help!
                     </p>

                    <form onSubmit={handleSubmit}>
                        <input type="text" 
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        />

                        <input type="text"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                         />

                         <textarea 
                         name="message"
                         placeholder="Your message"
                         rows="5"
                         value={formData.message}
                         onChange={handleChange}
                         >

                         </textarea>

                         <button type="submit" className="contactBtn" disabled={loading}>
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                    </form>
            </div>
        </div>
    )
}


export default Contact