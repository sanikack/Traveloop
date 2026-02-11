import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import "./Subscribers.scss"
import Swal from "sweetalert2";
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom";


const Subscribers= ()=>{
    const [subscribers, setSubscribers]= useState([]);
    const navigate= useNavigate();

    const fetchSubscribers= async ()=>{
        
            const res= await fetch("http://localhost:8000/api/admin/subscribe");
            const data= await res.json();

                setSubscribers(data.subscribers)
        };

            const deleteSubscriber= async (id)=>{
                
                const confirmDelete= await Swal.fire({
                    title: "Delete Subsriber?",
                    text: "This action cannot be undone",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Yes, Delete",
                    cancelButtonText: "Cancel"
                })

                if(!confirmDelete.isConfirmed) return

                 const res= await fetch(`http://localhost:8000/api/admin/subscribe/${id}`,{
                    method: "delete"
                });

                const data= await res.json()

                fetchSubscribers()

                Swal.fire({
                        toast: true,
                        position: "top",
                        icon: "success",
                        text: data.message,
                        showConfirmButton: false,
                        timer: 2500
                      })
        }

        useEffect(()=>{
                fetchSubscribers()
            },[])

            

        return(
            <div className="admin-newsletter">
                <h2>Newsletter Subscribers</h2>

                <div className="top">
                    <button type="submit" onClick={()=>navigate("/admin/subscribe/add")}>
                        <Plus size={18}/>
                        Add Subscriber
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Subscribed on</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {subscribers.map((item,index)=>(
                            <tr key={item._id}>
                                <td>{index+1}</td>
                                <td>{item.email}</td>
                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={()=>deleteSubscriber(item._id)}>
                                        <Trash2 size={18}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        )
    
}


export default Subscribers;