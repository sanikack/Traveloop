import React, { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import "./Contacts.scss"
import {Trash2, Reply} from "lucide-react"

const Messages= ()=>{
    const [message, setMessage]= useState([]);
    const [openReply, setOpenReply]= useState(false);
    const [selectedMessage, setSelectedMessage]= useState(null);
    const [replyText, setReplyText]= useState("");


    const fetchMessages= async ()=>{
        const res= await fetch("http://localhost:8000/api/admin/messages")
        const data= await res.json();

        setMessage(data.messages);

    }

    const showAlert= (icon,text)=>{
        Swal.fire({
            toast: true,
            icon,
            text,
            position: "top",
            showConfirmButton: false,
            timer:2500
        })
    }

    const deleteMessages= async (id)=>{
                    
                    const confirmDelete= await Swal.fire({
                        title: "Delete Message?",
                        text: "This action cannot be undone",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Yes, Delete",
                        cancelButtonText: "Cancel"
                    })
    
                    if(!confirmDelete.isConfirmed) return
    
                     const res= await fetch(`http://localhost:8000/api/admin/messages/${id}`,{
                        method: "delete"
                    });
    
                    const data= await res.json()
    
                    fetchMessages()
    
                    showAlert("success", data.message)

                }

                          const saveReply= async()=>{
                            if(!replyText.trim()){
                                return showAlert("error", data.message)
                            }

                            const res= await fetch(`http://localhost:8000/api/admin/messages/reply/${selectedMessage._id}`,{
                                method: "put",
                                headers: { "Content-Type" : "application/json"},
                                body: JSON.stringify({reply:replyText})
                            });

                            const data= await res.json();

                            if(data.success){
                                showAlert("success", data.message); 
                                setOpenReply(false);
                                setReplyText("");
                                fetchMessages();
                            }
                          };
            
    
            useEffect(()=>{
                    fetchMessages()
                },[])
    
return(
    <div className="contact-container">
        <h2>Messages</h2>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>email</th>
                    <th>Message</th>
                    <th>Messaged At</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {message.map((item,index)=>(
                    <tr key={item._id}>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td className="msg">{item.message}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>{item.replied?(
                            <span className="replied">Replied</span>
                        ) : (
                            <span className="pending">Pending</span>
                        )}</td>
                        <td>
                            <div className="action-btns">

                                <button className="reply"
                                onClick={()=>{
                                    setSelectedMessage(item);
                                    setReplyText(item.reply || "");
                                    setOpenReply(true)
                                }}
                                >
                                    <Reply size={18}/>
                                </button>


                                <button className="delete"
                                onClick={()=> deleteMessages(item._id)}
                                >
                                    <Trash2 size={18}/>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>


        {/* REPLY MODAL */}

        {openReply &&(
            <div className="reply-modal">
                <div className="modal-box">
                    <h3>Replay to {selectedMessage.email}</h3>

                    <textarea placeholder="Type Your Reply..."
                    value={replyText}
                    onChange={(e)=>setReplyText(e.target.value)}
                    ></textarea>

                    <div className="modal-actions">
                        <button onClick={()=> setOpenReply(false)}>Cancel</button>
                        <button onClick={saveReply} className="save">
                            Save replay
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
)
}


export default Messages;