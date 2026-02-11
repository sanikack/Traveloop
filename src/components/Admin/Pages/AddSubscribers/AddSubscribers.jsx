import React, { useState } from "react";
import "./AddSubscribers.scss"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const AddSubscribers= ()=>{
    const [email, setEmail]= useState("");
    const [loading, setLoading]= useState(false);

    const navigate= useNavigate()

    const showAlert= (icon,text)=>{
        Swal.fire({
            toast: true,
            icon,
            text,
            position: "top",
            showConfirmButton: false,
            timer: 2000
        })
    }

    const handleSubmit= async(e) =>{
        e.preventDefault();

        if(!email){
            showAlert("error", "email is required")
            return
        }

        try{
            setLoading(true);

            const res= await fetch("http://localhost:8000/api/admin/subscribe",{
                method: "post",
                headers:{ "Content-type" : "application/json"},
                body: JSON.stringify({ email })
            })
            const data= await res.json();

            if(!res.ok){
                showAlert("error", data.message)
                return
            }

            showAlert("success", data.message)
            
            setTimeout(() => {
                navigate("/admin/subscribe")
            }, 2000);
        }
        catch(err){
            showAlert("error", err.message)
        }
        finally{
            setLoading(false)
        }
    }



    return(
        <div className="addsub-container">
            <h2>Add subscribers</h2>

            <form action="" onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)} />

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    )
}



export default AddSubscribers